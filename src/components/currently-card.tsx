/* ---------- Edit the "Currently" note here ---------- */
const CURRENTLY = {
  title: "Currently",
  rows: [
    { emoji: "☕", emojiLabel: "chai cup", label: "Chai today", value: "3" },
    { emoji: "🎧", emojiLabel: "headphones", label: "Now playing", value: "Coke Studio" },
    { emoji: "🧠", emojiLabel: "brain", label: "When stuck", value: "silence" },
  ],
};

/** A small sticky note, held on by masking tape, for the hero's status column. */
export function CurrentlyCard() {
  return (
    <div className="currently-note">
      <p className="font-hand text-xl leading-none font-bold text-primary-hover md:text-2xl">
        {CURRENTLY.title}
      </p>
      <ul className="mt-2 space-y-1 text-sm md:mt-3 md:space-y-1.5">
        {CURRENTLY.rows.map((r) => (
          <li key={r.label} className="flex items-baseline gap-2">
            <span role="img" aria-label={r.emojiLabel} className="w-5 shrink-0 text-base">
              {r.emoji}
            </span>
            <span className="text-muted-foreground">{r.label}:</span>
            <span className="font-medium text-foreground">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
