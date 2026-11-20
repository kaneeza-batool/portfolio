import type { CSSProperties } from "react";
import type { Org } from "@/content";

/**
 * Passport ink stamps for the Journey section: a full stamp for the visa page and a
 * mini one for the organisation buttons. Both use the faded-ink texture (.stamp-ink).
 */

/** Ink colours the stamps rotate through, all from the site palette. */
const INKS = ["var(--primary-hover)", "var(--ink)", "var(--primary)", "var(--gold)"];

/** Deterministic tilt from the name, so a stamp keeps the same angle on every visit. */
function tiltFor(name: string) {
  let h = 7;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return (h % 37) - 18; // -18…18 deg
}

/** "Nov 2026 – now" → "NOV 2026"; "2026" → "2026". */
function stampDate(when: string) {
  const m = /([A-Z][a-z]{2} )?\d{4}/.exec(when);
  return (m?.[0] ?? when).toUpperCase();
}

/** The full round stamp: name and date around the ring, icon and short code in a band. */
export function InkStamp({ org, i, className = "" }: { org: Org; i: number; className?: string }) {
  const ring = `${org.name.toUpperCase()} · ${stampDate(org.when)} · `;
  // Fit the ring text to the circle: mono glyphs are ~0.6em wide, circumference ≈ 364.
  const fontSize = Math.max(6.5, Math.min(12, 364 / (0.6 * ring.length)));
  const arcId = `ink-stamp-arc-${i}`;
  const { Icon } = org;
  return (
    <div
      className={`stamp-thump ${className}`}
      style={{ color: INKS[i % INKS.length], ["--rot" as string]: `${tiltFor(org.name)}deg` }}
    >
      <svg viewBox="0 0 160 160" className="stamp-ink block h-auto w-full" aria-hidden>
        <defs>
          <path id={arcId} d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="80" cy="80" r="68" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle
          cx="80"
          cy="80"
          r="44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="3 3"
        />
        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize={fontSize}
          fontWeight="500"
          fill="currentColor"
        >
          <textPath href={`#${arcId}`} textLength="362" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
        {/* A straight band across the middle, like a real entry stamp. */}
        <line x1="38" y1="74" x2="122" y2="74" stroke="currentColor" strokeWidth="1.6" />
        <line x1="42" y1="101" x2="118" y2="101" stroke="currentColor" strokeWidth="1.6" />
        <Icon x={68} y={45} width={24} height={24} strokeWidth={2} />
        <text
          x="80"
          y="94"
          textAnchor="middle"
          fontFamily="Fraunces Variable, Fraunces, serif"
          fontWeight="700"
          fontSize={org.short.length > 4 ? 15 : 19}
          fill="currentColor"
        >
          {org.short}
        </text>
      </svg>
    </div>
  );
}

/** Small stamp for an organisation button: tilted at rest, straight when selected. */
export function MiniStamp({ org, i, active }: { org: Org; i: number; active: boolean }) {
  const style: CSSProperties = {
    color: INKS[i % INKS.length],
    rotate: active ? "0deg" : `${tiltFor(org.name) * 0.8}deg`,
  };
  return (
    <span
      aria-hidden
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream transition-[rotate,box-shadow] duration-300 ${
        active ? "shadow-[0_0_0_3px_oklch(0.56_0.12_0/0.55)]" : ""
      }`}
      style={style}
    >
      <svg viewBox="0 0 44 44" className="stamp-ink h-full w-full">
        <circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="22" cy="22" r="15.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <text
          x="22"
          y="25.5"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="700"
          fontSize={org.short.length > 3 ? 7.5 : 10}
          fill="currentColor"
        >
          {org.short}
        </text>
      </svg>
    </span>
  );
}
