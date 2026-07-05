import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getAuthors, getPostsByAuthor, toCard } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd, personSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 300;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return pageMetadata({
    title: `${author.name} — ${author.role}`,
    description: author.bio.slice(0, 155),
    path: `/authors/${author.slug}`,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = (await getPostsByAuthor(author.slug)).map(toCard);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Authors", path: "/authors" },
    { name: author.name, path: `/authors/${author.slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(personSchema(author), breadcrumbSchema(crumbs)),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <header className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <span className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-sage-light">
          {author.image && (
            <Image src={author.image} alt={author.name} fill sizes="96px" className="object-cover" />
          )}
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-pine">
            {author.name}
          </h1>
          <p className="mt-1 font-medium text-forest">{author.role}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-pine/80">{author.bio}</p>
        </div>
      </header>
      <section className="mt-12" aria-label={`Articles by ${author.name}`}>
        <h2 className="text-2xl font-bold text-pine">
          Articles by {author.name}
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-4 text-pine/60">No published articles yet.</p>
        )}
      </section>
    </div>
  );
}
