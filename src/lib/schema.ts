/**
 * JSON-LD structured data builders.
 * Emitted schemas: Organization, WebSite, Article, BreadcrumbList,
 * FAQPage (toggleable per post), ItemList for buying guides, Person
 * for authors, and CollectionPage for categories.
 *
 * We intentionally do NOT emit Review/AggregateRating schema for
 * research-based guides — rating markup is only compliant when it
 * reflects genuine evaluations, per our Product Review Policy.
 */

import { site } from "./site";
import { plainText } from "./text";
import type { Author, Category, Faq, Post } from "./types";
import { getAuthorBySlug, getCategoryBySlug } from "./content";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.svg`,
    slogan: site.tagline,
    email: site.email.contact,
    foundingDate: String(site.organization.foundingYear),
  };
}

export function webSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function personSchema(author: Author): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/authors/${author.slug}#person`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${site.url}/authors/${author.slug}`,
    worksFor: { "@id": `${site.url}/#organization` },
    knowsAbout: author.expertise,
  };
}

export function articleSchema(post: Post): JsonLd {
  const author = getAuthorBySlug(post.authorSlug);
  const category = getCategoryBySlug(post.categorySlug);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image.startsWith("http") ? post.image : `${site.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: `${site.url}/${post.slug}`,
    articleSection: category?.title,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `${site.url}/authors/${author.slug}`,
        }
      : undefined,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/** ItemList of recommended products for buying guides (compliant, no fake ratings). */
export function productItemListSchema(post: Post): JsonLd | null {
  const products = post.body.filter((b) => b._type === "productCard");
  if (products.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: post.title,
    numberOfItems: products.length,
    itemListElement: products.map((b, i) => ({
      "@type": "ListItem",
      position: b.rank ?? i + 1,
      item: {
        "@type": "Product",
        name: b.product.name,
        description: plainText(b.product.summary),
        brand: b.product.brand
          ? { "@type": "Brand", name: b.product.brand }
          : undefined,
      },
    })),
  };
}

export function collectionPageSchema(category: Category): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} — ${site.name}`,
    description: category.description,
    url: `${site.url}/${category.slug}`,
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/** Render helper: serialize one or more schema objects for a <script> tag. */
export function jsonLd(...schemas: (JsonLd | null)[]): string {
  const list = schemas.filter(Boolean);
  return JSON.stringify(list.length === 1 ? list[0] : list);
}
