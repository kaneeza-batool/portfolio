/**
 * All portfolio content lives here, so text can change without touching layout code.
 * Visual pieces (mockups, maps) are referenced by key and drawn in src/routes/index.tsx.
 */
import {
  Award,
  Briefcase,
  Code2,
  GitMerge,
  Github,
  Globe,
  HeartHandshake,
  Rocket,
  Scale,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export const SITE_URL = "https://kaneeza-batool-portfolio.vercel.app";
export const TITLE = "Kaneeza Batool | MERN developer moving into AI";
export const DESC =
  "Kaneeza Batool is a CS student at Sukkur IBA building full-stack web apps and applied AI. The story, the projects and how to reach her.";

export const GH = "kaneeza-batool";
export const EMAIL = "kaneezabatoolmemon@gmail.com";
export const CV_URL = "/Kaneeza_Batool_CV.pdf";
export const LINKS = {
  linkedin: "https://www.linkedin.com/in/kaneeza-batool",
  github: "https://github.com/kaneeza-batool",
  leetcode: "https://leetcode.com/u/kaneezabatool",
};

export const TYPED = "nov 2025 · sukkur, pakistan · 0 repositories";

/* ---------- Projects ---------- */
export type Kind = "ai" | "web";
export type Project = {
  title: string;
  kind: Kind;
  what?: string;
  role?: string;
  team?: string;
  result?: string;
  context?: string;
  tags: string[];
  live?: string;
  github?: string;
};

export const titan: Project = {
  title: "TITAN",
  kind: "web",
  what: "Multi-portal institute management system. Public site plus student, trainer, super admin and campus admin portals. Role-based access per module, QR attendance with generated ID cards, a job portal with applicant matching, automated absence and payment alerts, and a RAG chatbot.",
  role: "I built the campus-scoped Sub Admin portal from scratch.",
  team: "Team of 6",
  result: "1st place, Batch 1, Project Excellence Award (Saylani Mass IT Training, Aug 2026).",
  tags: ["React", "Node.js", "RBAC", "Vercel"],
  github: "https://github.com/kaneeza-batool/saylani-portal-fyp",
};
export const jss: Project = {
  title: "JobSkillShare redesign",
  kind: "web",
  what: "Internship work on a live site at EdTech4D (Jul to Aug 2026).",
  role: "Audited the site, wrote UX reports on usability and accessibility gaps, rebuilt the homepage and Programs page as responsive prototypes, and led the team for one delivery cycle.",
  result: "Top 5 portfolio in the cohort.",
  tags: ["HTML", "CSS", "JavaScript", "UX audit"],
  github: "https://github.com/kaneeza-batool/JSS-Internship",
};
export const aura: Project = {
  title: "auraCheck",
  kind: "ai",
  what: "Voice mock-interview platform. Five AI agents run a live interview, ask follow-ups, and check answers against the candidate's resume and GitHub. A judge agent writes a scorecard you can download as a PDF. Three services: React frontend on Vercel, Node/Express API with auth and SQLite, Python agent service on Railway's private network.",
  role: "I worked on the Python FastAPI + CrewAI engine that runs the five-agent interview panel.",
  team: "Team of 4, Gradient Gang",
  context:
    "Built in Aug 2026 at DoraHacks 2.0 (500 teams selected from 6,000+ applications, 35+ countries) through the GWY Fellowship 2.0.",
  result: "Top 50 in the hackathon, #32 on Product Hunt on launch day, $800 in rewards.",
  tags: ["React", "TypeScript", "Node.js", "WebSockets", "Python", "FastAPI", "CrewAI"],
  live: "https://auracheck-taupe.vercel.app",
  github: "https://github.com/kaneeza-batool/auraCheck",
};
export const paklaw: Project = {
  title: "PakLawAI",
  kind: "ai",
  what: "Legal Q&A assistant for Pakistani law. Ask a legal question, get an answer that cites the relevant Act and Section, built on retrieval over Pakistani legal texts.",
  role: "I built the frontend and the legal text pipeline (sourcing, extracting and cleaning the law texts for retrieval).",
  team: "Team of 5",
  result: "AuratTech AI Engineering Fellowship (Jun to Sep 2026), 1st in cluster.",
  tags: ["React", "RAG", "Data pipeline"],
};
export const elder: Project = {
  title: "ElderBridge",
  kind: "ai",
  what: "AI companion for elderly Pakistanis. Reads screens, flags scams, explains government forms in plain language.",
  role: "I built the frontend.",
  team: "Team of 2",
  result: "USAII Global AI Hackathon 2026, Round 2 of 324 teams.",
  tags: ["Frontend", "UI/UX"],
  github: "https://github.com/Yusra-Shah/ElderBridge-Guardianos",
};
export const dexo: Project = {
  title: "Dexo.pk",
  kind: "web",
  what: "Multi-page e-commerce frontend for a luxury home decor brand. Home, Shop, About and Contact pages, with product listings grouped into category sections.",
  role: "Built the frontend with a focus on clean layout, responsive design and a smooth experience on mobile, tablet and desktop.",
  tags: ["HTML", "CSS", "JavaScript", "Responsive"],
  live: "https://dexopk.netlify.app",
  github: "https://github.com/kaneeza-batool/dexo.pk",
};
export const allProjects = [aura, titan, paklaw, elder, jss, dexo];

/* ---------- Story ---------- */
export type Chapter = {
  label: string;
  date: string;
  title: string;
  bubble: string;
  commit: string;
  doodle: "star" | "arrow" | "heart" | "squiggle";
  lines?: string[];
  featured?: Project;
  projects?: Project[];
  note?: string;
  badges?: string[];
  stickies?: string[];
  /** Chapter 4: AWS stamp card, GWY card and community row. */
  community?: boolean;
};

export const chapters: Chapter[] = [
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
    date: "Jun – Sep 2026",
    title: "Then I made AI do real work.",
    bubble: "this is where it got fun.",
    commit: "fix: motivation. add: systems",
    doodle: "squiggle",
    featured: aura,
    projects: [paklaw, elder],
    stickies: ["my relationship with DSA: enemies to lovers. currently still in the enemies arc."],
  },
  {
    label: "Chapter 4",
    date: "Sep 2026",
    title: "I stopped building alone.",
    bubble: "turns out i like bringing people along.",
    commit: "feat: bring people along",
    doodle: "heart",
    community: true,
  },
];

export const aws = {
  stat: "The first AWS Student Builder Group at Sukkur IBA.",
  text: "The campus had never had one. I was selected as its first leader in Sep 2026 and I'm registering it with the university from zero.",
};
export const communityRoles = [
  {
    icon: "discord",
    text: "Moderator, AuratTech Alumni Discord",
    note: "I proposed and launched it",
  },
  { icon: "ambassador", text: "IWP Ambassador 2026-27", note: "Inspiring Women Pakistan" },
] as const;

/* ---------- Journey ---------- */
export type OrgVisual =
  | "pr"
  | "nexfellow"
  | "stamp"
  | "fellowship"
  | "paklaw"
  | "titan"
  | "elder"
  | "jss"
  | "devweekends";
export type Org = {
  name: string;
  short: string;
  role: string;
  when: string;
  what: string;
  result?: string;
  badge?: { label: string; href: string };
  stats: [string, string][];
  visual: OrgVisual;
  /** Icon in the middle of this program's passport stamp. */
  Icon: LucideIcon;
  /** One line shown when you hover a stamp: what this program taught me. */
  learned: string;
};

export const orgs: Org[] = [
  {
    name: "WoCS 2026",
    short: "WoCS",
    Icon: GitMerge,
    learned: "A fix isn't finished until it works on every OS, not only mine.",
    role: "Open-source contributor",
    when: "Nov 2026 – now",
    what: "Open-source programme. My first merged PR fixed a network quality endpoint that only worked on Windows and reported 100% packet loss on Linux and macOS, including the live deployment. I made it work on all three and added 12 tests.",
    badge: {
      label: "Merged PR #53",
      href: "https://github.com/saurabhwagh01/smart-connectivity-analyser/pull/53",
    },
    stats: [
      ["#53", "merged PR"],
      ["3", "operating systems"],
      ["12", "tests added"],
    ],
    visual: "pr",
  },
  {
    name: "nexFellow Fellowship, Cohort 1",
    short: "nF",
    Icon: Rocket,
    learned: "Taking one product from idea to launch, a week at a time.",
    role: "Fellow",
    when: "Oct 2026 – now",
    what: "8-week remote build programme. Taking a product from idea to launch with mentor guidance.",
    stats: [
      ["8", "weeks"],
      ["1", "product, idea to launch"],
    ],
    visual: "nexfellow",
  },
  {
    name: "AWS Student Builder Group, Sukkur IBA",
    short: "AWS",
    Icon: Users,
    learned: "Starting something from zero, with people instead of code.",
    role: "Founding leader",
    when: "Sep 2026 – now",
    what: aws.text,
    result: aws.stat,
    stats: [
      ["1st", "on campus"],
      ["0 → 1", "built from zero"],
    ],
    visual: "stamp",
  },
  {
    name: "GWY Fellowship 2.0 → DoraHacks 2.0",
    short: "GWY",
    Icon: Globe,
    learned: "Building with a global team under real hackathon pressure.",
    role: "Fellow · team Gradient Gang",
    when: "Aug 2026",
    what: "A month-long global fellowship for women in AI, across 30+ countries. Through it, my team built auraCheck at DoraHacks 2.0 (500 teams selected from 6,000+ applications). I worked on the FastAPI + CrewAI engine behind the five-agent interview panel.",
    result: "Top 100 most active fellows, out of 30+ countries.",
    stats: [
      ["Top 100", "most active fellows"],
      ["30+", "countries"],
      ["Top 50", "DoraHacks 2.0"],
    ],
    visual: "fellowship",
  },
  {
    name: "AuratTech AI Engineering Fellowship",
    short: "AT",
    Icon: Scale,
    learned: "Turning dense legal text into something an AI can actually use.",
    role: "Frontend + legal text pipeline",
    when: "Jun – Sep 2026",
    what: paklaw.what ?? "",
    result: "1st in cluster with PakLawAI.",
    stats: [
      ["1st", "in cluster"],
      ["5", "teammates"],
    ],
    visual: "paklaw",
  },
  {
    name: "Saylani Mass IT Training",
    short: "SMIT",
    Icon: Trophy,
    learned: "Owning one portal end to end inside a much bigger system.",
    role: "Sub Admin portal, TITAN",
    when: "Aug 2026",
    what: titan.what ?? "",
    result: "1st place, Batch 1, Project Excellence Award.",
    stats: [
      ["1st", "in Batch 1"],
      ["5", "portals"],
      ["6", "teammates"],
    ],
    visual: "titan",
  },
  {
    name: "USAII Global AI Hackathon 2026",
    short: "USAII",
    Icon: HeartHandshake,
    learned: "Designing for people who aren't developers.",
    role: "Frontend, team of 2",
    when: "2026",
    what: elder.what ?? "",
    result: "Round 2 of 324 teams with ElderBridge.",
    stats: [
      ["324", "teams"],
      ["R2", "reached"],
    ],
    visual: "elder",
  },
  {
    name: "EdTech4D",
    short: "E4D",
    Icon: Briefcase,
    learned: "Leading a delivery cycle, not only writing the code.",
    role: "Intern, led one delivery cycle",
    when: "Jul – Aug 2026",
    what: jss.role ?? "",
    result: "Top 5 portfolio in the cohort.",
    stats: [
      ["Top 5", "in cohort"],
      ["2", "pages rebuilt"],
    ],
    visual: "jss",
  },
  {
    name: "Dev Weekends",
    short: "DW",
    Icon: Code2,
    learned: "Small daily practice beats one big weekend sprint.",
    role: "AI Engineering mentee",
    when: "Jun – Aug 2026",
    what: "Built full-stack projects with React, Node.js, Express and MongoDB under mentor guidance, and practised data structures and algorithms on LeetCode.",
    stats: [["3", "months"]],
    visual: "devweekends",
  },
];

/* ---------- Now ---------- */
export const terminal: [string, string][] = [
  ["Contributing", "Open source via WoCS 2026 · 1 PR merged, more in progress"],
  ["Building", "A product from idea to launch in nexFellow (Cohort 1)"],
  ["Learning", "Machine learning with Python"],
  ["Practicing", "Data structures and algorithms in Java, every day"],
];
export const followRepos = [
  { repo: "ai-ml-learning-journey", line: "Python and machine learning, one notebook at a time" },
  { repo: "dsa-in-java", line: "One data structures problem a day, in Java" },
];

/* ---------- Tools and certificates ---------- */
export const toolsBuild = [
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
export const toolsLearn = ["Python", "pandas", "NumPy", "scikit-learn", "SQL"];
/** "Name (Issuer)". Entries without an issuer in brackets are shown as DataCamp. */
export const certificates = [
  "AI Engineer for Developers Associate (DataCamp)",
  "Generative AI Training Cohort 3, Top Performer (HEC Pakistan)",
  "Code in Place 2026 (Stanford)",
  "5-Day AI Agents Intensive (Kaggle)",
  "Azure AI and Azure OpenAI Basics (Microsoft)",
  "AI Fundamentals (IBM)",
  "Generative AI and Responsible AI (Google Cloud)",
  "DataCamp courses on embeddings, prompt engineering, LLMOps and Hugging Face",
];

/* ---------- Honest bits ---------- */
export const unfinished = [
  "redesigned this portfolio 5 times before shipping it once.",
  "planned a whole certificate sprint for my community. never launched it.",
  "skipped the 24-hour AI film challenge. ran out of time.",
];
export const letter = [
  "Dear Kaneeza,",
  "By now I hope you've shipped an ML model that real people use, not just a notebook.",
  "I hope the AWS group at Sukkur IBA runs fine without you in the room.",
  "I hope you still solve one DSA problem a day, even on the days you don't feel like it.",
  "And I hope you finally stopped rebuilding this portfolio.",
  "If you haven't done all of it, that's okay. Just don't stop.",
];

/* ---------- Payoff stats ("one year later") ---------- */
export type Stat = {
  /** "repos" is replaced by the live GitHub count. */
  id?: "repos";
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  Icon: LucideIcon;
};
export const payoffStats: Stat[] = [
  { id: "repos", to: 50, label: "GitHub repositories", Icon: Github },
  { to: 50, prefix: "Top ", label: "of 500 teams, DoraHacks", Icon: Trophy },
  { to: 32, prefix: "#", label: "on Product Hunt, launch day", Icon: Rocket },
  { to: 800, prefix: "$", label: "in hackathon rewards", Icon: Sparkles },
  { to: 30, suffix: "+", label: "countries in my fellowship", Icon: Globe },
  { to: certificates.length, label: "certificates and courses", Icon: Award },
];

export const marquee = [
  "full-stack",
  "applied AI",
  "open source",
  "community",
  "sukkur",
  "DSA daily",
  "learning in public",
];
