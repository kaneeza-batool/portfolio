import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  Code2,
  Coffee,
  Github,
  Globe,
  GraduationCap,
  Headphones,
  Linkedin,
  Mail,
  MapPin,
  Package,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import avatar from "@/assets/kaneeza-avatar.png";
import {
  AgentGraph,
  AuraScreen,
  BrowserFrame,
  DexoScreen,
  ElderScreen,
  FirstPortfolioScreen,
  JssScreen,
  PakLawScreen,
  TitanScreen,
  WorldMap,
} from "@/components/visuals";

const TITLE = "Kaneeza Batool | MERN developer moving into AI";
const DESC =
  "Kaneeza Batool is a CS student at Sukkur IBA building full-stack web apps and applied AI. The story, the projects and how to reach her.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GH = "kaneeza-batool";
const EMAIL = "kaneezabatoolmemon@gmail.com";
const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kaneeza-batool", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/kaneeza-batool", Icon: Github },
  { label: "LeetCode", href: "https://leetcode.com/u/kaneezabatool", Icon: Code2 },
];

/* ---------- Data ---------- */
type Kind = "ai" | "web";
type Project = {
  title: string;
  kind: Kind;
  what?: string;
  role?: string;
  team?: string;
  result?: string;
  context?: string;
  tags: string[];
  live?: string | undefined;
  github?: string | undefined;
};

const titan: Project = {
  title: "TITAN",
  kind: "web",
  what: "Multi-portal institute management system. Public site plus student, trainer, super admin and campus admin portals. Role-based access per module, QR attendance with generated ID cards, a job portal with applicant matching, and automated absence and payment alerts.",
  team: "Team of 6",
  result: "1st place, Batch 1, Project Excellence Award (Saylani Mass IT Training, Aug 2026).",
  tags: ["React", "Node.js", "RBAC", "Vercel"],
  github: "https://github.com/kaneeza-batool/saylani-portal-fyp",
};
const jss: Project = {
  title: "JobSkillShare redesign",
  kind: "web",
  what: "Internship work on a live site at EdTech4D (two months).",
  role: "Audited the site, wrote UX reports on usability and accessibility gaps, rebuilt the homepage and Programs page as responsive prototypes, and led the team for one delivery cycle.",
  result: "Top 5 portfolio in the cohort.",
  tags: ["HTML", "CSS", "JavaScript", "UX audit"],
  github: "https://github.com/kaneeza-batool/JSS-Internship",
};
const aura: Project = {
  title: "auraCheck",
  kind: "ai",
  what: "Voice mock-interview platform. Five AI agents run a live interview, ask follow-ups, and check answers against the candidate's resume and GitHub. A judge agent writes a scorecard you can download as a PDF. Three services: React frontend on Vercel, Node/Express API with auth and SQLite, Python agent service on Railway's private network.",
  role: "I worked on the Python FastAPI + CrewAI engine that runs the five-agent interview panel.",
  team: "Team of 4, Gradient Gang",
  context:
    "Built at DoraHacks 2.0 (500 teams selected from 6,000+ applications, 35+ countries) through the GWY Fellowship 2.0.",
  result: "Top 50 in the hackathon, #32 on Product Hunt on launch day, $800 in rewards.",
  tags: ["React", "TypeScript", "Node.js", "WebSockets", "Python", "FastAPI", "CrewAI"],
  live: "https://auracheck-taupe.vercel.app",
  github: "https://github.com/kaneeza-batool/auraCheck",
};
const paklaw: Project = {
  title: "PakLawAI",
  kind: "ai",
  what: "Legal Q&A assistant for Pakistani law. Ask a legal question, get an answer that cites the relevant Act and Section, built on retrieval over Pakistani legal texts.",
  role: "I built the frontend and the legal text pipeline (sourcing, extracting and cleaning the law texts for retrieval).",
  team: "Team of 5",
  result: "AuratTech AI Engineering Fellowship (Jul to Sep 2026), 1st in cluster.",
  tags: ["React", "RAG", "Data pipeline"],
};
const elder: Project = {
  title: "ElderBridge",
  kind: "ai",
  what: "AI companion for elderly Pakistanis. Reads screens, flags scams, explains government forms in plain language.",
  role: "I built the frontend.",
  team: "Team of 2",
  result: "USAII Global AI Hackathon 2026, Round 2 of 324 teams.",
  tags: ["Frontend", "UI/UX"],
  github: "https://github.com/Yusra-Shah/ElderBridge-Guardianos",
};
const dexo: Project = {
  title: "Dexo.pk",
  kind: "web",
  what: "Multi-page e-commerce frontend for a luxury home decor brand. Home, Shop, About and Contact pages, with product listings grouped into category sections.",
  role: "Built the frontend with a focus on clean layout, responsive design and a smooth experience on mobile, tablet and desktop.",
  tags: ["HTML", "CSS", "JavaScript", "Responsive"],
  live: "https://dexopk.netlify.app",
  github: "https://github.com/kaneeza-batool/dexo.pk",
};
const allProjects = [aura, titan, paklaw, elder, jss, dexo];

const SCREENS: Record<string, () => ReactNode> = {
  auraCheck: () => <AuraScreen />,
  TITAN: () => <TitanScreen />,
  PakLawAI: () => <PakLawScreen />,
  ElderBridge: () => <ElderScreen />,
  "JobSkillShare redesign": () => <JssScreen />,
  "Dexo.pk": () => <DexoScreen />,
};
const Screen = ({ p }: { p: Project }) => <>{SCREENS[p.title]?.()}</>;

type Chapter = {
  label: string;
  date: string;
  title: string;
  lines?: string[];
  featured?: Project;
  projects?: Project[];
  note?: string;
  badges?: string[];
  fellowship?: boolean;
  bubble: string;
  stat?: string;
  statText?: string;
  commit: string;
  stickies?: string[];
  doodle?: "star" | "arrow" | "heart" | "squiggle";
};
const chapters: Chapter[] = [
  {
    label: "Chapter 1",
    date: "Nov 2025",
    title: "It started as homework.",
    bubble: "this was supposed to take one evening.",
    commit: "opened github because teacher said so",
    doodle: "star",
    lines: [
      "I opened GitHub for a class assignment.",
      "My first portfolio was plain HTML.",
      "I didn't close the tab.",
    ],
  },
  {
    label: "Chapter 2",
    date: "Jun – Aug 2026",
    title: "Then I learned to ship.",
    bubble: "first time shipping to real users.",
    commit: "feat: learning in public",
    doodle: "arrow",
    projects: [titan, jss],
    note: "AI Engineering mentee at Dev Weekends (Jun to Aug 2026).",
  },
  {
    label: "Chapter 3",
    date: "Jul – Sep 2026",
    title: "Then I made AI do real work.",
    bubble: "this is where it got fun.",
    commit: "fix: motivation. add: systems",
    doodle: "squiggle",
    stickies: [
      "my relationship with DSA: enemies to lovers. currently still in the enemies arc.",
      "consistency: still working on it. chai: never missed a day.",
    ],
    featured: aura,
    projects: [paklaw, elder],
    note: "GWY Fellowship 2.0: Top 100 most active fellows. Posted daily build recaps on Instagram as @kaneeza.builds.",
    badges: [
      "DataCamp AI Engineer for Developers Associate",
      "HEC Generative AI Cohort 3 Top Performer",
      "Stanford Code in Place 2026 (completed)",
    ],
  },
  {
    label: "Chapter 4",
    date: "Sep 2026",
    title: "I stopped building alone.",
    bubble: "turns out i like bringing people along.",
    commit: "feat: bring people along",
    doodle: "heart",
    stat: "The first AWS Student Builder Group at Sukkur IBA.",
    statText:
      "The campus had never had one. I was selected as its first leader in Sep 2026 and I'm registering it with the university from zero.",
    fellowship: true,
  },
];

type Org = {
  name: string;
  short: string;
  role: string;
  when: string;
  what: string;
  result: string;
  stats: [string, string][];
  visual: () => ReactNode;
};
const orgs: Org[] = [
  {
    name: "AWS Student Builder Group, Sukkur IBA",
    short: "AWS",
    role: "Founding leader",
    when: "Sep 2026 – now",
    what: "The campus had never had one. I was selected as its first leader and I'm registering it with the university from zero.",
    result: "The first AWS Student Builder Group at Sukkur IBA.",
    stats: [
      ["1st", "on campus"],
      ["0 → 1", "built from zero"],
    ],
    visual: () => <Stamp />,
  },
  {
    name: "DoraHacks 2.0",
    short: "DH",
    role: "Team Gradient Gang, agent engine",
    when: "via GWY Fellowship 2.0",
    what: aura.what ?? "",
    result: aura.result ?? "",
    stats: [
      ["Top 50", "of 500 teams"],
      ["#32", "Product Hunt"],
      ["$800", "in rewards"],
    ],
    visual: () => <AuraScreen />,
  },
  {
    name: "GWY Fellowship 2.0 (DoraDAO)",
    short: "GWY",
    role: "Fellow",
    when: "Global, remote",
    what: "A global fellowship for women in AI across 30+ countries. Posted daily build recaps on Instagram as @kaneeza.builds.",
    result: "Top 100 most active fellows.",
    stats: [
      ["30+", "countries"],
      ["Top 100", "most active"],
    ],
    visual: () => (
      <div className="rounded-xl border border-cream/10 bg-cream p-4">
        <WorldMap className="w-full" />
      </div>
    ),
  },
  {
    name: "AuratTech AI Engineering Fellowship",
    short: "AT",
    role: "Frontend + legal text pipeline",
    when: "Jul – Sep 2026",
    what: paklaw.what ?? "",
    result: "1st in cluster with PakLawAI.",
    stats: [
      ["1st", "in cluster"],
      ["5", "teammates"],
    ],
    visual: () => <PakLawScreen />,
  },
  {
    name: "Saylani Mass IT Training",
    short: "SMIT",
    role: "Team of 6, TITAN",
    when: "Aug 2026",
    what: titan.what ?? "",
    result: "1st place, Batch 1, Project Excellence Award.",
    stats: [
      ["1st", "in Batch 1"],
      ["5", "portals"],
      ["6", "teammates"],
    ],
    visual: () => <TitanScreen />,
  },
  {
    name: "USAII Global AI Hackathon 2026",
    short: "USAII",
    role: "Frontend, team of 2",
    when: "2026",
    what: elder.what ?? "",
    result: "Round 2 of 324 teams with ElderBridge.",
    stats: [
      ["324", "teams"],
      ["R2", "reached"],
    ],
    visual: () => (
      <div className="rounded-xl bg-cream py-5">
        <ElderScreen />
      </div>
    ),
  },
  {
    name: "EdTech4D",
    short: "E4D",
    role: "Intern, led one delivery cycle",
    when: "Two months",
    what: jss.role ?? "",
    result: "Top 5 portfolio in the cohort.",
    stats: [
      ["Top 5", "in cohort"],
      ["2", "pages rebuilt"],
    ],
    visual: () => (
      <div className="rounded-xl bg-cream p-3">
        <JssScreen />
      </div>
    ),
  },
  {
    name: "Dev Weekends",
    short: "DW",
    role: "AI Engineering mentee",
    when: "Jun – Aug 2026",
    what: "AI Engineering mentee while shipping my first real projects.",
    result: "Mentored through the AI engineering track.",
    stats: [["3", "months"]],
    visual: () => (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-cream/10 bg-cream/5">
        <div className="h-32 w-48">
          <AgentGraph />
        </div>
      </div>
    ),
  },
];

const terminal = [
  ["Learning", "Python and machine learning"],
  ["Practicing", "Data structures and algorithms in Java, every day"],
  ["Leading", "AWS Student Builder Group at Sukkur IBA"],
  ["Open to", "Remote internships, open source, collaboration"],
];
const toolsBuild = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "Git",
  "Vercel",
];
const toolsLearn = ["Python", "pandas", "NumPy", "scikit-learn", "SQL"];
const certificates = [
  "AI Engineer for Developers Associate (DataCamp)",
  "5-Day AI Agents Intensive (Kaggle)",
  "Azure AI and Azure OpenAI Basics (Microsoft)",
  "AI Fundamentals (IBM)",
  "Generative AI and Responsible AI (Google Cloud)",
  "DataCamp courses on embeddings, prompt engineering, LLMOps and Hugging Face",
];

const unfinished = [
  "redesigned this portfolio 5 times before shipping it once.",
  "planned a whole certificate sprint for my community. never launched it.",
  "skipped the 24-hour AI film challenge. ran out of time.",
];
const smallThings = [
  {
    k: "headphones",
    v: "coke studio, soft music, random playlists. silence when my brain fights the code.",
    Icon: Headphones,
  },
  { k: "fuel", v: "chai. the most consistent part of my developer journey.", Icon: Coffee },
  {
    k: "dumbest mistake",
    v: "committed node_modules to github. the repo was heavier than my confidence.",
    Icon: Package,
  },
  { k: "friends tease me for", v: "joining every fellowship that exists.", Icon: Award },
  {
    k: "if nobody was grading",
    v: "a tool that tells pakistani students which scholarships they actually qualify for.",
    Icon: GraduationCap,
  },
];
const tilt = (seed: string, i = 0) => {
  let h = i * 7;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return ((h % 61) - 30) / 10; // -3 to 3 deg
};
const letter = [
  "Dear Kaneeza,",
  "By now I hope you've shipped an ML model that real people use, not just a notebook.",
  "I hope the AWS group at Sukkur IBA runs fine without you in the room.",
  "I hope you still solve one DSA problem a day, even on the days you don't feel like it.",
  "And I hope you finally stopped rebuilding this portfolio.",
  "If you haven't done all of it, that's okay. Just don't stop.",
];

/* ---------- Live data ---------- */
type Day = { date: string; count: number; level: number };
function useContributions() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH}?y=last`)
      .then((r) => r.json())
      .then((d: { contributions: Day[]; total: Record<string, number> }) => {
        setDays(d.contributions);
        setTotal(Object.values(d.total).reduce((a, b) => a + b, 0));
      })
      .catch(() => setDays([]));
  }, []);
  // Live public repo count (GitHub REST API, no token needed; 60 req/hour per visitor IP).
  const [repos, setRepos] = useState(REPOS_FALLBACK);
  useEffect(() => {
    fetch(`https://api.github.com/users/${GH}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { public_repos?: number }) => {
        if (typeof d.public_repos === "number") setRepos(d.public_repos);
      })
      .catch(() => {});
  }, []);
  return { days, total, repos };
}
function useSukkurTemp() {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=27.7052&longitude=68.8574&current=temperature_2m",
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { current?: { temperature_2m?: number } }) => {
        const v = d.current?.temperature_2m;
        if (typeof v === "number") setT(Math.round(v));
      })
      .catch(() => setT(null));
  }, []);
  return t;
}
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

const LV = ["bg-g0", "bg-g1", "bg-g2", "bg-g3", "bg-g4"];
// Shown only until the live count arrives from GitHub (or if the request fails).
const REPOS_FALLBACK = 46;
const TYPED = "nov 2025 · sukkur, pakistan · 0 repositories";

/* ---------- Small pieces ---------- */
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
      className={`mb-2 font-mono text-[11px] break-words ${dark ? "text-cream/60" : "text-muted-foreground"}`}
    >
      <span className="text-primary">$</span> git commit -m "{msg}"
    </p>
  );
}
function Sticky({ text, i = 0 }: { text: string; i?: number }) {
  return (
    <div className="sticky-note tiltable" style={{ ["--tilt" as string]: `${tilt(text, i)}deg` }}>
      <span className="pin" aria-hidden />
      <p className="font-hand text-xl leading-snug">{text}</p>
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
    <div ref={ref} className={`guide mb-6 flex items-center gap-3 ${v ? "visible" : ""}`}>
      <img
        src={avatar}
        alt=""
        className="guide-float h-14 w-14 shrink-0 rounded-full bg-ink object-cover ring-2 ring-primary ring-offset-2 ring-offset-background"
      />
      <p
        className={`relative rounded-2xl rounded-bl-sm border px-3 py-2 font-mono text-xs ${dark ? "border-cream/20 bg-cream/10 text-cream" : "border-border bg-card text-foreground"}`}
      >
        {line}
      </p>
    </div>
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
const ExtLink = ({ href, children }: { href?: string | undefined; children: ReactNode }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-mono text-sm text-primary hover:text-primary-hover"
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
    <div className="max-w-3xl">
      <Label className={dark ? "text-cream/60" : "text-muted-foreground"}>{eyebrow}</Label>
      <h2 className="mt-3 font-display text-4xl leading-[1.05] font-bold md:text-6xl">
        {title}{" "}
        <span className="font-hand text-5xl font-bold text-primary md:text-7xl">{accent}</span>
      </h2>
      {sub && (
        <p className={`mt-4 text-lg ${dark ? "text-cream/70" : "text-muted-foreground"}`}>{sub}</p>
      )}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <nav className="sticky top-3 z-40 px-3">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border border-border bg-background/85 py-1.5 pr-2 pl-1.5 shadow-soft backdrop-blur">
        <a href="#top" className="flex items-center gap-2 font-display text-base font-bold">
          <img src={avatar} alt="" className="h-8 w-8 rounded-full bg-ink object-cover" />
          <span className="hidden sm:inline">Kaneeza Batool</span>
        </a>
        <div className="flex items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm">
          {[
            ["Story", "#story"],
            ["Journey", "#journey"],
            ["Work", "#work"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="rounded-full px-2.5 py-1.5 hover:bg-soft hover:text-primary sm:px-3"
            >
              {l}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 font-mono text-xs text-primary-foreground hover:bg-primary-hover sm:text-sm"
        >
          <Mail className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Say hi</span>
          <span className="sm:hidden">Hi</span>
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
const heroStats = [
  { id: "repos", to: REPOS_FALLBACK, label: "GitHub repositories", Icon: Github },
  { to: 50, prefix: "Top ", label: "of 500 teams, DoraHacks", Icon: Trophy },
  { to: 32, prefix: "#", label: "on Product Hunt, launch day", Icon: Rocket },
  { to: 800, prefix: "$", label: "in hackathon rewards", Icon: Sparkles },
  { to: 30, suffix: "+", label: "countries in my fellowship", Icon: Globe },
  { to: certificates.length, label: "certificates and courses", Icon: Award },
];

function Hero({ temp }: { temp: number | null }) {
  const [n, setN] = useState(0);
  const done = n >= TYPED.length;
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
  const appear = `transition-all duration-700 motion-reduce:transition-none ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;
  return (
    <header id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_auto_0.75fr] lg:gap-10">
        {/* Left: words */}
        <div className="order-2 lg:order-1">
          <p className="font-hand text-3xl text-primary">Kaneeza Batool</p>
          <p className="mt-3 font-mono text-sm text-muted-foreground" aria-label={TYPED}>
            <span aria-hidden>{TYPED.slice(0, n)}</span>
            <span aria-hidden className="caret ml-0.5 text-primary">
              ▍
            </span>
          </p>
          <h1
            className={`mt-4 font-display text-4xl leading-[1.05] font-bold sm:text-5xl xl:text-6xl ${appear}`}
          >
            It was supposed to be one{" "}
            <span className="relative inline-block">
              homework
              <Scribble className="absolute -bottom-2 left-0 h-3 w-full" />
            </span>{" "}
            assignment.
          </h1>
          <p className={`mt-6 max-w-xl text-lg text-muted-foreground delay-150 ${appear}`}>
            A year later, my teams have taken 1st in our batch, 1st in our fellowship cluster, and
            Top 50 in the world at DoraHacks. This is how one assignment got out of hand.
          </p>
          <div className={`mt-8 flex flex-wrap gap-3 delay-300 ${appear}`}>
            <a
              href="#story"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover"
            >
              Read the story
            </a>
            <a
              href="#work"
              className="rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-soft"
            >
              Skip to the work
            </a>
          </div>
        </div>

        {/* Center: arch avatar with stickers */}
        <div className="relative order-1 mx-auto lg:order-2">
          <div className="arch relative h-80 w-64 overflow-hidden bg-ink shadow-lift ring-4 ring-primary ring-offset-4 ring-offset-background md:h-[26rem] md:w-80">
            <img
              src={avatar}
              alt="Illustrated avatar of Kaneeza in a hoodie and headphones"
              className="h-full w-full scale-110 object-cover object-[50%_40%]"
            />
          </div>
          {[
            {
              t: "1st in batch · SMIT",
              Icon: Trophy,
              cls: "-left-10 top-10 md:-left-16",
              tilt: -6,
            },
            { t: "Top 50 · DoraHacks", Icon: Globe, cls: "-right-10 top-32 md:-right-16", tilt: 5 },
            {
              t: "AI Engineer · DataCamp",
              Icon: Award,
              cls: "-left-6 bottom-12 md:-left-14",
              tilt: 3,
            },
          ].map(({ t, Icon, cls, tilt: tl }, i) => (
            <span
              key={t}
              className={`floaty absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-lift ${cls}`}
              style={{ ["--tilt" as string]: `${tl}deg`, animationDelay: `${i * 700}ms` }}
            >
              <Icon className="h-3.5 w-3.5 text-primary" /> {t}
            </span>
          ))}
          <div className="absolute -right-4 -bottom-6 hidden items-end gap-1 md:flex">
            <HandArrow className="h-8 w-12 -scale-x-100 rotate-180" />
            <span className="font-hand text-xl leading-none text-primary">me + my headphones</span>
          </div>
        </div>

        {/* Right: status cards */}
        <div className={`order-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 ${appear}`}>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
              <span className="pulse-dot h-2 w-2 rounded-full bg-primary" /> Open to
            </div>
            <p className="mt-2 text-sm font-medium">
              Remote internships, open source, collaboration
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
              <Users className="h-3.5 w-3.5 text-primary" /> Leading
            </div>
            <p className="mt-2 text-sm font-medium">
              The first AWS Student Builder Group at Sukkur IBA
            </p>
          </div>
          <div className="rounded-2xl bg-ink p-4 text-cream shadow-soft">
            <div className="flex items-center gap-2 font-mono text-[11px] text-cream/60 uppercase">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Based in
            </div>
            <p className="mt-2 text-sm font-medium">Sukkur, Pakistan</p>
            {temp !== null && (
              <p className="mt-1 font-mono text-xs text-cream/70">
                ☀ it's {temp}°C there right now.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* The hook, as a picture: an empty GitHub graph */}
      <div
        className={`mt-16 rounded-3xl border border-border bg-card p-5 shadow-soft delay-500 md:p-7 ${appear}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Github className="h-5 w-5" />
            <span className="font-mono text-sm">
              <span className="hidden sm:inline">github.com/</span>
              {GH}
            </span>
            <span className="rounded-full bg-soft px-2.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-primary">
              Nov 2025
            </span>
          </div>
          <span className="font-hand text-2xl leading-none text-primary">
            day one. nothing here yet.
          </span>
        </div>
        <div
          className="mt-5 grid w-full grid-flow-col grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-7 gap-[3px] sm:grid-cols-[repeat(53,minmax(0,1fr))]"
          aria-hidden
        >
          {Array.from({ length: 371 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[2px] ${i === 0 ? "pulse-dot bg-primary" : "bg-g0"} ${i >= 126 ? "hidden sm:block" : ""}`}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
          <span>
            <span className="font-medium text-primary">0 repositories</span> · 0 contributions
          </span>
          <a href="#story" className="hover:text-primary">
            scroll to watch it fill ↓
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- What I do (bento) ---------- */
function Bento() {
  const cards = [
    {
      k: "I build",
      title: "Full-stack web",
      line: "MERN apps, from multi-portal systems to redesigns of live sites.",
      Icon: Code2,
      visual: (
        <BrowserFrame url="localhost:5173" className="rotate-[-2deg]">
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
        <div className="h-36 w-full">
          <AgentGraph />
        </div>
      ),
      tags: ["CrewAI", "FastAPI", "RAG"],
    },
    {
      k: "I bring people along",
      title: "Community",
      line: "Founding the first AWS Student Builder Group at Sukkur IBA.",
      Icon: Users,
      visual: (
        <div className="flex h-36 items-center justify-center">
          <div className="flex -space-x-3">
            {["K", "", "", "", "", "+"].map((c, i) => (
              <span
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-card font-display text-sm font-bold ${
                  [
                    "bg-primary text-primary-foreground",
                    "bg-g1",
                    "bg-g2",
                    "bg-g3",
                    "bg-g4",
                    "bg-ink text-cream",
                  ][i]
                }`}
              >
                {i === 0 ? (
                  <img src={avatar} alt="" className="h-full w-full rounded-full object-cover" />
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
      k: "I learn in public",
      title: "Every day",
      line: "Daily build recaps as @kaneeza.builds, DSA in Java every day.",
      Icon: Sparkles,
      visual: (
        <div className="relative flex h-36 w-full items-center justify-center">
          {[-10, -3, 5].map((r, i) => (
            <div
              key={r}
              className="absolute w-20 overflow-hidden rounded-xl border border-border bg-background shadow-lift"
              style={{ transform: `translateX(${(i - 1) * 46}px) rotate(${r}deg)`, zIndex: i }}
            >
              <div className="flex items-center gap-1 border-b border-border px-1.5 py-1">
                <img src={avatar} alt="" className="h-3.5 w-3.5 rounded-full bg-ink object-cover" />
                <span className="truncate font-mono text-[6px]">kaneeza.builds</span>
              </div>
              <div
                className={`flex aspect-[4/5] flex-col justify-end gap-1 p-1.5 ${i === 2 ? "bg-primary" : "bg-soft"}`}
              >
                <span
                  className={`font-hand text-sm leading-none ${i === 2 ? "text-primary-foreground" : "text-primary"}`}
                >
                  build recap
                </span>
                <span
                  className={`h-1 w-4/5 rounded-full ${i === 2 ? "bg-primary-foreground/60" : "bg-g2"}`}
                />
                <span
                  className={`h-1 w-1/2 rounded-full ${i === 2 ? "bg-primary-foreground/60" : "bg-g2"}`}
                />
              </div>
            </div>
          ))}
        </div>
      ),
      tags: ["GitHub", "Instagram", "LeetCode"],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead eyebrow="What I do" title="Four things I keep" accent="doing." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ k, title, line, Icon, visual, tags }) => (
          <FadeIn key={k}>
            <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{title}</span>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight font-bold">{k}</h3>
              <div className="my-5 flex flex-1 items-center">{visual}</div>
              <p className="text-sm text-muted-foreground">{line}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ---------- Payoff: one year later ---------- */
function Payoff({
  days,
  total,
  repos,
}: {
  days: Day[] | null;
  total: number | null;
  repos: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  return (
    <section className="grain-ink text-cream">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Label className="text-cream/60">The payoff</Label>
        <p className="mt-6 font-mono text-sm text-cream/50 line-through decoration-primary decoration-2">
          {TYPED}
        </p>
        <h2 className="mt-2 font-display text-5xl leading-[1.02] font-bold md:text-7xl">
          One year <span className="font-hand text-6xl text-primary md:text-8xl">later.</span>
        </h2>
        <div ref={ref} className="mt-10 rounded-3xl bg-cream p-5 text-ink shadow-lift md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <span className="font-mono text-sm">github.com/{GH}</span>
            </span>
            <span className="font-hand text-2xl leading-none text-primary">
              same graph. not empty anymore.
            </span>
          </div>
          <Graph days={days} total={total} repos={repos} reveal={inView ? 1 : 0} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/15 bg-cream/15 sm:grid-cols-3 lg:grid-cols-6">
          {heroStats.map(({ id, to, prefix, suffix, label, Icon }) => (
            <div key={label} className="flex flex-col gap-2 bg-ink p-5">
              <Icon className="h-5 w-5 text-primary" />
              <p className="font-display text-3xl font-bold">
                <CountUp
                  to={id === "repos" ? repos : to}
                  prefix={prefix ?? ""}
                  suffix={suffix ?? ""}
                />
              </p>
              <p className="text-xs leading-snug text-cream/60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GitHub graph ---------- */
function Graph({
  days,
  total,
  repos,
  reveal,
}: {
  days: Day[] | null;
  total: number | null;
  repos: number;
  reveal: number;
}) {
  const list =
    days && days.length
      ? days
      : Array.from({ length: 365 }, () => ({ date: "", count: 0, level: 0 }));
  const weeks = Math.ceil(list.length / 7);
  const cut = Math.round(list.length * reveal);
  const shown = list.slice(0, cut).reduce((a, d) => a + d.count, 0);
  return (
    <div className="w-full">
      <div
        className="grid w-full grid-flow-col grid-rows-7 gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
      >
        {list.map((d, i) => (
          <div
            key={d.date || i}
            title={d.date && i < cut ? `${d.count} on ${d.date}` : undefined}
            className={`aspect-square w-full rounded-[1px] transition-colors duration-300 ${i < cut ? LV[d.level] : LV[0]}`}
            style={{ transitionDelay: `${(i % 60) * 8}ms` }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-primary">
            {Math.round(repos * reveal)} repositories
          </span>
          {" · "}
          {days ? `${shown} of ${total ?? 0} contributions` : "Loading GitHub…"}
        </span>
        {reveal === 0 ? (
          <span>scroll to watch it fill ↓</span>
        ) : (
          <a
            href={`https://github.com/${GH}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            @{GH}
          </a>
        )}
      </div>
    </div>
  );
}

/* ---------- Project card ---------- */
function ProjectCard({
  p,
  big = false,
  dark = false,
}: {
  p: Project;
  big?: boolean;
  dark?: boolean;
}) {
  return (
    <article
      className={`group h-full overflow-hidden rounded-3xl border shadow-soft ${dark ? "border-cream/15 bg-cream/5 text-cream" : "border-border bg-card"} ${big ? "lg:grid lg:grid-cols-[1.25fr_1fr]" : "flex flex-col"}`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden p-5 md:p-7 ${dark ? "bg-cream/5" : "bg-soft"} ${big ? "lg:order-2" : ""}`}
      >
        <div className="w-full transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
          <Screen p={p} />
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${big ? "p-6 md:p-8" : "p-5"}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display font-bold ${big ? "text-3xl md:text-4xl" : "text-xl"}`}>
            {p.title}
          </h3>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${p.kind === "ai" ? "bg-primary text-primary-foreground" : dark ? "bg-cream/10" : "bg-background"}`}
          >
            {p.kind === "ai" ? "AI" : "Web"}
          </span>
        </div>
        {p.what && (
          <p
            className={`mt-3 text-sm ${dark ? "text-cream/75" : "text-muted-foreground"} ${big ? "" : "line-clamp-4"}`}
          >
            {p.what}
          </p>
        )}
        {p.role && (
          <p className="mt-3 text-sm">
            <span className="font-mono text-[11px] text-primary uppercase">My role · </span>
            {p.role}
          </p>
        )}
        {big && p.context && (
          <p className={`mt-3 text-sm ${dark ? "text-cream/75" : "text-muted-foreground"}`}>
            {p.context}
          </p>
        )}
        {p.result && (
          <p
            className={`mt-4 flex gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium ${dark ? "bg-primary/20 text-cream" : "bg-background text-primary"}`}
          >
            <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {p.result}
          </p>
        )}
        <div className="mt-auto pt-4">
          {p.team && (
            <p
              className={`mb-3 flex items-center gap-1.5 font-mono text-[11px] ${dark ? "text-cream/60" : "text-muted-foreground"}`}
            >
              <Users className="h-3.5 w-3.5" /> {p.team}
            </p>
          )}
          {p.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag key={t} dark={dark}>
                  {t}
                </Tag>
              ))}
            </div>
          )}
          {(p.live || p.github) && (
            <div className="mt-4 flex flex-wrap gap-4">
              <ExtLink href={p.live}>Live</ExtLink>
              <ExtLink href={p.github}>Code</ExtLink>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- Chapter-specific visuals ---------- */
function FellowshipCard() {
  const stats = [
    { n: "30+", l: "countries", Icon: Globe },
    { n: "Top 100", l: "most active fellows", Icon: Trophy },
    { n: "daily", l: "build recaps, @kaneeza.builds", Icon: Sparkles },
  ];
  return (
    <div className="grain-ink mt-6 overflow-hidden rounded-3xl text-cream shadow-lift">
      <div className="grid items-center gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-mono text-[11px] text-primary-foreground uppercase">
            <Users className="h-3.5 w-3.5" /> Fellowship
          </span>
          <h3 className="mt-4 font-display text-2xl leading-tight font-bold md:text-3xl">
            GWY Fellowship 2.0 <span className="text-cream/60">(DoraDAO)</span>
          </h3>
          <p className="mt-2 text-cream/75">
            A global fellowship for{" "}
            <span className="font-hand text-2xl text-primary">women in AI</span>. It's also where
            auraCheck was born, at DoraHacks 2.0.
          </p>
        </div>
        <div className="relative rounded-2xl bg-cream p-3">
          <WorldMap className="w-full" />
          <span className="absolute right-3 bottom-3 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] text-cream">
            30+ countries, one cohort
          </span>
        </div>
      </div>
      <div className="grid border-t border-cream/10 sm:grid-cols-3">
        {stats.map(({ n, l, Icon }) => (
          <div
            key={l}
            className="flex items-center gap-3 border-cream/10 p-5 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-2xl leading-none font-bold text-primary">
                {n}
              </span>
              <span className="mt-1 block text-xs text-cream/60">{l}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stamp() {
  const text = "AWS STUDENT BUILDER GROUP · SUKKUR IBA · EST. SEP 2026 · ";
  return (
    <div className="relative mx-auto h-48 w-48 md:h-56 md:w-56">
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
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

/* ---------- Page ---------- */
function Index() {
  const { days, total, repos } = useContributions();
  const temp = useSukkurTemp();
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLElement | null)[]>([]);

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
  const reveal = active < 0 ? 0 : (active + 1) / (chapters.length + 1);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <Hero temp={temp} />
      <Bento />

      {/* Story */}
      <section id="story" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-10">
        <SectionHead
          eyebrow="The story"
          title="How one assignment got"
          accent="out of hand."
          sub="Four chapters, one GitHub graph. Watch it fill as you scroll."
        />
        <div className="sticky top-[68px] z-20 -mx-5 mt-8 border-b border-border bg-background/95 px-5 py-3 backdrop-blur md:hidden">
          <Graph days={days} total={total} repos={repos} reveal={reveal} />
        </div>
        <div className="md:grid md:grid-cols-[0.85fr_1.5fr] md:gap-12">
          <aside className="hidden md:block">
            <div className="sticky top-28 mt-16 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <Label>GitHub, chapter by chapter</Label>
              <div className="mt-4">
                <Graph days={days} total={total} repos={repos} reveal={reveal} />
              </div>
              <ol className="mt-5 space-y-1.5 border-t border-border pt-4">
                {chapters.map((c, i) => (
                  <li
                    key={c.title}
                    className={`flex items-center gap-2 font-mono text-xs transition-colors ${active >= i ? "text-foreground" : "text-muted-foreground/60"}`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active === i ? "bg-primary text-primary-foreground" : active > i ? "bg-g2" : "bg-g0"}`}
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
                className="relative py-16 md:min-h-[80vh] md:py-24"
              >
                <span
                  aria-hidden
                  className="text-outline pointer-events-none absolute top-6 right-0 font-display text-[7rem] leading-none font-bold select-none md:text-[11rem]"
                >
                  0{i + 1}
                </span>
                <Guide line={c.bubble} />
                <FadeIn>
                  <Commit msg={c.commit} />
                  <div className="flex flex-wrap items-center gap-2">
                    <Label className="text-primary">{c.label}</Label>
                    <span className="rounded-full bg-soft px-2.5 py-0.5 font-mono text-[11px] text-primary">
                      {c.date}
                    </span>
                  </div>
                  <h2 className="relative mt-3 font-display text-3xl leading-tight font-bold md:text-5xl">
                    {c.title}
                    {c.doodle && <Doodle kind={c.doodle} />}
                  </h2>
                  {c.lines && (
                    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
                      <div className="space-y-2 text-xl text-muted-foreground">
                        {c.lines.map((l) => (
                          <p key={l}>{l}</p>
                        ))}
                      </div>
                      <figure
                        className="polaroid tiltable"
                        style={{ ["--tilt" as string]: "2.5deg" }}
                      >
                        <span className="tape" aria-hidden />
                        <FirstPortfolioScreen />
                        <figcaption className="mt-2 text-center font-hand text-xl">
                          my first portfolio. plain HTML.
                        </figcaption>
                      </figure>
                    </div>
                  )}
                  {c.stat && (
                    <div className="mt-10 grid items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8 lg:grid-cols-[auto_1fr]">
                      <Stamp />
                      <div>
                        <p className="font-display text-2xl leading-snug font-bold text-primary md:text-3xl">
                          {c.stat}
                        </p>
                        <p className="mt-3 text-lg text-muted-foreground">{c.statText}</p>
                      </div>
                    </div>
                  )}
                  {c.fellowship && <FellowshipCard />}
                </FadeIn>
                {c.featured && (
                  <FadeIn className="mt-8">
                    <ProjectCard p={c.featured} />
                  </FadeIn>
                )}
                {c.projects && (
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {c.projects.map((p) => (
                      <FadeIn key={p.title}>
                        <ProjectCard p={p} />
                      </FadeIn>
                    ))}
                  </div>
                )}
                {c.stickies && (
                  <div className="mt-10 flex flex-wrap gap-6 px-2">
                    {c.stickies.map((t, k) => (
                      <Sticky key={t} text={t} i={k} />
                    ))}
                  </div>
                )}
                {c.note && (
                  <p className="mt-6 flex items-start gap-2 font-mono text-sm text-muted-foreground">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {c.note}
                  </p>
                )}
                {c.badges && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-2 rounded-full border border-gold bg-background px-3 py-1.5 text-xs font-medium text-gold"
                      >
                        <Award className="h-3.5 w-3.5" /> {b}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Journey />
      <MapSection temp={temp} />

      {/* Chapter 5 */}
      <section
        data-idx={chapters.length}
        ref={(el) => {
          refs.current[chapters.length] = el;
        }}
        className="grain-ink text-cream"
      >
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Guide line="still here. still building." dark />
          <Commit msg="feat: AI happened" dark />
          <Label className="text-cream/70">Chapter 5 · Now</Label>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            This chapter is still being written.<span className="caret ml-1 text-primary">|</span>
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-cream/15 bg-cream/5">
              <div className="flex items-center gap-1.5 border-b border-cream/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                <span className="h-2.5 w-2.5 rounded-full bg-cream/40" />
                <span className="ml-3 font-mono text-xs text-cream/60">~/kaneeza/now</span>
              </div>
              <div className="space-y-3 p-5 font-mono text-sm md:p-6">
                {terminal.map(([k, v]) => (
                  <div key={k} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                    <span className="text-primary">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <p className="pt-2 text-cream/60">
                  $ <span className="caret">▍</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium">Follow the work as it happens</p>
              {[
                [
                  "ai-ml-learning-journey",
                  "Python and machine learning, one notebook at a time",
                  Brain,
                ],
                ["dsa-in-java", "One data structures problem a day, in Java", Code2],
              ].map(([repo, line, Icon]) => {
                const I = Icon as typeof Brain;
                return (
                  <a
                    key={repo as string}
                    href={`https://github.com/${GH}/${repo as string}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-4 transition-colors hover:border-primary hover:bg-primary/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <I className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-sm">{repo as string}</span>
                      <span className="block text-xs text-cream/60">{line as string}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-cream/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Work />

      {/* Things I didn't finish */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Guide line="the honest part." />
        <Commit msg="wip: everything else" />
        <Label>Chapter 6 · Things I didn't finish</Label>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          The wins are real. So are these.
        </h2>
        <div className="cork relative mt-10 rounded-3xl border border-border p-8 shadow-soft md:p-12">
          <span className="absolute -top-3 left-8 rounded-sm bg-ink px-3 py-1 font-mono text-[11px] text-cream">
            status: wip
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            {unfinished.map((u, k) => (
              <Sticky key={u} text={u} i={k} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools + certificates */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead eyebrow="Tools" title="What's on my" accent="keyboard." />
        <div className="mt-10 grid gap-8 md:grid-cols-[10rem_1fr] md:items-start">
          <p className="font-display text-lg font-bold">I build with</p>
          <div className="flex flex-wrap gap-2.5">
            {toolsBuild.map((t) => (
              <span key={t} className="keycap">
                {t}
              </span>
            ))}
          </div>
          <p className="font-display text-lg font-bold">I am learning</p>
          <div className="flex flex-wrap gap-2.5">
            {toolsLearn.map((t) => (
              <span key={t} className="keycap keycap-ghost">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-4">
          <div>
            <Label>Certificates</Label>
            <p className="mt-2 font-display text-2xl font-bold">
              {certificates.length} certificates and courses
            </p>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">scroll →</span>
        </div>
        <div className="scrollbar-none -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4">
          {certificates.map((c, i) => {
            const m = /^(.*) \((.*)\)$/.exec(c);
            const name = m?.[1] ?? c;
            const issuer = m?.[2] ?? "DataCamp";
            return (
              <article
                key={c}
                className="paper relative w-64 shrink-0 snap-start rounded-2xl border border-border p-5 shadow-soft"
                style={{ transform: `rotate(${tilt(c, i) / 2}deg)` }}
              >
                <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-background shadow-soft">
                  <Award className="h-5 w-5" />
                </span>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                  {issuer}
                </p>
                <p className="mt-8 pr-2 font-display text-lg leading-snug font-bold">{name}</p>
                <div className="mt-6 border-t border-dashed border-gold pt-2 font-hand text-lg text-muted-foreground">
                  Kaneeza Batool
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* human */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead eyebrow="Off the clock" title="The human behind the" accent="commits." />
        <div className="mt-14 grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {smallThings.map(({ k, v, Icon }, i) => (
            <figure
              key={k}
              className={`polaroid tiltable ${i % 2 ? "lg:mt-10" : ""}`}
              style={{ ["--tilt" as string]: `${tilt(k, i)}deg` }}
            >
              <span className="tape" aria-hidden />
              <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-soft">
                <span className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-g1" />
                <span className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-card" />
                <Icon className="relative h-16 w-16 text-primary" strokeWidth={1.4} />
              </div>
              <p className="mt-2 font-mono text-[11px] text-primary">{k}</p>
              <figcaption className="mt-1 font-hand text-xl leading-snug">{v}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Payoff days={days} total={total} repos={repos} />

      {/* Letter */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <Guide line="one more thing." />
        <Label>A letter to Kaneeza, Nov 2027</Label>
        <div className="paper relative mt-8 -rotate-1 rounded-sm border border-border p-8 shadow-lift md:p-12">
          <span className="absolute -top-5 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground shadow-soft ring-4 ring-primary/30">
            K
          </span>
          <div className="space-y-3 font-hand text-2xl leading-snug md:text-3xl">
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

      <footer className="bg-ink py-8 text-center font-mono text-xs text-cream/70">
        © 2026 kaneeza · made in sukkur, powered by chai ·{" "}
        <a href="#top" className="underline-offset-4 hover:text-cream hover:underline">
          back to top
        </a>
      </footer>
    </div>
  );
}

/* ---------- Journey ---------- */
function Journey() {
  const [sel, setSel] = useState(0);
  const o = orgs[sel] ?? orgs[0]!;
  return (
    <section id="journey" className="grain-ink scroll-mt-20 text-cream">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead
          dark
          eyebrow="Journey"
          title="Where I've"
          accent="been."
          sub="Fellowships, hackathons, an internship and a campus group. Pick one."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[19rem_1fr]">
          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {orgs.map((g, i) => (
              <button
                key={g.name}
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                className={`flex shrink-0 items-center gap-3 rounded-2xl border p-2.5 pr-4 text-left transition-colors ${
                  sel === i
                    ? "border-primary bg-primary/15"
                    : "border-cream/10 bg-cream/5 hover:border-cream/30"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-[10px] font-bold ${
                    sel === i ? "bg-primary text-primary-foreground" : "bg-cream text-ink"
                  }`}
                >
                  {g.short}
                </span>
                <span className="min-w-0">
                  <span className="block max-w-48 truncate text-sm font-medium lg:max-w-none lg:whitespace-normal">
                    {g.name}
                  </span>
                  <span className="block font-mono text-[10px] text-cream/50">{g.when}</span>
                </span>
              </button>
            ))}
          </div>

          <article
            key={o.name}
            className="fade-in visible overflow-hidden rounded-3xl border border-cream/15 bg-cream/5"
          >
            <div className="grid gap-6 p-6 md:p-8 xl:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-mono text-xs font-bold text-primary-foreground">
                    {o.short}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight font-bold">{o.name}</h3>
                    <p className="font-mono text-xs text-cream/60">{o.when}</p>
                  </div>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 font-mono text-xs">
                  <Briefcase className="h-3.5 w-3.5 text-primary" /> {o.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream/75">{o.what}</p>
                <p className="mt-5 flex gap-2 rounded-2xl bg-primary/20 px-3 py-2.5 text-sm font-medium">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {o.result}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-full">{o.visual()}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-cream/10 sm:grid-cols-3">
              {o.stats.map(([n, l]) => (
                <div key={l} className="border-cream/10 p-5 not-last:border-r">
                  <p className="font-display text-3xl font-bold text-primary">{n}</p>
                  <p className="text-xs text-cream/60">{l}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------- Map ---------- */
function MapSection({ temp }: { temp: number | null }) {
  const facts = [
    {
      n: 35,
      s: "+",
      l: "countries at DoraHacks 2.0",
      d: "6,000+ applications, 500 teams selected",
    },
    {
      n: 30,
      s: "+",
      l: "countries in GWY Fellowship 2.0",
      d: "a global fellowship for women in AI",
    },
    { n: 324, s: "", l: "teams at USAII Global AI Hackathon", d: "ElderBridge reached Round 2" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHead eyebrow="Reach" title="From Sukkur to the" accent="world." />
        <p className="max-w-sm text-muted-foreground">
          Built from a small city in Sindh, alongside teams and fellows from dozens of countries.
        </p>
      </div>
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-soft md:p-8">
        <WorldMap className="w-full" />
        <div className="absolute top-[47%] left-[71%] hidden md:block">
          <div className="ml-6 w-56 rounded-2xl border border-border bg-background p-3 shadow-lift">
            <p className="flex items-center gap-1.5 font-mono text-[11px] text-primary uppercase">
              <MapPin className="h-3.5 w-3.5" /> home base
            </p>
            <p className="mt-1 font-display text-lg font-bold">Sukkur, Pakistan</p>
            <p className="text-xs text-muted-foreground">
              Sukkur IBA{temp !== null ? ` · ${temp}°C right now` : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {facts.map((f) => (
          <div key={f.l} className="rounded-3xl border border-border bg-background p-5 shadow-soft">
            <p className="font-display text-4xl font-bold text-primary">
              <CountUp to={f.n} suffix={f.s} />
            </p>
            <p className="mt-1 font-medium">{f.l}</p>
            <p className="text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work() {
  const [f, setF] = useState<"all" | Kind>("all");
  const rest = allProjects.filter((p) => p !== aura && (f === "all" || p.kind === f));
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="All work" title="Everything I've" accent="built so far." />
        <div className="flex gap-2 font-mono text-sm">
          {(["all", "ai", "web"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setF(k)}
              className={`rounded-full border px-4 py-1.5 transition-colors ${f === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-soft"}`}
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
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <FadeIn key={p.title}>
            <ProjectCard p={p} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
const marquee = [
  "full-stack",
  "applied AI",
  "community",
  "chai",
  "sukkur",
  "open source",
  "DSA daily",
  "learning in public",
];

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
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <button
          type="button"
          onClick={onAvatar}
          aria-label="Kaneeza's avatar"
          className="mx-auto block rounded-full"
        >
          <img
            src={avatar}
            alt="Illustrated avatar of Kaneeza"
            className={`h-28 w-28 rounded-full bg-ink object-cover shadow-lift ring-4 ring-primary ring-offset-4 ring-offset-background ${wiggle ? "wiggle" : ""}`}
          />
        </button>
        <p className="mt-8 font-hand text-3xl text-primary">Kaneeza Batool</p>
        <h2 className="mt-2 font-display text-5xl leading-[1.02] font-bold md:text-7xl">
          Let's build what's next,{" "}
          <span className="font-hand text-6xl text-primary md:text-8xl">together.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">i don't know. let's figure it out.</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium break-all text-primary-foreground shadow-lift hover:bg-primary-hover sm:text-base"
        >
          <Mail className="h-4 w-4 shrink-0" /> {EMAIL}
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </div>
      <div
        className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground"
        aria-hidden
      >
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
    </section>
  );
}
