import { useEffect, useState } from "react";
import { GH } from "@/content";
import {
  SNAPSHOT_COUNTS,
  SNAPSHOT_DATE,
  SNAPSHOT_LEVELS,
  SNAPSHOT_REPOS,
  SNAPSHOT_START,
} from "@/data/github-snapshot";

export type Day = { date: string; count: number; level: number };
export type GitHubData = {
  /** null while loading. */
  days: Day[] | null;
  total: number | null;
  repos: number;
  /** Date of the saved snapshot when the live request failed, otherwise null. */
  snapshot: string | null;
};

const TIMEOUT_MS = 8000;

/** Rebuilds the saved contribution snapshot into the same shape the live API returns. */
export function decodeSnapshot(): { days: Day[]; total: number } {
  const counts = SNAPSHOT_COUNTS.split(",").map(Number);
  const start = new Date(`${SNAPSHOT_START}T00:00:00Z`);
  const days = [...SNAPSHOT_LEVELS].map((level, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    return { date: d.toISOString().slice(0, 10), count: counts[i] ?? 0, level: Number(level) };
  });
  return { days, total: counts.reduce((a, b) => a + b, 0) };
}

function getJSON<T>(url: string): Promise<T> {
  return fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) }).then((r) =>
    r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error(`${r.status} ${url}`)),
  );
}

/**
 * Contribution history (github-contributions-api.jogruber.de) and public repo count
 * (GitHub REST API). Falls back to the saved snapshot if either request fails, so the
 * story never shows an empty or zeroed graph.
 */
export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    days: null,
    total: null,
    repos: SNAPSHOT_REPOS,
    snapshot: null,
  });

  useEffect(() => {
    let alive = true;
    getJSON<{ contributions: Day[]; total: Record<string, number> }>(
      `https://github-contributions-api.jogruber.de/v4/${GH}?y=last`,
    )
      .then((d) => {
        if (!d.contributions?.length) throw new Error("empty contributions");
        const total = Object.values(d.total).reduce((a, b) => a + b, 0);
        if (alive) setData((s) => ({ ...s, days: d.contributions, total }));
      })
      .catch(() => {
        const snap = decodeSnapshot();
        if (alive) setData((s) => ({ ...s, ...snap, snapshot: SNAPSHOT_DATE }));
      });

    getJSON<{ public_repos?: number }>(`https://api.github.com/users/${GH}`)
      .then((d) => {
        if (alive && typeof d.public_repos === "number") {
          const repos = d.public_repos;
          setData((s) => ({ ...s, repos }));
        }
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  return data;
}

export function useSukkurTemp() {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    getJSON<{ current?: { temperature_2m?: number } }>(
      "https://api.open-meteo.com/v1/forecast?latitude=27.7052&longitude=68.8574&current=temperature_2m",
    )
      .then((d) => {
        const v = d.current?.temperature_2m;
        if (typeof v === "number") setT(Math.round(v));
      })
      .catch(() => setT(null));
  }, []);
  return t;
}
