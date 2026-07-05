import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/** Shared shell for policy and info pages. */
export function StaticPage({
  title,
  intro,
  path,
  children,
}: {
  title: string;
  intro?: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-pine sm:text-4xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 text-lg leading-relaxed text-pine/70">{intro}</p>
      )}
      <div className="static-body mt-8 space-y-5 leading-relaxed text-pine/85 [&_a]:font-medium [&_a]:text-forest [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pine [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-pine [&_li]:ml-6 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </div>
  );
}
