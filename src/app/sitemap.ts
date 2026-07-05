import type { MetadataRoute } from "next";
import { site, footerPolicyLinks } from "@/lib/site";
import { getAuthors, getCategories, getPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const categories = getCategories();
  const authors = getAuthors();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/categories`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/authors`, changeFrequency: "monthly", priority: 0.4 },
    ...footerPolicyLinks.map((l) => ({
      url: `${site.url}${l.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return [
    ...staticPages,
    ...categories.map((c) => ({
      url: `${site.url}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...authors.map((a) => ({
      url: `${site.url}/authors/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
