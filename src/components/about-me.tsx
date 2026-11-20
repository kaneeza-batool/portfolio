import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import avatar from "@/assets/kaneeza-avatar.webp";
import { unfinished } from "@/content";

/* ---------- Content: edit the chat, intro and closing line here ---------- */

export type ChatFact = {
  /** What the visitor asks. */
  q: string;
  emoji: string;
  /** Read out by screen readers in place of the emoji. */
  emojiLabel: string;
  title: string;
  text: string;
  /** Optional bullet list under the text. */
  list?: string[];
};

const chat: ChatFact[] = [
  {
    q: "So what's your tech stack?",
    emoji: "☕",
    emojiLabel: "chai cup",
    title: "Chai is my real tech stack.",
    text: "Frameworks change. The chai stays. It's honestly the most consistent part of my developer journey.",
  },
  {
    q: "Music while you code?",
    emoji: "🎧",
    emojiLabel: "headphones",
    title: "My coding playlist has three modes.",
    text: "Coke Studio when it's flowing, soft music when it's slow, and total silence when I'm stuck. If it's quiet, don't talk to me.",
  },
  {
    q: "Most-used emoji?",
    emoji: "😭",
    emojiLabel: "loudly crying face",
    title: "My most-used emoji is 😭.",
    text: "I use it for bugs, deadlines, wins and everything in between.",
  },
  {
    q: "How many fellowships is too many?",
    emoji: "🎟️",
    emojiLabel: "ticket",
    title: "I collect fellowships.",
    text: "My friends say I join every fellowship that exists. They're not wrong. Every single one taught me something.",
  },
  {
    q: "Reading anything right now?",
    emoji: "📖",
    emojiLabel: "open book",
    title: "Currently reading Atomic Habits.",
    text: "Trying to turn “I'll start tomorrow” into “I started today.”",
  },
  {
    q: "Anything you didn't finish?",
    emoji: "🚧",
    emojiLabel: "work in progress",
    title: "Plenty.",
    text: "The wins are real. So are these:",
    // From `unfinished` in src/content.ts.
    list: unfinished,
  },
];

const INTRO =
  "I'm a CS student from Sukkur who says “I don't know, let's figure it out” more than anything else. That one sentence has taken me further than any plan.";

const CLOSING =
  "Professionally, I build with MERN and I'm growing into AI/ML. Personally, I'm still that girl with a cup of chai, figuring it out one bug at a time.";

/* ---------- Helpers ---------- */

/**
 * Plays the chat once it scrolls into view. Messages are only hidden ("armed") once
 * JavaScript runs, so without JS the whole conversation is simply visible.
 */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, state] as const;
}

function Squiggle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 24"
      className="ml-2 inline-block h-5 w-20 -translate-y-1 text-primary md:h-7 md:w-28"
    >
      <path
        d="M3 14c8-10 14 8 22 0s14 8 22 0 14 8 22 0 14 8 22 0 12 6 24-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Chat window ---------- */

function ChatWindow() {
  const [listRef, reveal] = useRevealOnce<HTMLOListElement>();
  return (
    <div className="chat-window">
      {/* Header */}
      <div className="flex items-center gap-3 bg-ink px-4 py-3 text-cream">
        <img
          src={avatar}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 rounded-full bg-ink object-cover ring-2 ring-primary"
        />
        <div className="min-w-0">
          <p className="font-display text-base leading-tight font-bold">Kaneeza</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-cream/70">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-g2" aria-hidden /> online ·
            figuring it out
          </p>
        </div>
      </div>

      {/* Messages */}
      {/* A fixed-height window that scrolls inside, like a real chat: it follows each
          new message as it pops in, and visitors can scroll back up. */}
      <ol
        ref={listRef}
        data-reveal={reveal}
        aria-label="A short chat with Kaneeza"
        tabIndex={0}
        onAnimationStart={(e) => {
          // Bring the message that just appeared into view (later ones are still hidden,
          // so don't jump to the very bottom).
          const box = e.currentTarget;
          const msg = e.target as HTMLElement;
          if (!msg.classList.contains("chat-msg")) return;
          const bottom = msg.offsetTop + msg.offsetHeight + 16;
          if (bottom > box.scrollTop + box.clientHeight)
            box.scrollTo({ top: bottom - box.clientHeight, behavior: "smooth" });
        }}
        className="chat-body relative max-h-[min(34rem,70vh)] space-y-3 overflow-y-auto overscroll-contain px-3 py-5 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-5"
      >
        {chat.map((m, i) => (
          <li key={m.q} className="space-y-2">
            <div className="chat-msg flex justify-start" style={{ ["--i" as string]: i * 2 }}>
              <p className="chat-bubble chat-in">
                <span className="sr-only">Visitor asks: </span>
                {m.q}
              </p>
            </div>
            <div className="chat-msg flex justify-end" style={{ ["--i" as string]: i * 2 + 1 }}>
              <div className="chat-bubble chat-out">
                <span className="sr-only">Kaneeza: </span>
                <p className="font-medium">
                  <span role="img" aria-label={m.emojiLabel} className="mr-1.5">
                    {m.emoji}
                  </span>
                  {m.title}
                </p>
                <p className="mt-1 text-primary-foreground/85">{m.text}</p>
                {m.list && (
                  <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-primary-foreground/85">
                    {m.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
        <li
          className="chat-msg flex justify-end"
          style={{ ["--i" as string]: chat.length * 2 }}
          aria-hidden
        >
          <span className="chat-bubble chat-out chat-typing">
            <span />
            <span />
            <span />
          </span>
        </li>
      </ol>

      {/* Message bar: a real way to keep the conversation going. */}
      <a
        href="#contact"
        className="group flex items-center gap-3 border-t border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-primary-hover"
      >
        <span className="flex-1 truncate">Say hi for real…</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
          <SendHorizontal className="h-4 w-4" aria-hidden />
        </span>
      </a>
    </div>
  );
}

/* ---------- Section ---------- */

export function AboutMe() {
  return (
    <section id="about" aria-labelledby="about-me-title" className="about-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="scroll-3d">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            About me
          </p>
          <h2
            id="about-me-title"
            className="extrude mt-3 font-display text-4xl leading-[1.05] font-bold md:text-6xl"
          >
            Hi, I'm{" "}
            <span className="font-hand text-5xl font-bold text-primary md:text-7xl">Kaneeza.</span>
            <Squiggle />
          </h2>
          <p className="mt-5 max-w-140 font-hand text-2xl leading-snug text-foreground md:text-[1.7rem]">
            {INTRO}
          </p>
          <p className="mt-8 max-w-140 border-l-2 border-dashed border-primary/50 pl-4 font-hand text-xl leading-snug text-muted-foreground md:text-2xl">
            {CLOSING}
          </p>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <ChatWindow />
        </div>
      </div>
    </section>
  );
}
