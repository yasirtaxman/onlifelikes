import Image from "next/image";
import type { Block } from "@/lib/types";
import { slugify } from "@/lib/text";
import { InlineText } from "./InlineText";
import { ProductCard } from "./ProductCard";
import { ComparisonTable } from "./ComparisonTable";
import { AdSlot } from "./AdSlot";
import { CtaButton } from "./CtaButton";
import {
  Callout,
  EditorNote,
  HowWeChose,
  ProsCons,
  QuickVerdict,
} from "./boxes";

/** Renders the normalized block-based article body. One renderer for
 *  both local sample content and CMS content. */
export function PostBody({
  body,
  showAds = true,
}: {
  body: Block[];
  showAds?: boolean;
}) {
  return (
    <div className="prose-onl">
      {body.map((block, i) => {
        switch (block._type) {
          case "heading": {
            const id = slugify(block.text);
            return block.level === 2 ? (
              <h2
                key={i}
                id={id}
                className="mt-10 scroll-mt-24 text-2xl font-bold leading-snug text-pine"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                id={id}
                className="mt-8 scroll-mt-24 text-xl font-bold leading-snug text-pine"
              >
                {block.text}
              </h3>
            );
          }
          case "paragraph":
            return (
              <p key={i} className="mt-5">
                <InlineText text={block.text} />
              </p>
            );
          case "list": {
            const cls = "mt-5 space-y-2.5 pl-6";
            const items = block.items.map((item, j) => (
              <li key={j} className="leading-relaxed">
                <InlineText text={item} />
              </li>
            ));
            return block.ordered ? (
              <ol key={i} className={`${cls} list-decimal marker:font-semibold marker:text-forest`}>
                {items}
              </ol>
            ) : (
              <ul key={i} className={`${cls} list-disc marker:text-sage`}>
                {items}
              </ul>
            );
          }
          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-sage-light">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-pine/60">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <Callout key={i} variant={block.variant} title={block.title}>
                <InlineText text={block.text} />
              </Callout>
            );
          case "editorNote":
            return <EditorNote key={i} text={block.text} />;
          case "quickVerdict":
            return <QuickVerdict key={i} text={block.text} />;
          case "productCard":
            return (
              <ProductCard
                key={i}
                product={block.product}
                rank={block.rank}
                bestFor={block.bestFor}
              />
            );
          case "comparisonTable":
            return (
              <ComparisonTable
                key={i}
                caption={block.caption}
                columns={block.columns}
                rows={block.rows}
              />
            );
          case "prosCons":
            return (
              <ProsCons
                key={i}
                title={block.title}
                pros={block.pros}
                cons={block.cons}
              />
            );
          case "howWeChose":
            return <HowWeChose key={i} text={block.text} items={block.items} />;
          case "adSlot":
            return showAds ? <AdSlot key={i} position="in-article" /> : null;
          case "ctaButton":
            return (
              <div key={i} className="my-6">
                <CtaButton href={block.href}>{block.label}</CtaButton>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
