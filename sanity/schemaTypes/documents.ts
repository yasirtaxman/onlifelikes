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
    }),
    defineField({ name: "pros", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cons", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "image" },
  },
});
