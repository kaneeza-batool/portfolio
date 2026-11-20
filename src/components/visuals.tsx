import type { ReactNode } from "react";
import {
  AlertTriangle,
  Armchair,
  ArrowDown,
  Bot,
  Check,
  Code2,
  FileText,
  Flower2,
  Gavel,
  Github,
  GitPullRequest,
  Hammer,
  Lamp,
  Lightbulb,
  QrCode,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Trophy,
  Users,
  Volume2,
} from "lucide-react";
import worldDots from "@/assets/world-dots.svg";

/* ---------- Frames ---------- */
export function BrowserFrame({
  url,
  children,
  dark = false,
  className = "",
}: {
  url: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  // Mockups are decorative: the same facts are in the card text, so screen readers skip them.
  return (
    <div
      aria-hidden
      className={`overflow-hidden rounded-xl border shadow-lift ${dark ? "border-cream/15 bg-ink" : "border-border bg-background"} ${className}`}
    >
      <div
        className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? "border-cream/10" : "border-border bg-card"}`}
      >
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="h-2 w-2 rounded-full bg-gold" />
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-cream/30" : "bg-g2"}`} />
        <span
          className={`ml-2 truncate rounded-full px-2.5 py-0.5 font-mono text-[9px] ${dark ? "bg-cream/10 text-cream/60" : "bg-background text-muted-foreground"}`}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`rounded-[1.6rem] border-[5px] border-ink bg-ink shadow-lift ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.2rem] bg-background">
        <div className="absolute top-1.5 left-1/2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

const Bar = ({ w, className = "bg-g1" }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full ${className}`} style={{ width: w }} />
);

/* ---------- Project screens ---------- */
export function AuraScreen() {
  const agents = ["A1", "A2", "A3", "A4", "A5"];
  return (
    <BrowserFrame url="auracheck-taupe.vercel.app/interview" dark>
      <div>
        <div className="grid gap-3 p-4 text-cream sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-cream/10 bg-cream/5 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-cream/60">live panel · 5 agents</span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-cream/80">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" /> REC
              </span>
            </div>
            <div className="mt-3 flex justify-between gap-1.5">
              {agents.map((a, i) => (
                <div key={a} className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${i === 1 ? "speaking bg-primary text-primary-foreground" : "bg-cream/10 text-cream/70"}`}
                  >
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[8px] text-cream/50">{a}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-10 items-center justify-center gap-[4px]">
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  key={i}
                  className="wave w-[3px] rounded-full bg-primary"
                  style={{
                    animationDelay: `${(i * 83) % 900}ms`,
                    height: `${20 + ((i * 37) % 70)}%`,
                  }}
                />
              ))}
            </div>
            <p className="mt-2 rounded-md bg-cream/10 px-2 py-1.5 font-mono text-[9px] text-cream/80">
              <Volume2 className="mr-1 inline h-3 w-3 text-primary" />
              follow-up: "walk me through that repo on your GitHub…"
            </p>
          </div>
          <div className="rounded-lg bg-cream p-3 text-ink">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[9px] font-medium">scorecard.pdf</span>
            </div>
            <p className="mt-1 font-mono text-[8px] text-muted-foreground">
              written by the judge agent
            </p>
            <div className="mt-3 space-y-2">
              {/* Illustrative bars only: no real scores are implied. */}
              {[
                ["answers", "80%"],
                ["follow-ups", "65%"],
                ["resume check", "90%"],
                ["github check", "72%"],
              ].map(([k, w]) => (
                <div key={k}>
                  <div className="font-mono text-[8px]">{k}</div>
                  <div className="mt-0.5 h-1.5 rounded-full bg-g0">
                    <div className="h-full rounded-full bg-primary" style={{ width: w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function TitanScreen() {
  const portals = ["Public site", "Student", "Trainer", "Super admin", "Campus admin"];
  return (
    <BrowserFrame url="titan · institute portal">
      <div className="grid grid-cols-[5.5rem_1fr] text-foreground">
        <aside className="space-y-1 border-r border-border bg-card p-2">
          <p className="mb-2 font-display text-xs font-bold text-primary-hover">TITAN</p>
          {portals.map((p, i) => (
            <p
              key={p}
              className={`truncate rounded px-1.5 py-1 font-mono text-[8px] ${i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              {p}
            </p>
          ))}
        </aside>
        <div className="grid grid-cols-2 gap-2 p-3">
          <div className="col-span-2 flex items-end gap-1 rounded-lg border border-border bg-card p-2">
            <span className="mr-1 self-start font-mono text-[8px] text-muted-foreground">
              attendance
            </span>
            {[60, 85, 70, 95, 40, 88, 92, 75, 98, 66].map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm bg-g3"
                style={{ height: `${h * 0.4}px` }}
              />
            ))}
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="font-mono text-[8px] text-muted-foreground">ID card</p>
            <div className="mt-1 flex items-center gap-1.5">
              <QrCode className="h-8 w-8 text-ink" />
              <div className="flex-1 space-y-1">
                <Bar w="90%" className="bg-g2" />
                <Bar w="60%" />
              </div>
            </div>
          </div>
          <div className="space-y-1.5 rounded-lg border border-border bg-card p-2">
            <p className="font-mono text-[8px] text-muted-foreground">alerts</p>
            <p className="rounded bg-soft px-1.5 py-0.5 font-mono text-[8px] text-primary-hover">
              absence alert sent
            </p>
            <p className="rounded bg-soft px-1.5 py-0.5 font-mono text-[8px] text-primary-hover">
              fee reminder sent
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function PakLawScreen() {
  return (
    <BrowserFrame url="paklaw-ai · ask a legal question">
      <div className="space-y-2.5 p-4">
        <div className="ml-auto w-3/4 rounded-2xl rounded-br-sm bg-primary px-3 py-2">
          <Bar w="100%" className="bg-primary-foreground/70" />
          <div className="mt-1.5">
            <Bar w="55%" className="bg-primary-foreground/70" />
          </div>
        </div>
        <div className="w-5/6 rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[9px] font-medium">PakLawAI</span>
          </div>
          <div className="mt-2 space-y-1.5">
            <Bar w="100%" />
            <Bar w="92%" />
            <Bar w="70%" />
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {["Act", "Section", "source text"].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full border border-gold px-2 py-0.5 font-mono text-[8px] text-foreground"
              >
                <Gavel className="h-2.5 w-2.5" /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ElderScreen() {
  return (
    <PhoneFrame className="mx-auto w-40">
      <div className="space-y-2 px-2.5 pt-6 pb-3">
        <p className="font-display text-[11px] font-bold">ElderBridge</p>
        <div className="rounded-xl border border-primary/40 bg-soft p-2">
          <p className="flex items-center gap-1 font-mono text-[9px] font-medium text-primary-hover">
            <AlertTriangle className="h-3 w-3" /> Possible scam
          </p>
          <div className="mt-1.5 space-y-1">
            <Bar w="100%" className="bg-g2" />
            <Bar w="70%" className="bg-g2" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-2">
          <p className="flex items-center gap-1 font-mono text-[9px]">
            <ShieldCheck className="h-3 w-3 text-primary" /> Form, explained
          </p>
          <div className="mt-1.5 space-y-1">
            <Bar w="100%" />
            <Bar w="85%" />
            <Bar w="50%" />
          </div>
        </div>
        <div className="rounded-full bg-primary py-1.5 text-center font-mono text-[9px] text-primary-foreground">
          read my screen
        </div>
      </div>
    </PhoneFrame>
  );
}

export function JssScreen() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(["before", "after"] as const).map((k) => (
        <BrowserFrame key={k} url={`jobskillshare · ${k}`}>
          {k === "before" ? (
            <div className="space-y-1.5 p-2.5 grayscale">
              <div className="h-8 bg-g0" />
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-4 bg-g0" />
                ))}
              </div>
              <Bar w="90%" className="bg-g0" />
              <Bar w="80%" className="bg-g0" />
              <Bar w="95%" className="bg-g0" />
            </div>
          ) : (
            <div className="space-y-2 p-2.5">
              <div className="rounded-md bg-soft p-2">
                <Bar w="60%" className="bg-primary" />
                <div className="mt-1.5">
                  <Bar w="40%" className="bg-g2" />
                </div>
                <span className="mt-2 inline-block h-2.5 w-10 rounded-full bg-primary" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-6 rounded bg-card" />
                ))}
              </div>
            </div>
          )}
        </BrowserFrame>
      ))}
    </div>
  );
}

export function DexoScreen() {
  return (
    <BrowserFrame url="dexopk.netlify.app/shop">
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-xs font-bold tracking-wide">DEXO.PK</span>
          <span className="flex gap-2 font-mono text-[7px] text-muted-foreground">
            <span>Home</span>
            <span className="text-primary-hover underline underline-offset-2">Shop</span>
            <span>About</span>
            <span>Contact</span>
          </span>
          <ShoppingBag className="h-3 w-3 text-primary" />
        </div>
        <div className="relative flex h-12 items-center overflow-hidden rounded-md bg-ink px-2.5">
          <div className="space-y-1">
            <p className="font-display text-[9px] font-bold text-cream">Luxury home decor</p>
            <span className="inline-block rounded-full bg-gold px-1.5 py-0.5 font-mono text-[6px] text-ink">
              shop now
            </span>
          </div>
          <Lamp className="absolute right-3 h-8 w-8 text-gold" strokeWidth={1.3} />
          <Sofa className="absolute right-12 bottom-1 h-6 w-6 text-cream/70" strokeWidth={1.3} />
        </div>
        <div className="flex gap-1">
          {["Living", "Lighting", "Decor"].map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-1.5 py-0.5 font-mono text-[7px] ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card"}`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[Sofa, Lamp, Flower2, Armchair].map((I, i) => (
            <div key={i} className="rounded bg-card p-1">
              <div className="flex aspect-square items-center justify-center rounded-sm bg-background">
                <I className="h-4 w-4 text-gold" strokeWidth={1.4} />
              </div>
              <div className="mt-1 space-y-0.5">
                <Bar w="80%" className="bg-g2" />
                <Bar w="45%" className="bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function FirstPortfolioScreen() {
  return (
    <BrowserFrame url="file:///C:/Users/kaneeza/index.html">
      <div
        className="bg-white p-4 text-left"
        style={{ fontFamily: "'Times New Roman', serif", color: "#000" }}
      >
        <p className="text-xl font-bold">Kaneeza Batool</p>
        <hr className="my-1.5 border-black" />
        <p className="text-sm">Welcome to my portfolio.</p>
        <ul className="mt-1 list-disc pl-5 text-sm" style={{ color: "#0000ee" }}>
          <li className="underline">About me</li>
          <li className="underline">My projects</li>
          <li className="underline">Contact</li>
        </ul>
      </div>
    </BrowserFrame>
  );
}

/* ---------- Small illustrations ---------- */
export function AgentGraph() {
  const xs = [14, 32, 50, 68, 86];
  return (
    <svg viewBox="0 0 100 64" className="h-full w-full" aria-hidden>
      {xs.map((x) => (
        <path
          key={x}
          d={`M${x} 14 C ${x} 34, 50 30, 50 50`}
          fill="none"
          stroke="var(--g2)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          className="dash-flow"
        />
      ))}
      {xs.map((x, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={12}
            r={5.5}
            fill={i === 2 ? "var(--primary)" : "var(--background)"}
            stroke="var(--primary)"
          />
          <text
            x={x}
            y={14}
            textAnchor="middle"
            fontSize="5"
            fontFamily="JetBrains Mono"
            fill={i === 2 ? "var(--primary-foreground)" : "var(--primary)"}
          >
            {i + 1}
          </text>
        </g>
      ))}
      <rect x={38} y={46} width={24} height={12} rx={3} fill="var(--ink)" />
      <text
        x={50}
        y={54}
        textAnchor="middle"
        fontSize="5"
        fontFamily="JetBrains Mono"
        fill="var(--cream)"
      >
        judge
      </text>
    </svg>
  );
}

/* ---------- Dotted world map (generated once from dotted-map, 71x34) ---------- */
const MAP_W = 71;
const MAP_H = 34;
const MAP = [
  "80067c3f00405fffc0",
  "0ff7d63e00e09ffffa",
  "9ffff27801f3dffffe",
  "5fffe631836ffffffe",
  "2fffc23003fffffffe",
  "1fff842006ffffffec",
  "007fc700067fffff00",
  "003fe70012fffffe10",
  "003fff8037ffffff00",
  "001fff800fffffff80",
  "001fff000fedfffe00",
  "001ffc003acbfffc80",
  "001ff80030fdffe000",
  "000ff8001c3ffff300",
  "0003f0003ffffff000",
  "000380007ffdfff000",
  "000188007fef3fc000",
  "0000c0007ffe118000",
  "000000007ff810c000",
  "000007003ffc000000",
  "00000fc003f801a000",
  "00000ff003f000a300",
  "00000ff801f0002190",
  "000007f001f0000200",
  "000003f003e4000f80",
  "000003f001e4001fc0",
  "000003c001e0001fc0",
  "000003c000c0001fc0",
  "0000038000000001c2",
  "000007000000000002",
  "000002000000000000",
  "000006000000000000",
  "000004000000000000",
  "000004000000000000",
];
const SUKKUR = { x: 49, y: 15 };
const DOTS: { x: number; y: number }[] = [];
MAP.forEach((row, y) =>
  [...row].forEach((h, c) => {
    const bits = parseInt(h, 16);
    for (let b = 0; b < 4; b++) if (bits & (8 >> b)) DOTS.push({ x: c * 4 + b, y });
  }),
);

// A handful of dots that twinkle on top of the static map.
const GLOW = DOTS.filter((d) => (d.x * 7 + d.y * 13) % 41 === 0);

/**
 * The ~850 land dots are one pre-rendered SVG file (src/assets/world-dots.svg, generated
 * from MAP above), so the page holds a single <img> instead of hundreds of <circle> nodes.
 * Only the twinkling dots and the Sukkur pin are live SVG.
 */
export function WorldMap({ className = "" }: { className?: string }) {
  const S = 10;
  const px = (v: number) => v * S + S / 2;
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="World map with Sukkur, Pakistan highlighted"
    >
      <img src={worldDots} alt="" className="block w-full" width={MAP_W * S} height={MAP_H * S} />
      <svg
        viewBox={`0 0 ${MAP_W * S} ${MAP_H * S}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {GLOW.map((d, i) => (
          <circle
            key={i}
            cx={px(d.x)}
            cy={px(d.y)}
            r={2.6}
            fill="var(--primary)"
            className="twinkle"
            style={{ animationDelay: `${(i * 437) % 3000}ms` }}
          />
        ))}
        <circle
          cx={px(SUKKUR.x)}
          cy={px(SUKKUR.y)}
          r={14}
          fill="var(--primary)"
          opacity={0.18}
          className="ping"
        />
        <circle
          cx={px(SUKKUR.x)}
          cy={px(SUKKUR.y)}
          r={5}
          fill="var(--primary)"
          stroke="var(--background)"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

/* ---------- Journey and story visuals ---------- */

/** WoCS: the merged pull request, as a GitHub-style card. */
export function PrScreen() {
  const os = ["Windows", "Linux", "macOS"];
  return (
    <div aria-hidden className="overflow-hidden rounded-xl bg-cream text-ink shadow-lift">
      <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <GitPullRequest className="h-3.5 w-3.5 text-primary" />
        <span className="truncate font-mono text-[10px]">smart-connectivity-analyser</span>
        <span className="ml-auto rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] text-primary-foreground">
          Merged
        </span>
      </div>
      <div className="space-y-3 p-3">
        <p className="text-xs font-semibold leading-snug">
          fix: make network quality ping work on Linux and macOS{" "}
          <span className="text-muted-foreground">#53</span>
        </p>
        <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
          <div className="rounded-lg border border-border bg-background p-2">
            <p className="text-muted-foreground">before · Linux / macOS</p>
            <p className="mt-1 text-sm font-bold text-primary-hover">100% loss</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-2">
            <p className="text-muted-foreground">after</p>
            <p className="mt-1 text-sm font-bold">works on all 3</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {os.map((o) => (
            <span
              key={o}
              className="inline-flex items-center gap-1 rounded-full bg-soft px-2 py-0.5 font-mono text-[9px]"
            >
              <Check className="h-3 w-3 text-primary" /> {o}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] text-cream">
            +12 tests
          </span>
        </div>
      </div>
    </div>
  );
}

/** nexFellow: idea to launch, in progress. */
export function NexFellowTrack() {
  const steps = [
    { k: "idea", Icon: Lightbulb, done: true },
    { k: "build", Icon: Hammer, done: true },
    { k: "launch", Icon: Rocket, done: false },
  ];
  return (
    <div aria-hidden className="rounded-xl bg-cream p-4 text-ink shadow-lift">
      <p className="font-mono text-[10px] text-muted-foreground">8-week build · mentor guided</p>
      <div className="mt-4 flex items-center">
        {steps.map(({ k, Icon, done }, i) => (
          <div key={k} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${done ? "border-primary bg-primary text-primary-foreground" : "border-dashed border-primary bg-background text-primary"}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px]">{k}</span>
            </div>
            {i < steps.length - 1 && (
              <span className={`mx-2 mb-5 h-0.5 flex-1 ${i === 0 ? "bg-primary" : "dash-line"}`} />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-soft px-2.5 py-1.5 text-center font-hand text-lg leading-none text-primary-hover">
        in progress
      </p>
    </div>
  );
}

/** GWY Fellowship → DoraHacks 2.0 → auraCheck. */
export function FellowshipPath({ dark = false }: { dark?: boolean }) {
  const steps = [
    { k: "GWY Fellowship 2.0", s: "women in AI · Aug 2026", Icon: Users },
    { k: "DoraHacks 2.0", s: "500 teams selected", Icon: Code2 },
    { k: "auraCheck", s: "Top 50 · #32 Product Hunt", Icon: Trophy },
  ];
  return (
    <ol aria-hidden className="relative space-y-3">
      {steps.map(({ k, s, Icon }, i) => (
        <li
          key={k}
          className={`relative flex items-center gap-3 rounded-2xl p-3 ${dark ? "bg-cream/10" : "bg-background"} ${i === 2 ? "ring-2 ring-primary" : ""}`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${i === 2 ? "bg-primary text-primary-foreground" : dark ? "bg-cream text-ink" : "bg-soft text-primary-hover"}`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-base leading-tight font-bold">{k}</span>
            <span
              className={`block font-mono text-[11px] ${dark ? "text-cream/60" : "text-muted-foreground"}`}
            >
              {s}
            </span>
          </span>
          {i < 2 && (
            <ArrowDown
              className={`absolute -bottom-3.5 left-7 z-10 h-4 w-4 rounded-full ${dark ? "bg-ink text-primary" : "bg-card text-primary"}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/** "I show up daily": a week of check marks and the two repos that get the commits. */
export function DailyVisual() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const repos = [
    { name: "dsa-in-java", lang: "Java", dot: "bg-gold" },
    { name: "ai-ml-learning-journey", lang: "Python", dot: "bg-primary" },
  ];
  return (
    <div aria-hidden className="w-full space-y-3">
      <div className="flex justify-between gap-1">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {repos.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2 rounded-lg bg-background px-2.5 py-1.5"
          >
            <Github className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 flex-1 truncate font-mono text-[11px]">{r.name}</span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
              <span className={`h-2 w-2 rounded-full ${r.dot}`} />
              {r.lang}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
