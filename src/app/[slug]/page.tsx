import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAuthorBySlug,
  getCategories,
  getCategoryBySlug,
  getPost,
  getPostCards,
  getPosts,
  getPostsByCategory,
  getRelatedPosts,
  toCard,
} from "@/lib/content";
import { pageMetadata, postMetadata } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  jsonLd,
  productItemListSchema,
} from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/text";
import type { Category, Post } from "@/lib/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostBody } from "@/components/PostBody";
import { TableOfContents } from "@/components/TableOfContents";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { TagList } from "@/components/TagList";
import { TypeBadge } from "@/components/TypeBadge";
import { EditorNote, UpdateNotice } from "@/components/boxes";
import { AdSlot } from "@/components/AdSlot";
import { SectionHeader } from "@/components/SectionHeader";

export const revalidate = 300;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPosts();
  const categories = getCategories();
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...posts.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (category) {
    return pageMetadata({
      title: `${category.title} — Ideas, Tips & Buying Guides`,
      description: category.description,
      path: `/${category.slug}`,
      image: category.image,
    });
  }
  const post = await getPost(slug);
  if (post) return postMetadata(post);
  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (category) return <CategoryPage category={category} />;
  const post = await getPost(slug);
  if (post) return <ArticlePage post={post} />;
  notFound();
}

/* ── Category page ───────────────────────────────────────── */

const reviewMethodLabel: Record<Post["reviewMethod"], string> = {
  tested: "Hands-on tested",
  researched: "Research-based guide",
  "expert-reviewed": "Expert-reviewed",
  updated: "Updated for accuracy",
};

async function CategoryPage({ category }: { category: Category }) {
  const posts = await getPostsByCategory(category.slug);
  const cards = posts.map(toCard);
  const featured = cards[0];
  const guides = cards.filter(
    (p) => p.type === "buying-guide" || p.type === "best-under-budget",
  );
  const related = (category.relatedCategorySlugs ?? [])
    .map((s) => getCategoryBySlug(s))
    .filter((c): c is Category => Boolean(c));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.title, path: `/${category.slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            collectionPageSchema(category),
            breadcrumbSchema(crumbs),
            category.faqs?.length ? faqSchema(category.faqs) : null,
          ),
        }}
      />
      <Breadcrumbs items={crumbs} />

      {/* Category intro */}
      <header className="mt-6 max-w-3xl border-b-2 border-line pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-second">
          Category · {cards.length} article{cards.length === 1 ? "" : "s"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {category.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink/70">
          {category.description}
        </p>
      </header>

      {/* Featured guide */}
      {featured && (
        <section className="mt-10" aria-label="Featured guide">
          <h2 className="sr-only">Featured guide</h2>
          <FeaturedArticleCard post={featured} />
        </section>
      )}

      {/* Latest posts */}
      {cards.length > 1 && (
        <section className="mt-12" aria-label="Latest posts">
          <SectionHeader eyebrow="Fresh" title={`Latest in ${category.title}`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.slice(1, 7).map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {cards.length === 0 && (
        <p className="mt-10 rounded-2xl border border-line bg-white p-8 text-ink/70">
          Fresh guides for this category are in the works — check back soon, or
          explore our <Link href="/categories" className="font-medium text-brand underline">other categories</Link>.
        </p>
      )}

      <AdSlot position="in-article" />

      {/* Popular buying guides */}
      {guides.length > 0 && (
        <section className="mt-4" aria-label="Popular buying guides">
          <SectionHeader eyebrow="Research-based" title="Popular buying guides" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 3).map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related categories */}
      {related.length > 0 && (
        <section className="mt-12" aria-label="Related categories">
          <SectionHeader eyebrow="Keep exploring" title="Related categories" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </section>
      )}

      {/* SEO text section */}
      {category.seoText && (
        <section className="mt-12 rounded-2xl border border-line bg-mist/60 p-6 sm:p-8" aria-label={`About ${category.title}`}>
          <h2 className="text-xl font-bold text-ink">
            About our {category.title} coverage
          </h2>
          <p className="mt-3 leading-relaxed text-ink/80">{category.seoText}</p>
        </section>
      )}

      {/* FAQ */}
      {category.faqs && category.faqs.length > 0 && (
        <FaqAccordion faqs={category.faqs} />
      )}
    </div>
  );
}

/* ── Article page ────────────────────────────────────────── */

async function ArticlePage({ post }: { post: Post }) {
  const author = getAuthorBySlug(post.authorSlug);
  const category = getCategoryBySlug(post.categorySlug);
  const related = await getRelatedPosts(post, 3);
  const allGuides = (await getPostCards()).filter(
    (p) =>
      (p.type === "buying-guide" || p.type === "best-under-budget") &&
      p.slug !== post.slug &&
      !related.some((r) => r.slug === p.slug),
  );
  const minutes = readingTime(post);

  const crumbs = [
    { name: "Home", path: "/" },
    ...(category ? [{ name: category.title, path: `/${category.slug}` }] : []),
    { name: post.title, path: `/${post.slug}` },
  ];

  const isGuide =
    post.type === "buying-guide" ||
    post.type === "best-under-budget" ||
    post.type === "comparison";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema(post),
            breadcrumbSchema(crumbs),
            post.faqSchema && post.faqs?.length ? faqSchema(post.faqs) : null,
            isGuide ? productItemListSchema(post) : null,
          ),
        }}
      />

      <Breadcrumbs items={crumbs} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {category && (
            <Link
              href={`/${category.slug}`}
              className="font-semibold uppercase tracking-wide text-brand hover:underline"
            >
              {category.title}
            </Link>
          )}
          <TypeBadge type={post.type} />
          <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
            {reviewMethodLabel[post.reviewMethod]}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink/70">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
          {author && (
            <span>
              By{" "}
              <Link
                href={`/authors/${author.slug}`}
                className="font-semibold text-ink hover:text-brand hover:underline"
              >
                {author.name}
              </Link>
            </span>
          )}
          <span>Published {formatDate(post.publishedAt)}</span>
          {post.updatedAt && <span>Updated {formatDate(post.updatedAt)}</span>}
          <span>{minutes} min read</span>
        </div>

        {post.updatedAt && <UpdateNotice updatedAt={formatDate(post.updatedAt)} />}
      </header>

      {post.hasAffiliateLinks && <AffiliateDisclosure />}
      {post.editorNote && <EditorNote text={post.editorNote} />}

      <TableOfContents body={post.body} />

      <figure className="my-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-second-tint">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </figure>

      <PostBody body={post.body} showAds={post.showAds} />

      <TagList tags={post.tags} />

      {post.faqs && post.faqs.length > 0 && <FaqAccordion faqs={post.faqs} />}

      {author && <AuthorBio author={author} />}

      <RelatedPosts posts={related} />

      {isGuide === false && allGuides.length > 0 && (
        <RelatedPosts
          posts={allGuides.slice(0, 3)}
          title="Buying guides you might like"
        />
      )}
    </article>
  );
}
