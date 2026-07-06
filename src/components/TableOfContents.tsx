import type { Block } from "@/lib/types";
import { slugify } from "@/lib/text";

/** Table of contents built from H2 headings in the article body. */
export function TableOfContents({ body }: { body: Block[] }) {
  const headings = body.filter(
    (b): b is Extract<Block, { _type: "heading" }> =>
      b._type === "heading" && b.level === 2,
  );
  if (headings.length < 3) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-2xl border border-line bg-mist/60 p-6"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-brand-dark">
        In this article
      </p>
      <ol className="mt-3 space-y-2 text-[15px]">
        {headings.map((h) => (
          <li key={h.text}>
            <a
              href={`#${slugify(h.text)}`}
              className="text-ink/80 transition-colors hover:text-brand hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
