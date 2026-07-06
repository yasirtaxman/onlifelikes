"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export function Studio() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24">
        <h1 className="text-2xl font-bold text-ink">
          Content Studio isn&apos;t connected yet
        </h1>
        <p className="mt-4 leading-relaxed text-ink/80">
          To enable the CMS: create a free project at{" "}
          <a
            href="https://www.sanity.io/manage"
            className="font-medium text-brand underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            sanity.io/manage
          </a>
          , then add <code className="rounded bg-mist px-1.5 py-0.5 text-sm">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
          to your <code className="rounded bg-mist px-1.5 py-0.5 text-sm">.env.local</code> file (and to Vercel).
          Full steps are in the README under &quot;CMS setup&quot;.
        </p>
        <p className="mt-4 text-sm text-ink/60">
          Until then, the site serves its built-in sample content.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
