/**
 * Normalized content types used across the whole site.
 * Both the local sample content and the Sanity CMS adapter
 * produce these shapes, so every page renders from one model.
 */

export type ArticleType =
  | "how-to"
  | "buying-guide"
  | "comparison"
  | "best-under-budget"
  | "listicle"
  | "beginner-guide"
  | "checklist"
  | "seasonal"
  | "problem-solution"
  | "alternatives"
  | "informational";

export type ReviewMethod =
  | "tested"
  | "researched"
  | "expert-reviewed"
  | "updated";

export type PostStatus = "draft" | "review" | "published";

export interface Category {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  /** Longer SEO text shown near the bottom of the category page. */
  seoText?: string;
  image: string;
  imageAlt: string;
  faqs?: Faq[];
  relatedCategorySlugs?: string[];
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  expertise?: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Product {
  name: string;
  brand?: string;
  summary: string;
  bestFor?: string;
  image?: string;
  imageAlt?: string;
  /** Amazon ASIN — preferred, lets us build per-marketplace links. */
  amazonAsin?: string;
  /** Full fallback URL if no ASIN (tag is appended automatically). */
  amazonUrl?: string;
  pros?: string[];
  cons?: string[];
  keySpecs?: { label: string; value: string }[];
}

/** Discriminated union for article body sections — one renderer for all sources. */
export type Block =
  | { _type: "heading"; level: 2 | 3; text: string }
  | { _type: "paragraph"; text: string }
  | { _type: "list"; ordered?: boolean; items: string[] }
  | { _type: "image"; src: string; alt: string; caption?: string }
  | {
      _type: "callout";
      variant: "tip" | "note" | "warning";
      title?: string;
      text: string;
    }
  | { _type: "editorNote"; text: string }
  | { _type: "quickVerdict"; text: string }
  | { _type: "productCard"; product: Product; rank?: number; bestFor?: string }
  | {
      _type: "comparisonTable";
      caption?: string;
      columns: string[];
      rows: string[][];
    }
  | { _type: "prosCons"; title?: string; pros: string[]; cons: string[] }
  | { _type: "howWeChose"; text: string; items?: string[] }
  | { _type: "adSlot"; position: "in-article" }
  | { _type: "ctaButton"; label: string; href: string };

export interface Post {
  slug: string;
  title: string;
  /** SEO title — falls back to title when empty. */
  seoTitle?: string;
  metaDescription: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  excerpt: string;
  type: ArticleType;
  categorySlug: string;
  tags?: string[];
  authorSlug: string;
  status: PostStatus;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  image: string;
  imageAlt: string;
  /** Show the affiliate disclosure box at the top of the article. */
  hasAffiliateLinks: boolean;
  /** Allow AdSense slots on this article. */
  showAds: boolean;
  /** Emit FAQPage JSON-LD for the FAQs below. */
  faqSchema: boolean;
  reviewMethod: ReviewMethod;
  editorNote?: string;
  body: Block[];
  faqs?: Faq[];
  /** Slugs of hand-picked related posts (internal linking). */
  relatedSlugs?: string[];
  /** Featured on the homepage "Editor's picks" row. */
  editorsPick?: boolean;
}

/** Lightweight card shape used in lists, search and related-post rows. */
export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  categorySlug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  editorsPick?: boolean;
}
