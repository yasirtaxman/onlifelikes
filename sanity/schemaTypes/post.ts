import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The main article document — covers blog posts, buying guides,
 * comparisons, best-under-budget articles, and how-to guides
 * (choose with "Article type").
 */
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
      validation: (r) => r.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (shown on cards and at top of the article)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Featured image alt text",
      type: "string",
      group: "content",
      description: "Describe the image for screen readers and SEO. Required — don't skip this.",
      validation: (r) => r.required(),
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
    }),
    defineField({
      name: "faqs",
      title: "FAQ section",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "faqItem" })],
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
      validation: (r) => r.max(65).warning("Keep under ~60 characters for full display in Google"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) =>
        r.required().min(70).max(165).warning("Aim for 120–158 characters"),
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword",
      type: "string",
      group: "seo",
      description: "The main search phrase this article targets.",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated date",
      type: "date",
      group: "settings",
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
