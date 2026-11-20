import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

/** Catch-all 404: same cream paper and taped polaroid as the "About me" section. */
function NotFoundComponent() {
  return (
    <main className="about-paper flex min-h-screen items-center justify-center px-5 py-16">
      {/* React 19 lifts these into <head>: a real title, and keep 404s out of search results. */}
      <title>Page not found | Kaneeza Batool</title>
      <meta name="robots" content="noindex" />
      <div
        className="about-card w-full max-w-md text-center"
        style={{ ["--rot" as string]: "-2deg" }}
      >
        <div className="about-photo">
          <span role="img" aria-label="loudly crying face" className="text-[96px]">
            😭
          </span>
        </div>
        <p className="mt-5 font-mono text-xs tracking-wider text-muted-foreground uppercase">404</p>
        <h1 className="mt-2 font-display text-3xl leading-tight font-bold text-foreground">
          I don't know where this page went.
        </h1>
        <p className="mt-3 font-hand text-3xl text-primary">Let's figure it out.</p>
        <Link
          to="/"
          className="btn-3d mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f9f3ec" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      // Live data sources: open the connections early.
      {
        rel: "preconnect",
        href: "https://github-contributions-api.jogruber.de",
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://api.github.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-center" />
    </>
  );
}
