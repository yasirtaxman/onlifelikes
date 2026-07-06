import type { ReactNode } from "react";
import { InlineText } from "./InlineText";

/* ── Callout box (tip / note / warning) ───────────────────── */

const calloutStyles = {
  tip: { border: "border-brand", bg: "bg-second-tint", label: "Tip" },
  note: { border: "border-second", bg: "bg-mist", label: "Note" },
  warning: { border: "border-accent-deep", bg: "bg-accent-tint", label: "Heads up" },
} as const;

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const s = calloutStyles[variant];
  return (
    <aside className={`my-6 rounded-r-xl border-l-4 ${s.border} ${s.bg} px-5 py-4`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
        {title || s.label}
      </p>
      <div className="mt-1 text-[15px] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

/* ── Quick verdict box ─────────────────────────────────────── */

export function QuickVerdict({ text }: { text: string }) {
  return (
    <aside className="my-6 rounded-2xl border-2 border-second bg-second-tint p-6">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-dark">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Quick verdict
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink">
        <InlineText text={text} />
      </p>
    </aside>
  );
}

/* ── Editor's note box ─────────────────────────────────────── */

export function EditorNote({ text }: { text: string }) {
  return (
    <aside className="my-6 rounded-xl border border-line bg-mist px-5 py-4 text-sm leading-relaxed text-ink/80">
      <span className="font-semibold text-ink">Editor&apos;s note: </span>
      <InlineText text={text} />
    </aside>
  );
}

/* ── Update notice ─────────────────────────────────────────── */

export function UpdateNotice({ updatedAt }: { updatedAt: string }) {
  return (
    <p className="my-4 inline-flex items-center gap-2 rounded-full bg-second-tint px-4 py-1.5 text-xs font-medium text-brand-dark">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
      Updated {updatedAt} — reviewed for accuracy and availability
    </p>
  );
}

/* ── Best-for label ────────────────────────────────────────── */

export function BestForLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink-dark">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 6.26L21 9.27l-5 4.6L17.2 21 12 17.5 6.8 21 8 13.87l-5-4.6 6.1-1.01L12 2z" />
      </svg>
      Best for: {text}
    </span>
  );
}

/* ── Pros & cons box ───────────────────────────────────────── */

export function ProsCons({
  title,
  pros,
  cons,
}: {
  title?: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line">
      {title && (
        <p className="border-b border-line bg-mist px-5 py-3 font-semibold text-ink">
          {title} — pros &amp; cons
        </p>
      )}
      <div className="grid sm:grid-cols-2">
        <div className="p-5">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Pros</p>
          <ul className="mt-3 space-y-2">
            {pros.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-0.5 font-bold text-brand">✓</span>
                <InlineText text={p} />
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line bg-canvas p-5 sm:border-l sm:border-t-0">
          <p className="text-sm font-bold uppercase tracking-wide text-ink/60">Cons</p>
          <ul className="mt-3 space-y-2">
            {cons.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink/80">
                <span aria-hidden="true" className="mt-0.5 font-bold text-ink/50">✕</span>
                <InlineText text={c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── "How we chose" section ────────────────────────────────── */

export function HowWeChose({ text, items }: { text: string; items?: string[] }) {
  return (
    <section className="my-8 rounded-2xl border border-line bg-mist p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 12l2 2 4-5" stroke="#0C5E69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="#0C5E69" strokeWidth="2" />
        </svg>
        How we chose
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
        <InlineText text={text} />
      </p>
      {items && items.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span aria-hidden="true" className="text-brand">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
