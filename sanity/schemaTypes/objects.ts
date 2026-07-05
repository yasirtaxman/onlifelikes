import { defineArrayMember, defineField, defineType } from "sanity";

/** Reusable body blocks for the article editor. */

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
});

export const productCardBlock = defineType({
  name: "productCardBlock",
  title: "Product card",
  type: "object",
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rank",
      title: "Rank number (1, 2, 3…)",
      type: "number",
    }),
    defineField({
      name: "bestFor",
      title: "Best for label (overrides the product's own)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "product.name", rank: "rank" },
    prepare: ({ title, rank }) => ({
      title: `🛒 ${rank ? `#${rank} ` : ""}${title ?? "Product card"}`,
    }),
  },
});

export const comparisonTable = defineType({
  name: "comparisonTable",
  title: "Comparison table",
  type: "object",
  fields: [
    defineField({ name: "caption", title: "Table caption", type: "string" }),
    defineField({
      name: "columns",
      title: "Column headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "cells",
              title: "Cells (one per column, in order)",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: (cells as string[] | undefined)?.join(" | ") ?? "Row",
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "caption" },
    prepare: ({ title }) => ({ title: `📊 ${title ?? "Comparison table"}` }),
  },
});

export const prosCons = defineType({
  name: "prosCons",
  title: "Pros & cons",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title (optional)", type: "string" }),
    defineField({ name: "pros", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cons", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: `✓✕ ${title ?? "Pros & cons"}` }),
  },
});

export const callout = defineType({
  name: "callout",
  title: "Callout box",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Tip", value: "tip" },
          { title: "Note", value: "note" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "note",
    }),
    defineField({ name: "title", title: "Title (optional)", type: "string" }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare: ({ title, variant }) => ({ title: `💡 ${title ?? variant ?? "Callout"}` }),
  },
});

export const quickVerdict = defineType({
  name: "quickVerdict",
  title: "Quick verdict box",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: "✅ Quick verdict" }) },
});

export const howWeChose = defineType({
  name: "howWeChose",
  title: "How we chose section",
  type: "object",
  fields: [
    defineField({ name: "text", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "items",
      title: "Criteria list",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "🔎 How we chose" }) },
});

export const adSlotBlock = defineType({
  name: "adSlotBlock",
  title: "Ad slot (AdSense)",
  type: "object",
  fields: [
    defineField({
      name: "note",
      type: "string",
      initialValue: "In-article ad",
      readOnly: true,
    }),
  ],
  preview: { prepare: () => ({ title: "📢 Ad slot (renders only if ads enabled)" }) },
});

export const ctaButtonBlock = defineType({
  name: "ctaButtonBlock",
  title: "CTA button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link (internal /slug or full URL)",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label" },
    prepare: ({ title }) => ({ title: `🔘 ${title ?? "CTA button"}` }),
  },
});

export const bodyImage = defineType({
  name: "bodyImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text (required)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
});
