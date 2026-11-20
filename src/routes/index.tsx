import { createFileRoute } from "@tanstack/react-router";
import { Children, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  Code2,
  Download,
  GitMerge,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  MessagesSquare,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import avatar from "@/assets/kaneeza-avatar.webp";
import {
  AgentGraph,
  AuraScreen,
  BrowserFrame,
  DailyVisual,
  DexoScreen,
  ElderScreen,
  FellowshipPath,
  FirstPortfolioScreen,
  JssScreen,
  NexFellowTrack,
  PakLawScreen,
  PrScreen,
  TitanScreen,
  WorldMap,
} from "@/components/visuals";
import {
  CV_URL,
  DESC,
  EMAIL,
  GH,
  LINKS,
  SITE_URL,
  TITLE,
  TYPED,
  allProjects,
  aura,
  aws,
  certificates,
  chapters,
  communityRoles,
  followRepos,
  letter,
  marquee,
  orgs,
  payoffStats,
  terminal,
  toolsBuild,
  toolsLearn,
  type Kind,
  type OrgVisual,
  type Project,
} from "@/content";
import { useGitHub, useSukkurTemp, type Day, type GitHubData } from "@/lib/live-data";
import { GRAPH_HEX } from "@/lib/graph-colors";
import { Skyline } from "@/components/skyline";
import { AboutMe } from "@/components/about-me";
import { CurrentlyCard } from "@/components/currently-card";
import { InkStamp, MiniStamp } from "@/components/stamps";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Kaneeza Batool: It was supposed to be one homework assignment.",
      },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    // Structured data so search engines can show a "person" result with these profiles.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Kaneeza Batool",
          url: `${SITE_URL}/`,
          image: `${SITE_URL}/og-image.png`,
          description: DESC,
          jobTitle: "Computer science student and full-stack developer",
          affiliation: { "@type": "CollegeOrUniversity", name: "Sukkur IBA University" },
          address: { "@type": "PostalAddress", addressLocality: "Sukkur", addressCountry: "PK" },
          knowsAbout: ["React", "Node.js", "MongoDB", "TypeScript", "Applied AI", "RAG"],
          sameAs: [LINKS.github, LINKS.linkedin, LINKS.leetcode],
        }),
      },
    ],
  }),
  component: Index,
});

/* ---------- Hooks ---------- */
/** Fires once, the first time the element scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setV(true), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

/** null until mounted (server render and first paint), then whether the query matches. */
function useMedia(query: string) {
  const [m, setM] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/** Marks top-level sections that are off screen so CSS can pause their animations. */
function usePauseOffscreen(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(
      ":scope > header, :scope > main > section, :scope > main > header",
    );
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.removeAttribute("data-offscreen");
          else el.setAttribute("data-offscreen", "");
        }),
      { rootMargin: "150px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}

/** True only for a real mouse/trackpad with motion allowed (no 3D hover effects otherwise). */
const canHover3D = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hero depth: sets --px / --py (-1…1) on the returned element from the mouse position
 * over its <header>. Children translate/rotate by different amounts to look layered.
 */
function useDepth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const zone = el?.closest("header");
    if (!el || !zone || !canHover3D()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      x = clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 1.4));
      y = clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 1.4));
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      x = 0;
      y = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", leave);
    };
  }, []);
  return ref;
}

/**
 * Card tilt + light sweep: any element with `data-tilt` inside `root` leans toward the
 * mouse. One delegated listener for the whole page; styles live in styles.css.
 */
function useTiltCards(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const r = root.current;
    if (!r || !canHover3D()) return;
    let cur: HTMLElement | null = null;
    let last: PointerEvent | null = null;
    let raf = 0;
    const reset = (el: HTMLElement) => {
      el.removeAttribute("data-tilting");
      for (const v of ["--rx", "--ry", "--gx", "--gy", "--sx", "--sy"]) el.style.removeProperty(v);
    };
    const apply = () => {
      raf = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (el !== cur) {
        if (cur) reset(cur);
        cur = el;
      }
      if (!el) return;
      const b = el.getBoundingClientRect();
      const x = (last.clientX - b.left) / b.width;
      const y = (last.clientY - b.top) / b.height;
      // Big panels (data-tilt="soft") lean less than small cards.
      const k = el.dataset["tilt"] === "soft" ? 0.45 : 1;
      el.style.setProperty("--rx", `${((0.5 - y) * 12 * k).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 14 * k).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      // Shadow falls away from the pointer, as if lit from where it is.
      el.style.setProperty("--sx", ((0.5 - x) * 28 * k).toFixed(1));
      el.style.setProperty("--sy", ((0.5 - y) * 18 * k).toFixed(1));
      el.setAttribute("data-tilting", "");
    };
    const move = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      if (cur) reset(cur);
      cur = null;
      last = null;
    };
    r.addEventListener("pointermove", move);
    r.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      r.removeEventListener("pointermove", move);
      r.removeEventListener("pointerleave", leave);
    };
  }, [root]);
}

/* ---------- Small pieces ---------- */

const tilt = (seed: string, i = 0) => {
  let h = i * 7;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return ((h % 61) - 30) / 10; // -3 to 3 deg
};

function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  const shown = useRef(0);
  useEffect(() => {
    if (!inView) return;
    const from = shown.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = to;
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      const v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      shown.current = v;
      setN(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function Commit({ msg, dark = false }: { msg: string; dark?: boolean }) {
  return (
    <p
      className={`mb-2 font-mono text-[11px] break-words ${dark ? "text-cream/70" : "text-muted-foreground"}`}
    >
      <span className={dark ? "text-g2" : "text-primary-hover"}>$</span> git commit -m "{msg}"
    </p>
  );
}
function Sticky({ text, i = 0 }: { text: string; i?: number }) {
  return (
    <div
      data-tilt
      className="sticky-note tiltable"
      style={{ ["--tilt" as string]: `${tilt(text, i)}deg` }}
    >
      <span className="pin pop-3" aria-hidden />
      <p className="pop-2 font-hand text-xl leading-snug">{text}</p>
    </div>
  );
}
function Doodle({ kind }: { kind: "star" | "arrow" | "heart" | "squiggle" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className="ml-2 inline-block h-7 w-7 -translate-y-2 text-primary md:h-9 md:w-9"
    >
      {kind === "star" && <path {...common} d="M20 5l4 10 10 1-8 7 3 11-9-6-9 6 3-11-8-7 10-1z" />}
      {kind === "arrow" && <path {...common} d="M5 30c8-2 16-10 24-20M29 10l-1 8M29 10l-8 1" />}
      {kind === "heart" && (
        <path
          {...common}
          d="M20 33S6 24 6 15c0-5 6-8 10-4l4 4 4-4c4-4 10-1 10 4 0 9-14 18-14 18z"
        />
      )}
      {kind === "squiggle" && <path {...common} d="M4 22c4-8 8 8 12 0s8 8 12 0 6 6 8 2" />}
    </svg>
  );
}
function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className={className}>
      <path
        d="M3 14c40-8 90-10 194-6M10 18c50-5 100-6 150-3"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 40" className={className}>
      <path
        d="M4 8c14-4 32 0 44 18M48 26l-1-10M48 26l-10-2"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Guide({ line, dark = false }: { line: string; dark?: boolean }) {
  const [ref, v] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`guide mb-3 flex items-center gap-3 md:mb-6 ${v ? "visible" : ""}`}>
      <img
        src={avatar}
        alt=""
        width={56}
        height={56}
        loading="lazy"
        className="guide-float h-10 w-10 shrink-0 rounded-full md:h-14 md:w-14 bg-ink object-cover ring-2 ring-primary ring-offset-2 ring-offset-background"
      />
      <p
        className={`relative rounded-2xl rounded-bl-sm border px-3 py-2 font-mono text-xs ${dark ? "border-cream/20 bg-cream/10 text-cream" : "border-border bg-card text-foreground"}`}
      >
        {line}
      </p>
    </div>
  );
}
/**
 * Below `md`: a horizontally swipeable row with snap points and dot indicators.
 * From `md` up, `className` should switch it back to a grid or wrap (e.g. "md:grid ...").
 * Each child needs its own width and "shrink-0 snap-start" (plus "md:w-auto").
 */
function SwipeRow({
  label,
  className,
  dark = false,
  children,
}: {
  label: string;
  className: string;
  dark?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Count from React children, not the DOM: no layout read while the page is starting up.
  const count = Children.toArray(children).length;

  // Only measure when the visitor actually scrolls the row (reading offsets at mount
  // would force extra layout passes during startup).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const kids = [...el.children] as HTMLElement[];
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        setActive(kids.length - 1);
        return;
      }
      let best = 0;
      let dist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft - pad - el.scrollLeft);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className={`scrollbar-none relative flex snap-x snap-mandatory overflow-x-auto outline-none focus-visible:ring-2 focus-visible:ring-primary md:overflow-visible ${className}`}
      >
        {children}
      </div>
      {count > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-primary" : `w-1.5 ${dark ? "bg-cream/30" : "bg-g2"}`}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ref, v] = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className={`fade-in ${v ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
const Label = ({
  children,
  className = "text-muted-foreground",
}: {
  children: ReactNode;
  className?: string;
}) => <p className={`font-mono text-xs tracking-wider uppercase ${className}`}>{children}</p>;
const Tag = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span
    className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${dark ? "bg-cream/10 text-cream" : "bg-soft text-foreground"}`}
  >
    {children}
  </span>
);
const ExtLink = ({
  href,
  label,
  children,
}: {
  href?: string | undefined;
  label: string;
  children: ReactNode;
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex min-h-8 items-center gap-1 font-mono text-sm text-primary-hover underline-offset-4 hover:underline"
    >
      {children} <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  ) : null;

function SectionHead({
  eyebrow,
  title,
  accent,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="scroll-3d max-w-3xl">
      <Label className={dark ? "text-cream/70" : "text-muted-foreground"}>{eyebrow}</Label>
      <h2
        className={`mt-3 font-display text-4xl leading-[1.05] font-bold md:text-6xl ${dark ? "extrude-dark" : "extrude"}`}
      >
        {title}{" "}
        <span className="font-hand text-5xl font-bold text-primary md:text-7xl">{accent}</span>
      </h2>
      {sub && (
        <p className={`mt-4 text-lg ${dark ? "text-cream/75" : "text-muted-foreground"}`}>{sub}</p>
      )}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  // Phones only fit four links: "Story" (right after the hero) hides below sm.
  const links: { l: string; h: string; ext?: boolean; wide?: boolean }[] = [
    { l: "Story", h: "#story", wide: true },
    { l: "About", h: "#about" },
    { l: "Journey", h: "#journey" },
    { l: "Work", h: "#work" },
    { l: "Resume", h: CV_URL, ext: true },
  ];
  // Switch to a dark glass look while a dark section (or the footer) is behind the bar.
  const [onDark, setOnDark] = useState(false);
  useEffect(() => {
    const els = document.querySelectorAll("main > section.grain-ink, footer");
    if (!els.length) return;
    const under = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
        setOnDark(under.size > 0);
      },
      // A thin strip at the height of the bar.
      { rootMargin: "-36px 0px -94% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Main" className="sticky top-3 z-40 px-3">
      <div className="scroll-progress" aria-hidden />
      <div
        data-dark={onDark || undefined}
        className={`mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full border py-1.5 pr-1.5 pl-1.5 backdrop-blur-md transition-colors duration-300 ${
          onDark
            ? "border-cream/15 bg-ink/75 text-cream shadow-[0_10px_30px_-12px_oklch(0_0_0/0.7)]"
            : "border-border bg-background/85 shadow-lift"
        }`}
      >
        <a
          href="#top"
          aria-label="Kaneeza Batool, back to top"
          className="flex shrink-0 items-center gap-2 font-display text-base font-bold"
        >
          <img
            src={avatar}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-ink object-cover"
          />
          <span className="hidden md:inline">Kaneeza Batool</span>
        </a>
        <div className="flex items-center font-mono text-xs sm:gap-1 sm:text-sm">
          {links.map(({ l, h, ext, wide }) => (
            <a
              key={l}
              href={h}
              {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`min-h-8 items-center gap-1 rounded-full px-2 transition-colors sm:px-3 ${wide ? "hidden sm:inline-flex" : "inline-flex"} ${
                onDark
                  ? "hover:bg-cream/10 hover:text-g2"
                  : "hover:bg-soft hover:text-primary-hover"
              }`}
            >
              {l}
              {ext && <ArrowUpRight className="hidden h-3 w-3 sm:inline" aria-hidden />}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="btn-3d btn-3d-sm inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 font-mono text-xs text-primary-foreground hover:bg-primary-hover sm:px-3.5 sm:text-sm"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden /> <span>Say hi</span>
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
/** The empty graph, drawn as one SVG pattern instead of hundreds of elements. */
function EmptyGraph({ cols, className = "" }: { cols: number; className?: string }) {
  const id = `empty-cell-${cols}`;
  return (
    <svg viewBox={`0 0 ${cols * 10} 70`} className={`w-full ${className}`} aria-hidden>
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="0.8" y="0.8" width="8.4" height="8.4" rx="1.6" fill="var(--g0)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <rect
        x="0.8"
        y="0.8"
        width="8.4"
        height="8.4"
        rx="1.6"
        fill="var(--primary)"
        className="twinkle"
      />
    </svg>
  );
}

function Hero({ temp }: { temp: number | null }) {
  const [n, setN] = useState(0);
  const depth = useDepth<HTMLDivElement>();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TYPED.length);
      return;
    }
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= TYPED.length) window.clearInterval(t);
    }, 45);
    return () => window.clearInterval(t);
  }, []);
  // Pure CSS entrance (see .rise in styles.css): starts on first paint, no JavaScript needed.
  const appear = "rise";
  // Identity, not achievements: the numbers are saved for "One year later".
  const stickers = [
    { t: "Full-stack · MERN", Icon: Code2, cls: "-left-10 top-10 md:-left-16", tilt: -6 },
    { t: "Applied AI", Icon: Brain, cls: "-right-6 top-32 md:-right-8", tilt: 5 },
    { t: "CS · Sukkur IBA", Icon: GraduationCap, cls: "-right-4 bottom-16 md:-right-6", tilt: 3 },
  ];
  return (
    <header id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_auto_0.75fr] lg:gap-14">
        {/* Headline first on every screen; the portrait follows on phones. */}
        <div className="order-1">
          <p className="font-hand text-3xl text-primary">Kaneeza Batool</p>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            <span className="sr-only">{TYPED}</span>
            <span aria-hidden>{TYPED.slice(0, n)}</span>
            <span aria-hidden className="caret ml-0.5 text-primary">
              ▍
            </span>
          </p>
          <h1
            className={`extrude mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-5xl xl:text-6xl ${appear}`}
          >
            It was supposed to be one{" "}
            <span className="relative inline-block">
              homework
              <Scribble className="absolute -bottom-2 left-0 h-3 w-full" />
            </span>{" "}
            assignment.
          </h1>
          <p className={`mt-6 max-w-xl text-lg text-muted-foreground ${appear} [--d:150ms]`}>
            A year later, it had turned into hackathons, fellowships, open source and a campus
            community. This is how one assignment got out of hand.
          </p>
          <div className={`mt-8 flex flex-wrap gap-3 ${appear} [--d:300ms]`}>
            <a
              href="#story"
              className="btn-3d rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Read the story
            </a>
            <a
              href="#work"
              className="btn-3d btn-3d-light rounded-full border border-primary bg-background px-6 py-3 text-sm font-medium text-primary-hover hover:bg-soft"
            >
              Skip to the work
            </a>
          </div>
        </div>

        <div ref={depth} className="scene-3d relative order-2 mx-auto">
          {/* Two tilted orbits behind the portrait. */}
          <div
            className="orbit w-[118%] sm:w-[150%]"
            style={{
              transform:
                "rotateX(calc(70deg + var(--py, 0) * 8deg)) rotateY(calc(-14deg + var(--px, 0) * 10deg))",
            }}
            aria-hidden
          >
            <div className="orbit-ring" />
          </div>
          <div
            className="orbit hidden w-[122%] sm:block"
            style={{
              transform:
                "rotateX(calc(64deg + var(--py, 0) * 8deg)) rotateY(calc(22deg + var(--px, 0) * 10deg))",
            }}
            aria-hidden
          >
            <div className="orbit-ring solid" />
          </div>
          {/* A coloured back plate gives the portrait a visible thickness. */}
          <div
            aria-hidden
            style={{
              transform:
                "perspective(1000px) rotateY(calc(var(--px, 0) * 9deg)) rotateX(calc(var(--py, 0) * -9deg)) translate3d(14px, 14px, -40px)",
            }}
            className="arch absolute inset-0 bg-g2 transition-transform duration-300 ease-out"
          />
          <div
            style={{
              transform:
                "perspective(1000px) rotateY(calc(var(--px, 0) * 9deg)) rotateX(calc(var(--py, 0) * -9deg))",
            }}
            className="arch relative h-72 w-56 transition-transform duration-300 ease-out overflow-hidden bg-ink shadow-lift ring-4 ring-primary ring-offset-4 ring-offset-background md:h-[26rem] md:w-80"
          >
            <img
              src={avatar}
              alt="Illustrated avatar of Kaneeza in a hoodie and headphones"
              width={320}
              height={416}
              fetchPriority="high"
              style={{ translate: "calc(var(--px, 0) * -10px) calc(var(--py, 0) * -10px)" }}
              className="h-full w-full scale-110 object-cover object-[50%_40%] transition-[translate] duration-300 ease-out"
            />
          </div>
          {stickers.map(({ t, Icon, cls, tilt: tl }, i) => (
            <span
              key={t}
              className={`floaty absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-lift ${cls}`}
              style={{
                ["--tilt" as string]: `${tl}deg`,
                animationDelay: `${i * 700}ms`,
                translate: `calc(var(--px, 0) * ${18 + i * 6}px) calc(var(--py, 0) * ${18 + i * 6}px) ${30 + i * 10}px`,
              }}
            >
              <Icon className="h-3.5 w-3.5 text-primary" aria-hidden /> {t}
            </span>
          ))}
          <div
            className="absolute -right-4 -bottom-6 hidden items-end gap-1 transition-[translate] duration-300 ease-out md:flex"
            style={{ translate: "calc(var(--px, 0) * 12px) calc(var(--py, 0) * 12px) 50px" }}
            aria-hidden
          >
            <HandArrow className="h-8 w-12 -scale-x-100 rotate-180" />
            <span className="font-hand text-xl leading-none text-primary">me + my headphones</span>
          </div>
        </div>

        {/* Phones: a swipeable row of status cards. sm: three across. lg: a column. */}
        <div className={`order-3 min-w-0 ${appear} [--d:200ms]`}>
          <SwipeRow
            label="Status"
            className="-mx-5 scroll-px-5 items-start gap-3 px-5 pt-4 pb-3 md:mx-0 md:items-stretch md:grid md:grid-cols-2 md:px-0 md:pt-0 md:pb-0 lg:grid-cols-1 *:w-[78%] *:shrink-0 *:snap-start md:*:w-auto"
          >
            <div data-tilt className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="pop-1 flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
                <span className="pulse-dot h-2 w-2 rounded-full bg-primary" aria-hidden /> Open to
              </div>
              <p className="pop-2 mt-2 text-sm font-medium">
                Remote internships, open source, collaboration
              </p>
            </div>
            <div data-tilt className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="pop-1 flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
                <Users className="h-3.5 w-3.5 text-primary" aria-hidden /> Leading
              </div>
              <p className="pop-2 mt-2 text-sm font-medium">
                The first AWS Student Builder Group at Sukkur IBA
              </p>
            </div>
            <div data-tilt className="rounded-2xl bg-ink p-4 text-cream shadow-soft">
              <div className="pop-1 flex items-center gap-2 font-mono text-[11px] text-cream/70 uppercase">
                <MapPin className="h-3.5 w-3.5 text-g2" aria-hidden /> Based in
              </div>
              <p className="pop-2 mt-2 text-sm font-medium">Sukkur, Pakistan</p>
              {temp !== null && (
                <p className="pop-2 mt-1 font-mono text-xs text-cream/75">
                  ☀ it's {temp}°C there right now.
                </p>
              )}
            </div>
            <CurrentlyCard />
          </SwipeRow>
        </div>
      </div>

      {/* The entrance animation sits on a wrapper so it doesn't fight the card's tilt. */}
      <div className={`mt-16 ${appear} [--d:450ms]`}>
        <div
          data-tilt="soft"
          className="rounded-3xl border border-border bg-card p-5 shadow-soft md:p-7"
        >
          <div className="pop-1 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" aria-hidden />
              <span className="font-mono text-sm">
                <span className="hidden sm:inline">github.com/</span>
                {GH}
              </span>
              <span className="rounded-full bg-soft px-2.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-primary-hover">
                Nov 2025
              </span>
            </div>
            <span className="font-hand text-2xl leading-none text-primary">
              day one. nothing here yet.
            </span>
          </div>
          <EmptyGraph cols={18} className="mt-5 sm:hidden" />
          <EmptyGraph cols={53} className="mt-5 hidden sm:block" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
            <span>
              <span className="font-medium text-primary-hover">0 repositories</span> · 0
              contributions
            </span>
            <a href="#story" className="inline-flex min-h-8 items-center hover:text-primary-hover">
              scroll to watch it fill ↓
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- What I do ---------- */
function Bento() {
  const cards = [
    {
      k: "I build",
      title: "Full-stack web",
      line: "MERN apps, from multi-portal systems to redesigns of live sites.",
      Icon: Code2,
      visual: (
        <BrowserFrame url="localhost:5173" className="-rotate-2">
          <div className="grid grid-cols-[2.5rem_1fr] gap-2 p-2.5">
            <div className="space-y-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-g1"}`} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="col-span-3 h-6 rounded bg-soft" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-8 rounded bg-card" />
              ))}
            </div>
          </div>
        </BrowserFrame>
      ),
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      k: "I make AI do real work",
      title: "Applied AI",
      line: "Multi-agent systems, retrieval over real documents, voice interfaces.",
      Icon: Brain,
      visual: (
        <div className="h-36 w-full" aria-hidden>
          <AgentGraph />
        </div>
      ),
      tags: ["CrewAI", "FastAPI", "RAG"],
    },
    {
      k: "I bring people along",
      title: "Community",
      line: "A campus builder group, global fellowships and an alumni Discord I started.",
      Icon: Users,
      visual: (
        <div className="flex h-36 items-center justify-center" aria-hidden>
          <div className="flex -space-x-3">
            {["", "", "", "", "", "+"].map((c, i) => (
              <span
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-card font-display text-sm font-bold ${
                  ["bg-primary", "bg-g1", "bg-g2", "bg-g3", "bg-g4", "bg-ink text-cream"][i]
                }`}
              >
                {i === 0 ? (
                  <img
                    src={avatar}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  c
                )}
              </span>
            ))}
          </div>
        </div>
      ),
      tags: ["AWS", "GWY Fellowship", "Dev Weekends"],
    },
    {
      k: "I show up daily",
      title: "Consistency",
      line: "DSA in Java every day, ML notebooks as I learn, all on GitHub.",
      Icon: Sparkles,
      visual: <DailyVisual />,
      tags: ["GitHub", "LeetCode", "Java"],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 md:py-16">
      <div className="flex items-end justify-between gap-4">
        <SectionHead eyebrow="What I do" title="Four things I keep" accent="doing." />
        <span
          className="shrink-0 pb-2 font-mono text-xs text-muted-foreground md:hidden"
          aria-hidden
        >
          swipe →
        </span>
      </div>
      {/* Phones: one swipeable row (the next card peeks in). md and up: the usual grid. */}
      <SwipeRow
        label="What I do, four cards"
        className="-mx-5 mt-10 scroll-px-5 gap-4 px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:px-0 md:pb-0 lg:grid-cols-4"
      >
        {cards.map(({ k, title, line, Icon, visual, tags }) => (
          <FadeIn key={k} className="w-[82%] shrink-0 snap-start md:w-auto">
            <article
              data-tilt
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="pop-2 flex items-center justify-between">
                <span className="btn-3d flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{title}</span>
              </div>
              <h3 className="pop-1 mt-4 font-display text-xl leading-tight font-bold">{k}</h3>
              <div className="pop-3 my-5 flex flex-1 items-center">{visual}</div>
              <p className="text-sm text-muted-foreground">{line}</p>
              <div className="pop-1 mt-3 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </SwipeRow>
    </section>
  );
}

/* ---------- GitHub graph ---------- */
/**
 * Draws the year of contributions on one <canvas> instead of 365 DOM cells, and animates
 * the fill from the previously drawn day to the new cut-off.
 */
function GraphCanvas({ list, cut, weeks }: { list: Day[]; cut: number; weeks: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawn = useRef(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    if (typeof ResizeObserver === "undefined") {
      const measure = () => setWidth(c.clientWidth);
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    // Size arrives after the browser's own layout: no forced layout at startup.
    const ro = new ResizeObserver(([e]) => setWidth(e?.contentRect.width ?? 0));
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !width) return;
    const css = getComputedStyle(document.documentElement);
    const colors = GRAPH_HEX.map((hex, l) => {
      const v = css.getPropertyValue(`--g${l}`).trim();
      if (!v) return hex;
      ctx.fillStyle = hex;
      ctx.fillStyle = v; // ignored if the browser can't parse it
      return ctx.fillStyle === hex.toLowerCase() ? hex : v;
    });
    const dpr = window.devicePixelRatio || 1;
    const step = width / weeks;
    const size = step * 0.82;
    const r = Math.max(1, size * 0.18);
    c.width = Math.round(width * dpr);
    c.height = Math.round(step * 7 * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const paint = (upTo: number) => {
      ctx.clearRect(0, 0, width, step * 7);
      list.forEach((d, i) => {
        ctx.fillStyle = colors[i < upTo ? d.level : 0] ?? colors[0]!;
        ctx.beginPath();
        ctx.roundRect(Math.floor(i / 7) * step, (i % 7) * step, size, size, r);
        ctx.fill();
      });
    };

    const from = Math.min(drawn.current, list.length);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || from === cut) {
      drawn.current = cut;
      paint(cut);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 700);
      const at = Math.round(from + (cut - from) * (1 - Math.pow(1 - p, 3)));
      drawn.current = at;
      paint(at);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [list, cut, weeks, width]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="block w-full"
      style={{ aspectRatio: `${weeks} / 7` }}
    />
  );
}

function Graph({ gh, reveal }: { gh: GitHubData; reveal: number }) {
  const { days, total, repos, snapshot } = gh;
  const list: Day[] =
    days && days.length
      ? days
      : Array.from({ length: 365 }, () => ({ date: "", count: 0, level: 0 }));
  const weeks = Math.ceil(list.length / 7);
  const cut = Math.round(list.length * reveal);
  const shown = list.slice(0, cut).reduce((a, d) => a + d.count, 0);
  return (
    <div className="w-full">
      <GraphCanvas list={list} cut={cut} weeks={weeks} />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
        <span aria-live="polite">
          <span className="font-medium text-primary-hover">
            {/* Phrased as progress so it doesn't read as a different total from the payoff. */}
            {reveal > 0 && reveal < 1
              ? `${Math.round(repos * reveal)} of ${repos} repositories`
              : `${Math.round(repos * reveal)} repositories`}
          </span>
          {" · "}
          {days ? `${shown} of ${total ?? 0} contributions` : "Loading GitHub…"}
          {snapshot && reveal > 0 && <span> (saved {snapshot})</span>}
        </span>
        {reveal === 0 ? (
          <span>scroll to watch it fill ↓</span>
        ) : (
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-8 items-center hover:text-primary-hover"
          >
            @{GH}
          </a>
        )}
      </div>
    </div>
  );
}

/* ---------- Project card ---------- */
const SCREENS: Record<string, () => ReactNode> = {
  auraCheck: () => <AuraScreen />,
  TITAN: () => <TitanScreen />,
  PakLawAI: () => <PakLawScreen />,
  ElderBridge: () => <ElderScreen />,
  "JobSkillShare redesign": () => <JssScreen />,
  "Dexo.pk": () => <DexoScreen />,
};

const projectId = (p: Project) =>
  `project-${p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

/**
 * Compact version used inside the story: thumbnail, title, role and award, plus a link
 * to the full card in "All work" (which keeps the long description and big mockup).
 */
function StoryProjectRow({ p }: { p: Project }) {
  return (
    // Phones: small thumbnail beside the title, details at full width below.
    // sm and up: thumbnail on the left spanning both rows.
    <article
      data-tilt
      className="grid grid-cols-[5.5rem_1fr] items-center gap-x-3 gap-y-1 rounded-2xl border border-border bg-card p-3 shadow-soft sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-x-4"
    >
      <div className="pop-3 relative h-14 overflow-hidden rounded-xl bg-soft shadow-soft sm:row-span-2 sm:h-28">
        <div className="pointer-events-none absolute top-1/2 left-1/2 w-100 -translate-x-1/2 -translate-y-1/2 scale-[0.22] sm:scale-[0.4]">
          {SCREENS[p.title]?.()}
        </div>
      </div>
      <div className="pop-1 flex min-w-0 items-start justify-between gap-2">
        <h4 className="font-display text-lg leading-tight font-bold sm:text-xl">{p.title}</h4>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${p.kind === "ai" ? "bg-primary-hover text-primary-foreground" : "bg-background"}`}
        >
          {p.kind === "ai" ? "AI" : "Web"}
        </span>
      </div>
      <div className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2">
        {p.role && (
          <p className="mt-1.5 text-sm leading-snug">
            <span className="font-mono text-[11px] text-primary-hover uppercase">My role · </span>
            {p.role}
          </p>
        )}
        {p.result && (
          <p className="mt-2 flex gap-1.5 text-sm leading-snug font-medium text-primary-hover">
            <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            {p.result}
          </p>
        )}
        <a
          href={`#${projectId(p)}`}
          className="mt-1 inline-flex min-h-8 items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary-hover"
        >
          see full card <span aria-hidden>↓</span>
          <span className="sr-only"> for {p.title}</span>
        </a>
      </div>
    </article>
  );
}

function ProjectCard({ p, big = false }: { p: Project; big?: boolean }) {
  return (
    <article
      id={projectId(p)}
      data-tilt
      className={`project-card group h-full scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card shadow-soft ${big ? "lg:grid lg:grid-cols-[1.25fr_1fr]" : "flex flex-col"}`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-soft p-5 md:p-7 ${big ? "lg:order-2" : ""}`}
      >
        <div className="w-full drop-shadow-[0_18px_22px_oklch(0.2_0.04_285/0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:transform-[perspective(900px)_rotateY(-9deg)_rotateX(6deg)]">
          {SCREENS[p.title]?.()}
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${big ? "p-6 md:p-8" : "p-5"}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display font-bold ${big ? "text-3xl md:text-4xl" : "text-xl"}`}>
            {p.title}
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${p.kind === "ai" ? "bg-primary-hover text-primary-foreground" : "bg-background"}`}
          >
            {p.kind === "ai" ? "AI" : "Web"}
          </span>
        </div>
        {p.what && <p className="mt-3 text-sm text-muted-foreground">{p.what}</p>}
        {p.role && (
          <p className="mt-3 text-sm">
            <span className="font-mono text-[11px] text-primary-hover uppercase">My role · </span>
            {p.role}
          </p>
        )}
        {big && p.context && <p className="mt-3 text-sm text-muted-foreground">{p.context}</p>}
        {p.result && (
          <p className="mt-4 flex gap-2 rounded-2xl bg-background px-3 py-2.5 text-sm font-medium text-primary-hover">
            <Trophy className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {p.result}
          </p>
        )}
        <div className="mt-auto pt-4">
          {p.team && (
            <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Users className="h-3.5 w-3.5" aria-hidden /> {p.team}
            </p>
          )}
          {p.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
          {(p.live || p.github) && (
            <div className="mt-3 flex flex-wrap gap-5">
              <ExtLink href={p.live} label={`${p.title} live site`}>
                Live
              </ExtLink>
              <ExtLink href={p.github} label={`${p.title} source code`}>
                Code
              </ExtLink>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- Chapter 4 pieces ---------- */
function Stamp() {
  const text = "AWS STUDENT BUILDER GROUP · SUKKUR IBA · EST. SEP 2026 · ";
  return (
    <div className="relative mx-auto h-48 w-48 md:h-56 md:w-56" aria-hidden>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontFamily="JetBrains Mono" fontSize="11" fill="var(--primary)">
          <textPath href="#stamp-circle" textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-9 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-primary bg-background shadow-soft">
        <span className="font-display text-5xl font-bold text-primary">01</span>
        <span className="font-hand text-lg leading-none">first ever</span>
      </div>
    </div>
  );
}

function CommunityRow() {
  const icons = { discord: MessagesSquare, ambassador: Megaphone };
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {communityRoles.map((r) => {
        const Icon = icons[r.icon];
        return (
          <li
            key={r.text}
            data-tilt
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 shadow-soft"
          >
            <span className="pop-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary-hover shadow-soft">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="pop-1">
              <span className="block font-medium leading-snug">{r.text}</span>
              <span className="block text-sm text-muted-foreground">{r.note}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Page ---------- */
function Index() {
  const gh = useGitHub();
  const temp = useSukkurTemp();
  const desktop = useMedia("(min-width: 768px)");
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  usePauseOffscreen(root);
  useTiltCards(root);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset["idx"])),
        ),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  // The graph is full by the end of chapter 4.
  const reveal = active < 0 ? 0 : (active + 1) / chapters.length;

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-sm text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero temp={temp} />
        <Bento />

        {/* Story */}
        {/* Bottom padding: the sticky GitHub card stops short of the dark section below. */}
        <section id="story" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-10 pb-12 md:pb-20">
          <SectionHead
            eyebrow="The story"
            title="How one assignment got"
            accent="out of hand."
            sub="Four chapters, one GitHub graph. Watch it fill as you scroll."
          />
          {desktop === false && (
            <div className="sticky top-[68px] z-20 -mx-5 mt-8 border-b border-border bg-background/95 px-5 py-3 backdrop-blur">
              <Graph gh={gh} reveal={reveal} />
            </div>
          )}
          <div className="md:grid md:grid-cols-[0.85fr_1.5fr] md:gap-12">
            <aside className="hidden md:block">
              <div className="sticky top-28 mt-16 rounded-3xl border border-border bg-card p-5 shadow-soft">
                <Label>GitHub, chapter by chapter</Label>
                <div className="mt-4">{desktop && <Graph gh={gh} reveal={reveal} />}</div>
                <ol className="mt-5 space-y-1.5 border-t border-border pt-4">
                  {chapters.map((c, i) => (
                    <li
                      key={c.title}
                      className={`flex items-center gap-2 font-mono text-xs transition-colors ${active >= i ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active === i ? "bg-primary-hover text-primary-foreground" : active > i ? "bg-g2" : "bg-g0"}`}
                      >
                        {i + 1}
                      </span>
                      {c.title}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
            <div className="min-w-0">
              {chapters.map((c, i) => (
                <article
                  key={c.title}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="relative py-10 md:py-14"
                >
                  <span
                    aria-hidden
                    className="text-outline num-3d pointer-events-none absolute top-6 right-0 hidden font-display md:block text-[7rem] leading-none font-bold select-none md:text-[11rem]"
                  >
                    0{i + 1}
                  </span>
                  <Guide line={c.bubble} />
                  <FadeIn>
                    <Commit msg={c.commit} />
                    <div className="flex flex-wrap items-center gap-2">
                      <Label className="text-primary-hover">{c.label}</Label>
                      <span className="rounded-full bg-soft px-2.5 py-0.5 font-mono text-[11px] text-primary-hover">
                        {c.date}
                      </span>
                    </div>
                    {/* h3: chapters sit under the Story section's h2. */}
                    <h3 className="relative mt-3 font-display text-3xl leading-tight font-bold md:text-5xl">
                      {c.title}
                      <Doodle kind={c.doodle} />
                    </h3>
                    {c.lines && (
                      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
                        <div className="space-y-2 text-xl text-muted-foreground">
                          {c.lines.map((l) => (
                            <p key={l}>{l}</p>
                          ))}
                        </div>
                        <figure
                          data-tilt
                          className="polaroid tiltable"
                          style={{ ["--tilt" as string]: "2.5deg" }}
                        >
                          <span className="tape" aria-hidden />
                          <div className="pop-2">
                            <FirstPortfolioScreen />
                          </div>
                          <figcaption className="pop-1 mt-2 text-center font-hand text-xl">
                            my first portfolio. plain HTML.
                          </figcaption>
                        </figure>
                      </div>
                    )}
                    {c.community && (
                      <>
                        {/* Phones: half-size stamp beside the headline, text below.
                            lg: full stamp on the left spanning both rows. */}
                        <div
                          data-tilt="soft"
                          className="mt-8 grid grid-cols-[6rem_1fr] items-center gap-x-4 gap-y-3 rounded-3xl border border-border bg-card p-5 shadow-soft md:mt-10 md:grid-cols-[7rem_1fr] md:p-8 lg:grid-cols-[auto_1fr] lg:gap-x-8"
                        >
                          <div className="pop-3 h-24 w-24 md:h-28 md:w-28 lg:row-span-2 lg:h-auto lg:w-auto">
                            <div className="origin-top-left scale-50 lg:scale-100">
                              <Stamp />
                            </div>
                          </div>
                          <p className="font-display text-xl leading-snug font-bold text-primary-hover md:text-3xl lg:self-end">
                            {aws.stat}
                          </p>
                          <p className="col-span-2 text-base text-muted-foreground md:text-lg lg:col-span-1 lg:col-start-2 lg:self-start">
                            {aws.text}
                          </p>
                        </div>
                        <CommunityRow />
                      </>
                    )}
                  </FadeIn>
                  {(c.featured || c.projects) && (
                    <ul className="mt-8 space-y-3">
                      {[...(c.featured ? [c.featured] : []), ...(c.projects ?? [])].map((p) => (
                        <li key={p.title}>
                          <FadeIn>
                            <StoryProjectRow p={p} />
                          </FadeIn>
                        </li>
                      ))}
                    </ul>
                  )}
                  {c.stickies && (
                    <div className="mt-8 md:mt-10">
                      <SwipeRow
                        label="Sticky notes"
                        className="-mx-5 scroll-px-5 gap-5 px-5 py-4 *:shrink-0 *:snap-start md:mx-0 md:flex-wrap md:gap-6 md:px-2 md:py-0"
                      >
                        {c.stickies.map((t, k) => (
                          <Sticky key={t} text={t} i={k} />
                        ))}
                      </SwipeRow>
                    </div>
                  )}
                  {c.note && (
                    <p className="mt-6 flex items-start gap-2 font-mono text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {c.note}
                    </p>
                  )}
                  {c.badges && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {c.badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-2 rounded-full border border-gold bg-background px-3 py-1.5 text-xs font-medium text-foreground"
                        >
                          <Award className="h-3.5 w-3.5 text-gold" aria-hidden /> {b}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About me: the person, not only the developer. */}
        <AboutMe />
        {/* Reach's map now lives in the Journey header; "Things I didn't finish" is a
            question in the About chat; "Now" closes the payoff section. */}
        <Journey temp={temp} />
        <Work />
        <Tools />

        <Payoff gh={gh} />

        {/* Letter */}
        <section className="mx-auto max-w-3xl px-5 py-20">
          <Guide line="one more thing." />
          <Label>A letter to Kaneeza, Nov 2027</Label>
          <div
            data-tilt="soft"
            className="paper relative mt-8 -rotate-1 rounded-sm border border-border p-8 shadow-lift md:p-12"
          >
            <span
              className="pop-3 absolute -top-5 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground shadow-soft ring-4 ring-primary/30"
              aria-hidden
            >
              K
            </span>
            <div className="pop-1 space-y-3 font-hand text-2xl leading-snug md:text-3xl">
              {letter.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="pt-2 text-right">Kaneeza, Nov 2026</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            I wrote a letter like this to my future self during the GWY Fellowship. This is the next
            one.
          </p>
        </section>

        <Contact />
      </main>

      <footer className="bg-ink py-6 text-center font-mono text-xs text-cream/75">
        © 2026 kaneeza · Built with React, Tailwind and too many cups of chai{" "}
        <span role="img" aria-label="chai cup">
          ☕
        </span>{" "}
        ·{" "}
        <a
          href="#top"
          className="inline-flex min-h-8 items-center underline-offset-4 hover:text-cream hover:underline"
        >
          back to top
        </a>
      </footer>
    </div>
  );
}

/* ---------- Journey: an interactive passport ---------- */
function OrgVisualView({ v }: { v: OrgVisual }) {
  switch (v) {
    case "pr":
      return <PrScreen />;
    case "nexfellow":
      return <NexFellowTrack />;
    case "stamp":
      return <Stamp />;
    case "fellowship":
      // Drawn for dark backgrounds: keep it on a small ink card on the cream page.
      return (
        <div className="rounded-xl bg-ink p-4 text-cream shadow-lift">
          <FellowshipPath dark />
        </div>
      );
    case "paklaw":
      return <PakLawScreen />;
    case "titan":
      return <TitanScreen />;
    case "elder":
      return (
        <div className="rounded-xl bg-card py-5 shadow-soft">
          <ElderScreen />
        </div>
      );
    case "jss":
      return (
        <div className="rounded-xl bg-card p-3 shadow-soft">
          <JssScreen />
        </div>
      );
    case "devweekends":
      return (
        <div aria-hidden className="grid grid-cols-4 gap-2 rounded-xl bg-card p-4 shadow-soft">
          {[
            ["M", "MongoDB"],
            ["E", "Express"],
            ["R", "React"],
            ["N", "Node.js"],
          ].map(([l, n]) => (
            <div key={l} className="flex flex-col items-center gap-1 rounded-lg bg-background p-2">
              <span className="font-display text-3xl font-bold text-primary">{l}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{n}</span>
            </div>
          ))}
          <div className="col-span-4 flex items-center justify-center gap-2 rounded-lg bg-soft py-2 font-mono text-[11px]">
            <Code2 className="h-3.5 w-3.5 text-primary" /> + DSA practice on LeetCode
          </div>
        </div>
      );
  }
}

function Journey({ temp }: { temp: number | null }) {
  const [sel, setSel] = useState(0);
  const o = orgs[sel] ?? orgs[0]!;
  return (
    <section id="journey" className="grain-ink stage scroll-mt-20 text-cream">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_24rem]">
          <SectionHead
            dark
            eyebrow="Journey"
            title="Where I've"
            accent="been."
            sub="Built from Sukkur, with fellowships, hackathons, open source, an internship and a campus group. Pick one."
          />
          {/* The dotted world map (formerly its own "Reach" section). */}
          <div className="hidden lg:block">
            <HomeMap temp={temp} />
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[19rem_1fr]">
          {/* Organisations: each one is a small ink stamp that straightens when picked. */}
          <div
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 py-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            role="group"
            aria-label="Organisations"
          >
            {orgs.map((g, i) => (
              <button
                key={g.name}
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                aria-controls="journey-panel"
                className={`flex shrink-0 items-center gap-3 rounded-2xl border p-2 pr-4 text-left transition-colors ${
                  sel === i
                    ? "border-primary bg-primary/20"
                    : "border-cream/10 bg-cream/5 hover:border-cream/30 hover:bg-cream/10"
                }`}
              >
                <MiniStamp org={g} i={i} active={sel === i} />
                <span className="min-w-0">
                  <span className="block max-w-48 truncate text-sm font-medium lg:max-w-none lg:whitespace-normal">
                    {g.name}
                  </span>
                  <span className="block font-mono text-[10px] text-cream/70">{g.when}</span>
                </span>
              </button>
            ))}
          </div>

          {/* The picked organisation as a visa page, with its stamp thumped on. */}
          <article
            id="journey-panel"
            key={o.name}
            aria-live="polite"
            className="passport-cover visa-in self-start"
          >
            <div className="passport-page">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-widest text-ink/60 uppercase">
                    Visa · entry {sel + 1} of {orgs.length}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight font-bold text-ink md:text-3xl">
                    {o.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-ink/60">{o.when}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1 font-mono text-xs text-primary-hover">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden /> {o.role}
                  </p>
                </div>
                <InkStamp org={o} i={sel} className="w-24 shrink-0 sm:w-32" />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className="text-sm leading-relaxed text-ink/80">{o.what}</p>
                  {o.result && (
                    <p className="mt-5 flex gap-2 rounded-2xl bg-soft px-3 py-2.5 text-sm font-medium text-primary-hover">
                      <Trophy className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {o.result}
                    </p>
                  )}
                  <p className="mt-5 border-l-2 border-dashed border-primary/50 pl-3">
                    <span className="block font-mono text-[10px] tracking-widest text-ink/75 uppercase">
                      What it taught me
                    </span>
                    <span className="mt-1 block font-hand text-xl leading-snug text-primary-hover">
                      {o.learned}
                    </span>
                  </p>
                  {o.badge && (
                    <a
                      href={o.badge.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-3d mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-primary-hover px-4 text-sm font-medium text-primary-foreground hover:bg-primary"
                    >
                      <GitMerge className="h-4 w-4" aria-hidden /> {o.badge.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <OrgVisualView v={o.visual} />
                  </div>
                </div>
              </div>

              <div
                className="mt-7 grid border-t border-dashed border-ink/20"
                style={{ gridTemplateColumns: `repeat(${o.stats.length}, minmax(0, 1fr))` }}
              >
                {o.stats.map(([n, l]) => (
                  <div
                    key={l}
                    className="border-dashed border-ink/20 pt-4 pr-3 not-last:border-r not-first:pl-4"
                  >
                    <p className="font-display text-2xl font-bold text-primary-hover sm:text-3xl">
                      {n}
                    </p>
                    <p className="text-xs text-ink/65">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- Home base map (shown in the Journey header on large screens) ---------- */
function HomeMap({ temp }: { temp: number | null }) {
  return (
    <figure className="rounded-2xl border border-cream/15 bg-cream/5 p-3">
      <WorldMap className="w-full" />
      <figcaption className="mt-2 flex items-center justify-between gap-2 px-1 font-mono text-[11px] text-cream/70">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-g2" aria-hidden /> home base: Sukkur, Pakistan
        </span>
        {temp !== null && <span>{temp}°C right now</span>}
      </figcaption>
    </figure>
  );
}

/* ---------- Now (closes the payoff section) ---------- */
function NowPanel() {
  const icons = [Brain, Code2];
  return (
    <div className="mt-16 border-t border-cream/10 pt-14">
      <Commit msg="feat: AI happened" dark />
      <h3 className="extrude-dark font-display text-3xl font-bold md:text-4xl">
        This chapter is still being written.
        <span className="caret ml-1 text-primary" aria-hidden>
          |
        </span>
      </h3>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-cream/15 bg-ink/70 shadow-[0_30px_60px_-30px_oklch(0_0_0/0.8)]">
          <div className="flex items-center gap-1.5 border-b border-cream/10 px-4 py-3" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/40" />
            <span className="ml-3 font-mono text-xs text-cream/70">~/kaneeza/now</span>
          </div>
          <dl className="space-y-3 p-5 font-mono text-sm md:p-6">
            {terminal.map(([k, v]) => (
              <div key={k} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="text-g2">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <p className="pt-2 text-cream/70" aria-hidden>
              $ <span className="caret">▍</span>
            </p>
          </dl>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-medium">Follow the work as it happens</p>
          {followRepos.map(({ repo, line }, i) => {
            const I = icons[i] ?? Code2;
            return (
              <a
                key={repo}
                href={`${LINKS.github}/${repo}`}
                target="_blank"
                rel="noreferrer"
                data-tilt
                className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-4 transition-colors hover:border-primary hover:bg-primary/10"
              >
                <span className="pop-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-hover text-primary-foreground shadow-[0_8px_16px_-8px_oklch(0_0_0/0.7)]">
                  <I className="h-5 w-5" aria-hidden />
                </span>
                <span className="pop-1 min-w-0 flex-1">
                  <span className="block truncate font-mono text-sm">{repo}</span>
                  <span className="block text-xs text-cream/70">{line}</span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-cream/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-g2"
                  aria-hidden
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Work ---------- */
function Work() {
  const [f, setF] = useState<"all" | Kind>("all");
  const [expanded, setExpanded] = useState(false);
  const rest = allProjects.filter((p) => p !== aura && (f === "all" || p.kind === f));
  // Collapsed ("All" only): the featured card plus two more (three on desktop, filling a
  // row). Every card stays in the DOM so links from the story can always reach it.
  const collapsed = f === "all" && !expanded;
  // A "see full card" link from the story may target a card the filter or the collapse
  // hides: show everything, then scroll to it once it's rendered.
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("project-")) return;
      setF("all");
      setExpanded(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()),
      );
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="All work" title="Everything I've" accent="built so far." />
        <div className="flex gap-2 font-mono text-sm" role="group" aria-label="Filter projects">
          {(["all", "ai", "web"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setF(k)}
              aria-pressed={f === k}
              className={`min-h-9 rounded-full border px-4 transition-colors ${f === k ? "border-primary-hover bg-primary-hover text-primary-foreground" : "border-border bg-card hover:bg-soft"}`}
            >
              {k === "all" ? "All" : k === "ai" ? "AI" : "Web"}
            </button>
          ))}
        </div>
      </div>
      {f !== "web" && (
        <div className="mt-10">
          <ProjectCard p={aura} big />
        </div>
      )}
      <div id="work-grid" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <div
            key={p.title}
            hidden={collapsed && i >= 3}
            className={collapsed && i === 2 ? "hidden lg:block" : undefined}
          >
            <FadeIn>
              <ProjectCard p={p} />
            </FadeIn>
          </div>
        ))}
      </div>
      {f === "all" && rest.length > 2 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (expanded) document.getElementById("work")?.scrollIntoView();
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-controls="work-grid"
            className="btn-3d btn-3d-light inline-flex min-h-10 items-center gap-2 rounded-full border border-primary bg-background px-5 font-mono text-sm text-primary-hover hover:bg-soft"
          >
            {expanded ? "Show fewer" : `Show all ${allProjects.length} projects`}
          </button>
        </div>
      )}
    </section>
  );
}

/* ---------- Tools + certificates ---------- */
function Tools() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead eyebrow="Tools" title="What's on my" accent="keyboard." />
      <div className="mt-10 grid gap-8 md:grid-cols-[10rem_1fr] md:items-start">
        <p className="font-display text-lg font-bold">I build with</p>
        <ul className="flex flex-wrap gap-2.5">
          {toolsBuild.map((t) => (
            <li key={t} className="keycap">
              {t}
            </li>
          ))}
        </ul>
        <p className="font-display text-lg font-bold">I am learning</p>
        <ul className="flex flex-wrap gap-2.5">
          {toolsLearn.map((t) => (
            <li key={t} className="keycap keycap-ghost">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex items-end justify-between gap-4">
        <div>
          <Label>Certificates</Label>
          <p className="mt-2 font-display text-2xl font-bold">
            {certificates.length} certificates and courses
          </p>
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline" aria-hidden>
          scroll →
        </span>
      </div>
      <ul
        className="edge-fade scrollbar-none -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pt-4 pb-8"
        aria-label="Certificates"
      >
        {certificates.map((c, i) => {
          const m = /^(.*) \((.*)\)$/.exec(c);
          const name = m?.[1] ?? c;
          const issuer = m?.[2] ?? "DataCamp";
          return (
            <li
              key={c}
              data-tilt
              className="paper tiltable relative w-64 shrink-0 snap-start rounded-2xl border border-border p-5 shadow-soft"
              style={{ ["--tilt" as string]: `${tilt(c, i) / 2}deg` }}
            >
              <span
                className="pop-3 absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-background shadow-soft"
                aria-hidden
              >
                <Award className="h-5 w-5" />
              </span>
              <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {issuer}
              </p>
              <p className="pop-2 mt-8 pr-2 font-display text-lg leading-snug font-bold">{name}</p>
              <div
                className="mt-6 border-t border-dashed border-gold pt-2 font-hand text-lg text-muted-foreground"
                aria-hidden
              >
                Kaneeza Batool
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Payoff: one year later ---------- */
function Payoff({ gh }: { gh: GitHubData }) {
  const { days, total, repos, snapshot } = gh;
  return (
    <section className="grain-ink stage text-cream">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Label className="text-cream/70">The payoff</Label>
        <p className="mt-6 font-mono text-sm text-cream/70 line-through decoration-primary decoration-2">
          {TYPED}
        </p>
        <h2 className="extrude-dark scroll-3d mt-2 font-display text-5xl leading-[1.02] font-bold md:text-7xl">
          One year <span className="font-hand text-6xl text-primary md:text-8xl">later.</span>
        </h2>
        <div className="scroll-3d mt-10 rounded-3xl bg-cream p-5 text-ink shadow-[0_40px_80px_-30px_oklch(0_0_0/0.85),0_0_0_1px_oklch(1_0_0/0.06)] md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <Github className="h-5 w-5" aria-hidden />
              <span className="font-mono text-sm">github.com/{GH}</span>
            </span>
            <span className="font-hand text-2xl leading-none text-primary">
              same graph. it grew a skyline.
            </span>
          </div>
          <Skyline
            days={days}
            label={`3D skyline of my GitHub year: one block per day, ${total ?? 0} contributions in total.`}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
            <span aria-live="polite">
              <span className="font-medium text-primary-hover">{repos} repositories</span>
              {" · "}
              {days ? `${total ?? 0} contributions` : "Loading GitHub…"}
              {snapshot && <span> (saved {snapshot})</span>}
            </span>
            <span aria-hidden>← drag to rotate →</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/15 bg-cream/15 sm:grid-cols-3 lg:grid-cols-6">
          {payoffStats.map(({ id, to, prefix, suffix, label, Icon }) => (
            <div key={label} data-tilt className="flex flex-col gap-2 bg-ink p-5">
              <Icon className="pop-2 h-5 w-5 text-g2" aria-hidden />
              <p className="pop-3 font-display text-3xl font-bold">
                <CountUp
                  to={id === "repos" ? gh.repos : to}
                  prefix={prefix ?? ""}
                  suffix={suffix ?? ""}
                />
              </p>
              <p className="pop-1 text-xs leading-snug text-cream/70">{label}</p>
            </div>
          ))}
        </div>
        <NowPanel />
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [clicks, setClicks] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const onAvatar = () => {
    const n = clicks + 1;
    if (n >= 3) {
      setClicks(0);
      toast("you found chilli milli 😭");
      setWiggle(true);
      window.setTimeout(() => setWiggle(false), 5000);
    } else setClicks(n);
  };
  const links = [
    { label: "LinkedIn", href: LINKS.linkedin, Icon: Linkedin },
    { label: "GitHub", href: LINKS.github, Icon: Github },
    { label: "LeetCode", href: LINKS.leetcode, Icon: Code2 },
  ];
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
        <button
          type="button"
          onClick={onAvatar}
          aria-label="Kaneeza's avatar"
          className="coin mx-auto block rounded-full perspective-[600px]"
        >
          <img
            src={avatar}
            alt=""
            width={112}
            height={112}
            loading="lazy"
            className={`h-28 w-28 rounded-full bg-ink object-cover shadow-lift ring-4 ring-primary ring-offset-4 ring-offset-background ${wiggle ? "wiggle" : ""}`}
          />
        </button>
        <p className="mt-8 font-hand text-3xl text-primary">Kaneeza Batool</p>
        <h2 className="extrude scroll-3d mt-2 font-display text-5xl leading-[1.02] font-bold md:text-7xl">
          Let's build what's next,{" "}
          <span className="font-hand text-6xl text-primary md:text-8xl">together.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">i don't know. let's figure it out.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="btn-3d inline-flex max-w-full items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium break-all text-primary-foreground hover:bg-primary-hover sm:text-base"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden /> {EMAIL}
          </a>
          <a
            href={CV_URL}
            download
            className="btn-3d btn-3d-light inline-flex items-center gap-2 rounded-full border-2 border-primary-hover bg-background px-6 py-3 text-sm font-medium text-primary-hover hover:bg-soft sm:text-base"
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden /> Download CV
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="btn-3d btn-3d-light inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 font-mono text-sm hover:border-primary hover:text-primary-hover"
            >
              <Icon className="h-4 w-4" aria-hidden /> {label}
            </a>
          ))}
        </div>
      </div>
      {/* Two crossed ribbons running in opposite directions. */}
      <div className="ribbons" aria-hidden>
        <div className="ribbon-back overflow-hidden bg-ink py-3 text-cream/80">
          <div className="marquee marquee-reverse">
            {[0, 1].map((r) => (
              <div key={r} className="flex shrink-0">
                {marquee.concat(marquee).map((w, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-6 px-3 font-mono text-sm tracking-widest whitespace-nowrap uppercase"
                  >
                    {w} <span className="text-g2">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="ribbon overflow-hidden border-y border-primary-hover bg-primary py-4 text-primary-foreground">
          <div className="marquee">
            {[0, 1].map((r) => (
              <div key={r} className="flex shrink-0">
                {marquee.concat(marquee).map((w, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-6 px-3 font-display text-2xl font-bold whitespace-nowrap"
                  >
                    {w} <span className="font-hand text-3xl text-primary-foreground/60">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
