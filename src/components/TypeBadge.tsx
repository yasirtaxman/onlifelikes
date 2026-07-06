import type { ArticleType } from "@/lib/types";

const labels: Partial<Record<ArticleType, string>> = {
  "buying-guide": "Buying Guide",
  comparison: "Comparison",
  "best-under-budget": "Budget Picks",
  "how-to": "How-To",
  checklist: "Checklist",
  seasonal: "Seasonal",
  "beginner-guide": "Beginner Guide",
};

export function TypeBadge({ type }: { type: ArticleType }) {
  const label = labels[type];
  if (!label) return null;
  return (
    <span className="rounded-full bg-second-tint px-2 py-0.5 text-[11px] font-medium text-brand-dark">
      {label}
    </span>
  );
}

/** Warm accent badge for homepage-featured articles. */
export function EditorsPickBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-ink-dark shadow-sm">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 6.26L21 9.27l-5 4.6L17.2 21 12 17.5 6.8 21 8 13.87l-5-4.6 6.1-1.01L12 2z" />
      </svg>
      Editor&apos;s Pick
    </span>
  );
}
