export function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="my-6 flex flex-wrap gap-2" aria-label="Article tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-mist px-3 py-1 text-xs font-medium text-ink/70"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
