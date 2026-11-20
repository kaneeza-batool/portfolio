import { useEffect, useRef, useState } from "react";
import type { Day } from "@/lib/live-data";
import { GRAPH_HEX, shade } from "@/lib/graph-colors";

/**
 * The year of contributions as a 3D "skyline": one block per day, taller the more
 * commits. Drawn on a single <canvas> with a small hand-rolled isometric projection
 * (no 3D library). It rises when scrolled into view, sways gently, and can be dragged
 * sideways to rotate. Pauses off screen; no sway or rise animation with reduced motion.
 */
const BASE = -0.38; // resting view angle (radians)
const SWAY = 0.12; // idle sway amplitude
const LIMIT = 0.75; // how far a drag can turn it either way
const TILT = 0.52; // vertical squash of the floor plane (camera height)
const CELL = 0.4; // half the footprint of one block (grid step = 1)
const MAX_H = 6; // tallest block, in grid units
const RISE_MS = 1700;

type Box = { gx: number; gy: number; h: number; level: number; week: number };

export function Skyline({ days, label }: { days: Day[] | null; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { width, height } = size;
  const drag = useRef({ on: false, startX: 0, startOffset: 0, offset: 0 });

  // Track the canvas size. The ResizeObserver callback arrives after the browser's own
  // layout, so nothing here forces an extra layout pass while the page starts up.
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    if (typeof ResizeObserver === "undefined") {
      const measure = () => setSize({ width: c.clientWidth, height: c.clientHeight });
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(([e]) => {
      if (e) setSize({ width: e.contentRect.width, height: e.contentRect.height });
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !width || !height || !days?.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Build the boxes once.
    const weeks = Math.ceil(days.length / 7);
    const max = Math.max(1, ...days.map((d) => d.count));
    const boxes: Box[] = days.map((d, i) => {
      const week = Math.floor(i / 7);
      return {
        week,
        gx: week - (weeks - 1) / 2,
        gy: (i % 7) - 3,
        level: d.level,
        h: d.count ? 0.45 + (MAX_H - 0.45) * Math.sqrt(d.count / max) : 0.08,
      };
    });
    const corners = [
      [-CELL, -CELL],
      [CELL, -CELL],
      [CELL, CELL],
      [-CELL, CELL],
    ] as const;
    // Outward normal of the side between corner k and k+1.
    const normals = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ] as const;
    const halfW = weeks / 2;

    let start = 0;
    let raf = 0;
    let running = false;
    let looping = false;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      const rise = reduce ? 1 : Math.min(1, t / RISE_MS);
      const sway = reduce || drag.current.on ? 0 : SWAY * Math.sin((t / 7000) * Math.PI * 2);
      const a = BASE + drag.current.offset + sway;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const rot = (x: number, y: number) => [x * cos - y * sin, x * sin + y * cos] as const;

      // Fit the whole footprint (plus the tallest block) for the current angle.
      const ext = [rot(-halfW, -3.5), rot(halfW, -3.5), rot(halfW, 3.5), rot(-halfW, 3.5)];
      const spanX = Math.max(...ext.map((p) => Math.abs(p[0]))) * 2;
      const yMin = Math.min(...ext.map((p) => p[1])) * TILT - MAX_H;
      const yMax = Math.max(...ext.map((p) => p[1])) * TILT;
      const s = Math.min((width * 0.94) / spanX, (height * 0.9) / (yMax - yMin));
      const cx = width / 2;
      const cy = (height - (yMax + yMin) * s) / 2;
      const px = (x: number, y: number, z: number) => {
        const [rx, ry] = rot(x, y);
        return [cx + rx * s, cy + ry * TILT * s - z * s] as const;
      };

      ctx.clearRect(0, 0, width, height);
      // Back to front.
      const order = boxes
        .map((b) => ({ b, depth: rot(b.gx, b.gy)[1] }))
        .sort((p, q) => p.depth - q.depth);

      for (const { b } of order) {
        // Rise left to right across the year.
        const local = Math.min(1, Math.max(0, rise * 1.5 - (b.week / weeks) * 0.5));
        const eased = 1 - Math.pow(1 - local, 3);
        const z = Math.max(0.06, b.h * eased);
        const color = GRAPH_HEX[b.level] ?? GRAPH_HEX[0]!;
        const base = corners.map(([dx, dy]) => px(b.gx + dx, b.gy + dy, 0));
        const top = corners.map(([dx, dy]) => px(b.gx + dx, b.gy + dy, z));

        // Sides that face the camera, shaded by how much they face the light (left).
        normals.forEach(([nx, ny], k) => {
          const [rnx, rny] = rot(nx, ny);
          if (rny <= 0) return;
          const k2 = (k + 1) % 4;
          ctx.fillStyle = shade(color, 0.78 + 0.1 * -rnx);
          ctx.beginPath();
          ctx.moveTo(...base[k]!);
          ctx.lineTo(...base[k2]!);
          ctx.lineTo(...top[k2]!);
          ctx.lineTo(...top[k]!);
          ctx.closePath();
          ctx.fill();
        });
        ctx.fillStyle = color;
        ctx.beginPath();
        top.forEach((p, k) => (k ? ctx.lineTo(...p) : ctx.moveTo(...p)));
        ctx.closePath();
        ctx.fill();
      }

      // Keep animating while visible (sway), except with reduced motion, where we only
      // redraw while the visitor is dragging.
      if (running && (!reduce || drag.current.on)) raf = requestAnimationFrame(frame);
      else looping = false;
    };

    const loop = () => {
      if (!running || looping) return;
      looping = true;
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      running = true;
      loop();
    };
    const pause = () => {
      running = false;
      looping = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while on screen.
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? play() : pause()), {
      threshold: 0.15,
    });
    io.observe(c);

    // Drag sideways to rotate (vertical swipes still scroll the page).
    const down = (e: PointerEvent) => {
      drag.current.on = true;
      drag.current.startX = e.clientX;
      drag.current.startOffset = drag.current.offset;
      c.setPointerCapture(e.pointerId);
      loop();
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const next = drag.current.startOffset + (e.clientX - drag.current.startX) * 0.006;
      drag.current.offset = Math.max(-LIMIT, Math.min(LIMIT, next));
    };
    const up = () => {
      drag.current.on = false;
      loop();
    };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);

    return () => {
      pause();
      io.disconnect();
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
  }, [days, width, height]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className="block aspect-[1.6/1] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing sm:aspect-[2.7/1]"
    />
  );
}
