import { describe, expect, it } from "vitest";
import { allProjects, chapters, orgs, paklaw, terminal, titan } from "@/content";
import { decodeSnapshot } from "@/lib/live-data";
import { SNAPSHOT_COUNTS, SNAPSHOT_LEVELS } from "@/data/github-snapshot";

describe("content", () => {
  it("has unique project titles and organisation names", () => {
    const titles = allProjects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
    const names = orgs.map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("no longer mentions the retired Instagram handle", () => {
    const all = JSON.stringify({ allProjects, chapters, orgs, terminal });
    expect(all).not.toContain("@kaneeza.builds");
  });

  it("keeps the facts that appear in more than one place in sync", () => {
    expect(titan.role).toBe("I built the campus-scoped Sub Admin portal from scratch.");
    expect(titan.what).toMatch(/and a RAG chatbot\.$/);
    expect(paklaw.result).toBe(
      "AuratTech AI Engineering Fellowship (Jun to Sep 2026), 1st in cluster.",
    );
    expect(chapters[2]?.date).toBe("Jun – Sep 2026");
    expect(orgs.find((o) => o.short === "AT")?.when).toBe("Jun – Sep 2026");
  });

  it("lists WoCS first, with a link to the merged PR", () => {
    expect(orgs[0]?.name).toBe("WoCS 2026");
    expect(orgs[0]?.badge?.href).toMatch(/\/pull\/53$/);
  });
});

describe("GitHub snapshot fallback", () => {
  it("decodes one day per level digit, with matching counts", () => {
    const { days, total } = decodeSnapshot();
    expect(days).toHaveLength(SNAPSHOT_LEVELS.length);
    expect(SNAPSHOT_COUNTS.split(",")).toHaveLength(SNAPSHOT_LEVELS.length);
    expect(total).toBeGreaterThan(0);
    expect(days.every((d) => d.level >= 0 && d.level <= 4)).toBe(true);
  });

  it("produces consecutive dates", () => {
    const { days } = decodeSnapshot();
    const t0 = Date.parse(days[0]!.date);
    const t1 = Date.parse(days[1]!.date);
    expect(t1 - t0).toBe(86_400_000);
  });
});
