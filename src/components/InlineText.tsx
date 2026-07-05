import Link from "next/link";
import { parseInline } from "@/lib/text";

/** Renders paragraph text with **bold** and [link](href) support.
 *  Internal links use next/link; external links open safely in a new tab. */
export function InlineText({ text }: { text: string }) {
  const segments = parseInline(text);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === "bold") return <strong key={i}>{seg.text}</strong>;
        if (seg.kind === "link") {
          if (seg.href.startsWith("/")) {
            return (
              <Link key={i} href={seg.href}>
                {seg.text}
              </Link>
            );
          }
          const isAmazon = seg.href.includes("amazon.");
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel={isAmazon ? "nofollow sponsored noopener" : "noopener noreferrer"}
            >
              {seg.text}
            </a>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}
