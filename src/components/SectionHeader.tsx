import Link from "next/link";

/** Editorial section header: small eyebrow label, title, rule line,
 *  and an optional "view all" link — used across the homepage and
 *  category pages for a consistent magazine-style hierarchy. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  href,
  linkLabel = "View all",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 border-b-2 border-line pb-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-second">
        {eyebrow}
      </p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="text-sm font-semibold text-brand hover:text-brand-dark hover:underline"
          >
            {linkLabel} →
          </Link>
        )}
      </div>
      {intro && <p className="mt-1.5 max-w-2xl text-sm text-ink/60">{intro}</p>}
    </div>
  );
}
