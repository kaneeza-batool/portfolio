import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";
import { CV_URL, EMAIL } from "@/content";
import { SNAPSHOT_COUNTS } from "@/data/github-snapshot";

const Page = Route.options.component as () => React.JSX.Element;

describe("portfolio page", () => {
  // Simulate every live API being down, so the page has to rely on its fallbacks.
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("offline"))),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the story, the work and the contact section", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: /supposed to be one homework assignment/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /One year later/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /built so far/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  it("links the resume from the nav and offers a CV download", () => {
    render(<Page />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav.querySelector(`a[href="${CV_URL}"]`)?.textContent).toMatch(/Resume/);
    const download = screen.getByRole("link", { name: /Download CV/i });
    expect(download).toHaveAttribute("href", CV_URL);
    expect(download).toHaveAttribute("download");
  });

  it("links each compact story project to its full card in All work", () => {
    const { container } = render(<Page />);
    const links = [...container.querySelectorAll<HTMLAnchorElement>('#story a[href^="#project-"]')];
    expect(links.length).toBe(5);
    for (const a of links) {
      const card = container.querySelector(a.getAttribute("href")!);
      expect(card?.closest("#work")).not.toBeNull();
    }
  });

  it("describes the 3D skyline for screen readers", async () => {
    render(<Page />);
    const total = SNAPSHOT_COUNTS.split(",").reduce((a, b) => a + Number(b), 0);
    await waitFor(() =>
      expect(
        screen.getByRole("img", { name: new RegExp(`3D skyline.*${total} contributions`) }),
      ).toBeInTheDocument(),
    );
  });

  it("falls back to the saved GitHub snapshot when the live API fails", async () => {
    render(<Page />);
    const total = SNAPSHOT_COUNTS.split(",").reduce((a, b) => a + Number(b), 0);
    await waitFor(() =>
      expect(screen.getAllByText(new RegExp(`of ${total} contributions`)).length).toBeGreaterThan(
        0,
      ),
    );
    expect(screen.queryByText(/of 0 contributions/)).not.toBeInTheDocument();
  });
});
