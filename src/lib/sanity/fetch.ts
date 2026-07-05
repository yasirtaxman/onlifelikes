/**
 * Sanity → normalized Post adapter.
 * When the CMS is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set), posts
 * published in the Studio are fetched here and mapped to the same Post
 * shape the local sample content uses — so every page renders identically
 * regardless of source.
 */

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { Block, Faq, Post, Product } from "../types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const sanityConfigured = Boolean(projectId);

const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

function imageUrl(source: unknown): string {
  if (!builder || !source) return "/images/og-default.svg";
  try {
    return builder.image(source as never).width(1200).fit("max").url();
  } catch {
    return "/images/og-default.svg";
  }
}

/* ── Portable Text → Block[] ─────────────────────────────── */

interface PTSpan {
  _type: "span";
  text: string;
  marks?: string[];
}
interface PTBlock {
  _type: string;
  style?: string;
  listItem?: string;
  children?: PTSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  [key: string]: unknown;
}

function spanToInline(span: PTSpan, markDefs: PTBlock["markDefs"]): string {
  let text = span.text;
  for (const mark of span.marks ?? []) {
    if (mark === "strong") text = `**${text}**`;
    const def = markDefs?.find((d) => d._key === mark);
    if (def?._type === "link" && def.href) text = `[${text}](${def.href})`;
  }
  return text;
}

function blockText(block: PTBlock): string {
  return (block.children ?? [])
    .map((c) => spanToInline(c, block.markDefs))
    .join("");
}

function mapProduct(raw: Record<string, unknown> | undefined): Product {
  const r = raw ?? {};
  return {
    name: (r.name as string) || "Untitled product",
    brand: r.brand as string | undefined,
    summary: (r.summary as string) || "",
    bestFor: r.bestFor as string | undefined,
    image: r.image ? imageUrl(r.image) : undefined,
    imageAlt: r.imageAlt as string | undefined,
    amazonAsin: r.amazonAsin as string | undefined,
    amazonUrl: r.amazonUrl as string | undefined,
    pros: (r.pros as string[]) || undefined,
    cons: (r.cons as string[]) || undefined,
  };
}

function mapBody(raw: PTBlock[] | undefined): Block[] {
  if (!raw) return [];
  const blocks: Block[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (listBuffer) {
      blocks.push({
        _type: "list",
        ordered: listBuffer.ordered,
        items: listBuffer.items,
      });
      listBuffer = null;
    }
  };

  for (const b of raw) {
    if (b._type === "block") {
      if (b.listItem) {
        const ordered = b.listItem === "number";
        if (!listBuffer || listBuffer.ordered !== ordered) {
          flushList();
          listBuffer = { ordered, items: [] };
        }
        listBuffer.items.push(blockText(b));
        continue;
      }
      flushList();
      const text = blockText(b);
      if (!text.trim()) continue;
      if (b.style === "h2") blocks.push({ _type: "heading", level: 2, text });
      else if (b.style === "h3") blocks.push({ _type: "heading", level: 3, text });
      else blocks.push({ _type: "paragraph", text });
      continue;
    }
    flushList();
    switch (b._type) {
      case "bodyImage":
        blocks.push({
          _type: "image",
          src: imageUrl(b.asset ? b : (b.image as unknown)),
          alt: (b.alt as string) || "",
          caption: b.caption as string | undefined,
        });
        break;
      case "callout":
        blocks.push({
          _type: "callout",
          variant: ((b.variant as string) || "note") as "tip" | "note" | "warning",
          title: b.title as string | undefined,
          text: (b.text as string) || "",
        });
        break;
      case "editorNote":
        blocks.push({ _type: "editorNote", text: (b.text as string) || "" });
        break;
      case "quickVerdict":
        blocks.push({ _type: "quickVerdict", text: (b.text as string) || "" });
        break;
      case "productCard":
        blocks.push({
          _type: "productCard",
          product: mapProduct(b.product as Record<string, unknown>),
          rank: b.rank as number | undefined,
          bestFor: b.bestFor as string | undefined,
        });
        break;
      case "comparisonTable": {
        const rows = ((b.rows as { cells?: string[] }[]) || []).map(
          (r) => r.cells ?? [],
        );
        blocks.push({
          _type: "comparisonTable",
          caption: b.caption as string | undefined,
          columns: (b.columns as string[]) || [],
          rows,
        });
        break;
      }
      case "prosCons":
        blocks.push({
          _type: "prosCons",
          title: b.title as string | undefined,
          pros: (b.pros as string[]) || [],
          cons: (b.cons as string[]) || [],
        });
        break;
      case "howWeChose":
        blocks.push({
          _type: "howWeChose",
          text: (b.text as string) || "",
          items: (b.items as string[]) || undefined,
        });
        break;
      case "adSlot":
        blocks.push({ _type: "adSlot", position: "in-article" });
        break;
      case "ctaButton":
        blocks.push({
          _type: "ctaButton",
          label: (b.label as string) || "Learn more",
          href: (b.href as string) || "/",
        });
        break;
    }
  }
  flushList();
  return blocks;
}

/* ── Query + mapping ─────────────────────────────────────── */

const POSTS_QUERY = `*[_type == "post" && status == "published"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  seoTitle,
  metaDescription,
  focusKeyword,
  secondaryKeywords,
  canonicalUrl,
  excerpt,
  articleType,
  "categorySlug": category->slug.current,
  tags,
  "authorSlug": author->slug.current,
  status,
  publishedAt,
  updatedAt,
  featuredImage,
  imageAlt,
  hasAffiliateLinks,
  showAds,
  faqSchema,
  reviewMethod,
  editorNote,
  editorsPick,
  body[]{
    ...,
    product->{name, brand, summary, bestFor, image, imageAlt, amazonAsin, amazonUrl, pros, cons}
  },
  faqs[]{question, answer},
  "relatedSlugs": relatedPosts[]->slug.current
}`;

interface SanityPostRaw {
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  excerpt?: string;
  articleType?: string;
  categorySlug?: string;
  tags?: string[];
  authorSlug?: string;
  status?: string;
  publishedAt?: string;
  updatedAt?: string;
  featuredImage?: unknown;
  imageAlt?: string;
  hasAffiliateLinks?: boolean;
  showAds?: boolean;
  faqSchema?: boolean;
  reviewMethod?: string;
  editorNote?: string;
  editorsPick?: boolean;
  body?: PTBlock[];
  faqs?: Faq[];
  relatedSlugs?: string[];
}

export async function fetchSanityPosts(): Promise<Post[]> {
  if (!client) return [];
  const raw = await client.fetch<SanityPostRaw[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 300 } },
  );
  return raw
    .filter((r) => r.slug && r.title)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      seoTitle: r.seoTitle,
      metaDescription: r.metaDescription || r.excerpt || r.title,
      focusKeyword: r.focusKeyword,
      secondaryKeywords: r.secondaryKeywords,
      canonicalUrl: r.canonicalUrl,
      excerpt: r.excerpt || r.metaDescription || "",
      type: (r.articleType as Post["type"]) || "informational",
      categorySlug: r.categorySlug || "home-living",
      tags: r.tags,
      authorSlug: r.authorSlug || "maya-collins",
      status: (r.status as Post["status"]) || "published",
      publishedAt: (r.publishedAt || "").slice(0, 10),
      updatedAt: r.updatedAt ? r.updatedAt.slice(0, 10) : undefined,
      image: imageUrl(r.featuredImage),
      imageAlt: r.imageAlt || r.title,
      hasAffiliateLinks: r.hasAffiliateLinks ?? false,
      showAds: r.showAds ?? true,
      faqSchema: r.faqSchema ?? true,
      reviewMethod: (r.reviewMethod as Post["reviewMethod"]) || "researched",
      editorNote: r.editorNote,
      editorsPick: r.editorsPick,
      body: mapBody(r.body),
      faqs: r.faqs,
      relatedSlugs: r.relatedSlugs?.filter(Boolean),
    }));
}
