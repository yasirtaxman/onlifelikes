import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      description:
        "Must match one of the site's category slugs (e.g. kitchen, cleaning, small-spaces) so posts appear on the right category page.",
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
      description:
        "Match an author slug configured on the site (e.g. maya-collins) or add the new author in src/content/authors.ts as well.",
    }),
    defineField({ name: "role", title: "Role / title", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "expertise",
      title: "Expertise areas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  description:
    "Reusable product cards. Create a product once, use it in many guides — update the Amazon link in one place.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "brand", type: "string" }),
    defineField({
      name: "summary",
      title: "Summary (what it is and why it's recommended)",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "bestFor", title: "Best for label", type: "string" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
    defineField({
      name: "amazonAsin",
      title: "Amazon ASIN (preferred — builds per-country links automatically)",
      type: "string",
      description: "The 10-character ID from the Amazon product page URL, e.g. B0XXXXXXXX.",
    }),
    defineField({
      name: "amazonUrl",
      title: "Amazon URL (fallback if no ASIN — search links are fine)",
      type: "url",
      validation: (r) =>
        r
          .custom((value, context) => {
            const doc = (context.document ?? {}) as { amazonAsin?: string };
            if (value || doc.amazonAsin) return true;
            return "No Amazon link yet — the “Check price on Amazon” button will go nowhere. Add the ASIN above (best) or paste an Amazon URL here.";
          })
          .warning(),
    }),
    defineField({
      name: "pros",
      title: "Pros",
      type: "array",
      of: [{ type: "string" }],
      // Product card without pros
      validation: (r) =>
        r
          .custom((value) =>
            Array.isArray(value) && value.length > 0
              ? true
              : "The pros list is empty. Add 2–3 short pros (a few words each) — product cards look bare and less trustworthy without them.",
          )
          .warning(),
    }),
    defineField({
      name: "cons",
      title: "Cons",
      type: "array",
      of: [{ type: "string" }],
      // Product card without cons
      validation: (r) =>
        r
          .custom((value) =>
            Array.isArray(value) && value.length > 0
              ? true
              : "The cons list is empty. Every honest recommendation has at least one downside — adding 1–2 cons makes the card more credible, not less.",
          )
          .warning(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "image" },
  },
});
