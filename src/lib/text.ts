import type { Block, Post } from "./types";

/** URL-safe id/slug from a heading or title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Rough words contained in a post body (for reading time). */
function bodyWordCount(body: Block[]): number {
  let words = 0;
  const count = (s?: string) => {
    if (s) words += s.split(/\s+/).filter(Boolean).length;
  };
  for (const block of body) {
    switch (block._type) {
      case "heading":
      case "paragraph":
      case "editorNote":
      case "quickVerdict":
        count(block.text);
        break;
      case "list":
        block.items.forEach(count);
        break;
      case "callout":
        count(block.text);
        break;
      case "howWeChose":
        count(block.text);
        block.items?.forEach(count);
        break;
      case "productCard":
        count(block.product.summary);
        block.product.pros?.forEach(count);
        block.product.cons?.forEach(count);
        break;
      case "comparisonTable":
        block.rows.forEach((r) => r.forEach(count));
        break;
      case "prosCons":
        block.pros.forEach(count);
        block.cons.forEach(count);
        break;
    }
  }
  return words;
}

export function readingTime(post: Pick<Post, "body" | "faqs">): number {
  const words =
    bodyWordCount(post.body) +
    (post.faqs?.reduce(
      (n, f) => n + f.question.split(/\s+/).length + f.answer.split(/\s+/).length,
      0,
    ) ?? 0);
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(iso + (iso.length === 10 ? "T12:00:00Z" : "")).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}

/**
 * Minimal inline-markdown → React-safe segments.
 * Supports **bold** and [label](href). Internal links (starting with /)
 * are rendered with next/link by the InlineText component.
 */
export type InlineSegment =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string };

export function parseInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ kind: "text", text: text.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ kind: "bold", text: match[1] });
    } else {
      segments.push({ kind: "link", text: match[2], href: match[3] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ kind: "text", text: text.slice(last) });
  return segments;
}

/** Strip inline markdown for plain-text contexts (meta tags, JSON-LD). */
export function plainText(text: string): string {
  return parseInline(text)
    .map((s) => s.text)
    .join("");
}
