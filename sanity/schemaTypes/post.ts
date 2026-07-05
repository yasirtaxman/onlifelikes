import { defineArrayMember, defineField, defineType } from "sanity";
import type { ValidationContext } from "sanity";

/**
 * The main article document — covers blog posts, buying guides,
 * comparisons, best-under-budget articles, and how-to guides
 * (choose with "Article type").
 *
 * Editorial helpers: friendly, non-blocking warnings guide non-technical
 * editors toward complete, compliant articles (SEO fields, disclosure,
 * FAQs, internal links, freshness). Warnings never block publishing —
 * they appear as yellow notes next to the field.
 */

/* ── Helpers for the editorial warnings ─────────────────────── */

interface BodyItem {
  _type?: string;
  href?: string;
  markDefs?: { _type?: string; href?: string }[];
}

const GUIDE_TYPES = ["buying-guide", "best-under-budget", "alternatives"];

function asBody(value: unknown): BodyItem[] {
  return Array.isArray(value) ? (value as BodyItem[]) : [];
}

function docOf(context: ValidationContext): Record<string, unknown> {
  return (context.document ?? {}) as Record<string, unknown>;
}

/** All link URLs used anywhere in the body (text links + CTA buttons). */
function bodyLinks(body: BodyItem[]): string[] {
  const links: string[] = [];
  for (const block of body) {
    for (const def of block.markDefs ?? []) {
      if (def._type === "link" && def.href) links.push(def.href);
    }
    if (block._type === "ctaButtonBlock" && block.href) links.push(block.href);
  }
  return links;
}

/** Does the article contain product cards or links to Amazon? */
function hasProductContent(body: BodyItem[]): boolean {
  if (body.some((b) => b._type === "productCardBlock")) return true;
  return bodyLinks(body).some((href) => href.includes("amazon."));
}

/** Count of internal links: in-text "/slug" links + selected related posts. */
function internalLinkCount(body: BodyItem[], doc: Record<string, unknown>): number {
  const inText = bodyLinks(body).filter((href) => href.startsWith("/")).length;
  const related = Array.isArray(doc.relatedPosts) ? doc.relatedPosts.length : 0;
  return inText + related;
}

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 183;

/* ── Schema ─────────────────────────────────────────────────── */

export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    /* ── Content ─────────────────────────────────────────── */
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      group: "content",
      validation: (r) =>
        r
          .required()
          .error("Every article needs a title — it becomes the big headline (H1) on the page.")
          .max(110),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (r) =>
        r.required().error(
          "The slug is the article's web address. Click “Generate” next to this field and it's done.",
        ),
      description: "Lowercase words separated by dashes, e.g. best-desk-lamps-for-home-office",
    }),
    defineField({
      name: "articleType",
      title: "Article type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Buying guide", value: "buying-guide" },
          { title: "Product comparison", value: "comparison" },
          { title: "Best under budget", value: "best-under-budget" },
          { title: "How-to guide", value: "how-to" },
          { title: "Listicle", value: "listicle" },
          { title: "Beginner guide", value: "beginner-guide" },
          { title: "Checklist", value: "checklist" },
          { title: "Seasonal guide", value: "seasonal" },
          { title: "Problem–solution", value: "problem-solution" },
          { title: "Product alternatives", value: "alternatives" },
          { title: "Informational", value: "informational" },
        ],
      },
      initialValue: "informational",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "content",
      validation: (r) =>
        r.required().error("Pick a category so the article shows up on the right section of the site."),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (r) => r.required().error("Pick an author — readers trust articles with a real byline."),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (shown on cards and at top of the article)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) =>
        r
          .required()
          .error("Add a 1–2 sentence excerpt — it appears on article cards across the site.")
          .max(300),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (r) => r.required().error("Every article needs a featured image."),
    }),
    defineField({
      name: "imageAlt",
      title: "Featured image alt text",
      type: "string",
      group: "content",
      description:
        "Describe the image in one short sentence, e.g. “Compact air fryer on a small kitchen counter”.",
      validation: (r) =>
        r
          .required()
          .error(
            "Almost there — the featured image needs alt text. Describe what's in the picture in one short sentence. It helps blind readers and Google understand the image.",
          ),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL (use /article-slug for internal links)",
                    type: "string",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "productCardBlock" }),
        defineArrayMember({ type: "comparisonTable" }),
        defineArrayMember({ type: "prosCons" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "quickVerdict" }),
        defineArrayMember({ type: "howWeChose" }),
        defineArrayMember({ type: "adSlotBlock" }),
        defineArrayMember({ type: "ctaButtonBlock" }),
        defineArrayMember({ type: "bodyImage" }),
      ],
      validation: (r) => [
        // 7. Internal links
        r
          .custom((value, context) => {
            const count = internalLinkCount(asBody(value), docOf(context));
            if (count >= 2) return true;
            if (count === 1) {
              return "Good start — 1 internal link so far. Adding one more link to a related On Life Likes article helps readers explore and helps SEO. (Select text → link icon → type /article-slug.)";
            }
            return "No internal links yet. Try to link to at least 2 related On Life Likes articles: select some text, click the link icon, and type the address like /best-desk-lamps-for-home-office. Picking “Related posts” below also counts.";
          })
          .warning(),
        // 9. Product guide without "How we chose"
        r
          .custom((value, context) => {
            const doc = docOf(context);
            if (!GUIDE_TYPES.includes(String(doc.articleType ?? ""))) return true;
            if (asBody(value).some((b) => b._type === "howWeChose")) return true;
            return "This is a product guide, but it has no “How we chose” section yet. Readers (and Google) trust guides more when you explain how the picks were made — click + in the editor and add a “How we chose section” block near the end.";
          })
          .warning(),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQ section",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "faqItem" })],
      // 6. Missing FAQs
      validation: (r) =>
        r
          .custom((value) => {
            const count = Array.isArray(value) ? value.length : 0;
            if (count >= 3) return true;
            if (count > 0) {
              return `Only ${count} FAQ${count === 1 ? "" : "s"} so far — 3 to 5 is the sweet spot. Tip: search your topic on Google and borrow the questions from “People also ask”.`;
            }
            return "No FAQs yet. Adding 3–5 real questions and answers helps readers and can win the FAQ rich result in Google. Tip: look at “People also ask” on Google for your keyword.";
          })
          .warning(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts (internal link recommendations)",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "editorNote",
      title: "Editor note (shown under the header, e.g. review-method note)",
      type: "text",
      rows: 2,
      group: "content",
    }),

    /* ── SEO ─────────────────────────────────────────────── */
    defineField({
      name: "seoTitle",
      title: "SEO title (defaults to the H1 if empty)",
      type: "string",
      group: "seo",
      // 1. Missing SEO title
      validation: (r) => [
        r
          .custom((value) =>
            value
              ? true
              : "No SEO title yet — Google will show the article title instead, which is fine, but a dedicated SEO title (with the year or your keyword up front) usually gets more clicks.",
          )
          .warning(),
        r.max(65).warning("A bit long — keep it under ~60 characters so Google shows the whole title."),
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      // 2. Missing meta description
      validation: (r) => [
        r
          .required()
          .error(
            "Please add a meta description — it's the short text Google shows under your link in search results. Two friendly sentences about what the reader will get.",
          ),
        r
          .min(70)
          .max(165)
          .warning("Aim for 120–158 characters — long enough to be useful, short enough that Google doesn't cut it off."),
      ],
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword",
      type: "string",
      group: "seo",
      description: "The main search phrase this article targets.",
      // 3. Missing focus keyword
      validation: (r) =>
        r
          .custom((value) =>
            value
              ? true
              : "No focus keyword yet. Write the search phrase you want this article to rank for (e.g. “best desk lamps for home office”) — it keeps the title, headings, and meta description on target.",
          )
          .warning(),
    }),
    defineField({
      name: "secondaryKeywords",
      title: "Secondary keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL (leave empty unless republishing)",
      type: "url",
      group: "seo",
    }),
    defineField({
      name: "contentChecklist",
      title: "Content quality checklist",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: {
        list: [
          "Focus keyword in title, first paragraph and one H2",
          "Meta description written (120–158 chars)",
          "Featured image has descriptive alt text",
          "At least 2 internal links added",
          "FAQs answer real search questions",
          "Affiliate disclosure toggle matches content",
          "Review method is honest (no fake testing claims)",
          "Prices phrased as ranges, not live prices",
        ],
        layout: "grid",
      },
      description: "Tick each item before publishing.",
    }),

    /* ── Settings ────────────────────────────────────────── */
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Needs review", value: "review" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "settings",
      validation: (r) => r.required().error("Set the published date — it appears on the article and in the RSS feed."),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated date",
      type: "date",
      group: "settings",
      // 8. Not updated for 6+ months
      validation: (r) =>
        r
          .custom((value, context) => {
            const doc = docOf(context);
            if (doc.status !== "published") return true;
            const last = (value as string | undefined) || (doc.publishedAt as string | undefined);
            if (!last) return true;
            const age = Date.now() - new Date(last).getTime();
            if (Number.isNaN(age) || age <= SIX_MONTHS_MS) return true;
            const months = Math.floor(age / (1000 * 60 * 60 * 24 * 30));
            return `This article hasn't been updated in about ${months} months. Give it a quick check — are the products still available, prices still in range, advice still current? Then set today's date here so readers see it's fresh.`;
          })
          .warning(),
    }),
    defineField({
      name: "updateDue",
      title: "Update due (when should this article be reviewed again?)",
      type: "date",
      group: "settings",
    }),
    defineField({
      name: "reviewMethod",
      title: "Review method",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Tested (we used the product)", value: "tested" },
          { title: "Research-based", value: "researched" },
          { title: "Expert-reviewed", value: "expert-reviewed" },
          { title: "Updated for accuracy", value: "updated" },
        ],
        layout: "radio",
      },
      initialValue: "researched",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hasAffiliateLinks",
      title: "Contains affiliate links (shows the disclosure box)",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "REQUIRED whenever the article links to Amazon or any affiliate partner.",
      // 5. Product links present but disclosure off
      validation: (r) =>
        r
          .custom((value, context) => {
            if (value === true) return true;
            const doc = docOf(context);
            if (!hasProductContent(asBody(doc.body))) return true;
            return "Heads up: this article contains product cards or Amazon links, but the affiliate disclosure is switched OFF. Please turn it ON — the site then shows the required disclosure box at the top of the article automatically.";
          })
          .warning(),
    }),
    defineField({
      name: "showAds",
      title: "Allow AdSense slots on this article",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "faqSchema",
      title: "Emit FAQ schema (rich results) for the FAQ section",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "editorsPick",
      title: "Feature in homepage Editor's Picks",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "featuredImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Status: ${subtitle ?? "draft"}`, media };
    },
  },
});
