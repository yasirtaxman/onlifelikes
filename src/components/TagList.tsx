export function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="my-6 flex flex-wrap gap-2" aria-label="Article tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-beige bg-beige-light px-3 py-1 text-xs font-medium text-pine/70"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
