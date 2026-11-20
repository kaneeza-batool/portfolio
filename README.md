<div align="center">

# Kaneeza Batool · Portfolio

**A scroll-driven story portfolio: from an empty GitHub profile to a year of shipped projects.**

Full-stack (MERN) developer moving into applied AI · CS student at Sukkur IBA, Pakistan

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-SSR-FF4154?style=flat)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://kaneeza-batool-portfolio.vercel.app/)

### [🌐 kaneeza-batool-portfolio.vercel.app](https://kaneeza-batool-portfolio.vercel.app/)

[LinkedIn](https://www.linkedin.com/in/kaneeza-batool) · [GitHub](https://github.com/kaneeza-batool) · [LeetCode](https://leetcode.com/u/kaneezabatool) · [Email](mailto:kaneezabatoolmemon@gmail.com)

<img src="docs/screenshots/hero.png" alt="Hero section: illustrated avatar in an arch frame, the headline 'It was supposed to be one homework assignment.' and an empty GitHub contribution graph" width="900" />

</div>

---

## The idea

Most portfolios open with their best numbers. This one opens with **zero**.

The hero shows an empty GitHub contribution graph from November 2025. As you scroll through four chapters, the same graph fills in, chapter by chapter. The page ends with a **"One year later"** section that shows the full graph and the stats. The story moves from homework, to shipping, to applied AI, to building a community, and the numbers only appear once they've been earned.

## Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/what-i-do.png" alt="Four cards: I build, I make AI do real work, I bring people along, I learn in public" /><br /><sub><b>What I do</b>: four cards, each with its own illustration</sub></td>
    <td width="50%"><img src="docs/screenshots/journey.png" alt="Journey section: a list of organisations as ink stamps beside a passport visa page with the selected one's details and stamp" /><br /><sub><b>Journey</b>: a passport, one stamped visa page per fellowship, hackathon or internship</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/about.png" alt="About me: 'Hi, I'm Kaneeza.' beside a chat window where a visitor asks questions and Kaneeza answers" /><br /><sub><b>About me</b>: the person behind the commits, as a chat</sub></td>
    <td width="50%"><img src="docs/screenshots/payoff.png" alt="One year later: the filled contribution graph and six stats" /><br /><sub><b>The payoff</b>: the same graph, filled, with live GitHub numbers</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/story.png" alt="Chapter 3 of the story with the auraCheck, PakLawAI and ElderBridge project cards" /><br /><sub><b>The story</b>: chapters with project cards and screen mockups</sub></td>
    <td width="50%"><img src="docs/screenshots/work.png" alt="All work: featured auraCheck card followed by a grid of projects with All, AI and Web filters" /><br /><sub><b>All work</b>: filter projects by All, AI or Web</sub></td>
  </tr>
</table>

<p align="center">
  <img src="docs/screenshots/mobile-hero.png" alt="Hero on a phone" width="240" />
  &nbsp;&nbsp;
  <img src="docs/screenshots/mobile-payoff.png" alt="Payoff section on a phone" width="240" />
  <br /><sub>Fully responsive. The hero and payoff sections on a 390px phone screen.</sub>
</p>

<p align="center">
  <img src="docs/screenshots/contact.png" alt="Contact section: Let's build what's next, together." width="900" />
</p>

## Features

- **Scroll-driven storytelling.** The contribution graph fills in as each chapter scrolls into view: a sticky sidebar on desktop, a sticky bar on mobile. It's drawn on a `<canvas>`, so 365 days cost one element instead of 365.
- **Live data, no backend.**
  - Contribution history from the [GitHub Contributions API](https://github-contributions-api.jogruber.de).
  - Public repository count from the [GitHub REST API](https://docs.github.com/en/rest/users/users#get-a-user).
  - Current temperature in Sukkur from [Open-Meteo](https://open-meteo.com).
  - Every request times out after 8 seconds. If GitHub data can't load, the page falls back to a saved snapshot, so the "one year later" payoff never shows an empty graph.
- **Illustrated project screens.** Each project card shows a hand-built UI mockup made with React and Tailwind (agents and scorecard for auraCheck, portals and QR ID card for TITAN, the merged PR for WoCS, and so on). They're code, not images, so they stay sharp at any size.
- **Generated world map.** The dotted map was generated once with [`dotted-map`](https://www.npmjs.com/package/dotted-map) and saved as a single static SVG (2 KB compressed). Only the twinkling dots and the Sukkur pin are live elements.
- **Small details.** A "Currently" sticky note, passport ink stamps, an About-me chat, polaroids, keyboard-key tool chips, a rotating stamp, a letter to my future self, a scrapbook 404 page, and a hidden easter egg (click the avatar near the bottom of the page three times).
- **Accessible.** Lighthouse accessibility score of 100: AA contrast within the theme colors, a skip link, labelled links and controls, decorative mockups hidden from screen readers, and every animation turned off under `prefers-reduced-motion`.
- **Fast.** Self-hosted fonts, a WebP avatar, and looping animations that pause while their section is off screen. Lighthouse performance on desktop: 96.
- **Shareable.** A 1200×630 preview image, Open Graph and Twitter tags, a canonical URL, a sitemap, and schema.org `Person` data for search results.
- **Server-side rendering** with TanStack Start, deployed on Vercel.

## Tech stack

| Layer | Tools |
| --- | --- |
| Framework | React 19, TanStack Start (SSR) and TanStack Router (file-based routes) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4, Lightning CSS, custom design tokens in `oklch` |
| Typography | Fraunces (display), Inter (body), JetBrains Mono (code), Caveat (handwriting), self-hosted via Fontsource |
| Icons | lucide-react |
| Build | Vite 8 |
| Hosting | Vercel, built through Nitro (which also supports other hosts through presets) |
| Quality | ESLint, Prettier, Vitest and Testing Library |

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```sh
git clone https://github.com/kaneeza-batool/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:8080
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload on port 8080 |
| `npm run build` | Production build in `.output/` (targets Vercel when built on Vercel) |
| `npm run test` | Runs the test suite once with Vitest |
| `npm run lint` | Lints the project with ESLint |
| `npm run format` | Formats the codebase with Prettier |

## Deployment

The site is live at **[kaneeza-batool-portfolio.vercel.app](https://kaneeza-batool-portfolio.vercel.app/)** and deploys automatically from this repository on Vercel:

- **Every push to `main`** triggers a production deployment.
- **Pull requests** get their own preview URL.
- **No `vercel.json` is needed.** Nitro detects the Vercel build environment and outputs the right format, and Vercel's default settings (`npm install`, `npm run build`) work as they are.

To deploy your own copy, import the repo at [vercel.com/new](https://vercel.com/new) and keep the defaults.

To deploy somewhere else instead, set a [Nitro preset](https://nitro.build/deploy) when you build:

```sh
NITRO_PRESET=netlify npm run build      # or cloudflare-module, node-server, ...
```

To test a production build locally:

```sh
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs           # http://localhost:3000
```

## Project structure

```
src/
├── content.ts              # All text and data: projects, chapters, journey, stats
├── routes/
│   ├── __root.tsx          # HTML shell, meta, 404 and error pages
│   └── index.tsx           # The page: every section's layout
├── components/
│   ├── visuals.tsx         # Screen mockups, PR card, agent diagram, world map
│   └── ui/sonner.tsx       # Toast (used by the easter egg)
├── lib/
│   └── live-data.ts        # GitHub + weather fetching, with snapshot fallback
├── data/
│   └── github-snapshot.ts  # Saved contribution history (fallback only)
├── assets/                 # Avatar (WebP) and the static world-map SVG
├── test/                   # Vitest: routing, content rules, page render offline
├── styles.css              # Fonts, design tokens, textures and animations
└── server.ts               # SSR entry with error handling
public/                     # CV, favicon, share image, robots.txt, sitemap.xml
docs/screenshots/           # Images used in this README
```

## Editing content

All content lives in [`src/content.ts`](src/content.ts), so updating the site doesn't require touching any layout code.

| To change… | Edit in `content.ts` |
| --- | --- |
| Projects | `titan`, `aura`, `paklaw`, `elder`, `jss`, `dexo` (and `allProjects` for the order) |
| Story chapters | `chapters`, plus `aws`, `gwy` and `communityRoles` for chapter 4 |
| Journey panels | `orgs` (the first one is selected by default) |
| "Now" terminal | `terminal`, `followRepos` |
| Payoff stats | `payoffStats` |
| Tools and certificates | `toolsBuild`, `toolsLearn`, `certificates` |
| Links, email, CV | `LINKS`, `EMAIL`, `CV_URL` |

**Updating the CV:** replace `public/Kaneeza_Batool_CV.pdf` (keep the file name, or update `CV_URL`).

**Refreshing the GitHub snapshot:** the live graph never needs this. The snapshot is only the fallback for when the API is down. To update it, regenerate `src/data/github-snapshot.ts` from `https://github-contributions-api.jogruber.de/v4/kaneeza-batool?y=last` (levels as one digit per day, counts comma-separated).

Colors are defined once as tokens in [`src/styles.css`](src/styles.css): a cream background, rose `--primary` (and the darker `--primary-hover`, used for small text so it meets contrast rules), deep `--ink` and `--gold`.

---

<div align="center">
<sub>Made in Sukkur, powered by chai. © 2026 Kaneeza Batool</sub>
</div>
