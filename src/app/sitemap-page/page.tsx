import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { footerPolicyLinks } from "@/lib/site";
import { getCategories, getPosts } from "@/lib/content";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Sitemap",
  description:
    "A human-friendly overview of every page on On Life Likes — categories, articles, authors, and policies.",
  path: "/sitemap-page",
});

export const revalidate = 300;

export default async function SitemapPage() {
  const categories = getCategories();
  const posts = await getPosts();
  return (
    <StaticPage
      title="Sitemap"
      intro="Everything on the site, in one place. (Search engines: see /sitemap.xml.)"
      path="/sitemap-page"
    >
      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Articles</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Site pages</h2>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/categories">All categories</Link>
        </li>
        <li>
          <Link href="/authors">Authors</Link>
        </li>
        <li>
          <Link href="/search">Search</Link>
        </li>
        {footerPolicyLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </StaticPage>
  );
}
