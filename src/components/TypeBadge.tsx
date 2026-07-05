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
    <span className="rounded-full bg-sage-light px-2 py-0.5 text-[11px] font-medium text-forest-dark">
      {label}
    </span>
  );
}
