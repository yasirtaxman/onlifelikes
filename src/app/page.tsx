import Image from "next/image";
import Link from "next/link";
import {
  getBuyingGuides,
  getCategories,
  getCategoryBySlug,
  getEditorsPicks,
  getPostCards,
  getPostsByCategory,
  toCard,
} from "@/lib/content";
import type { PostCard } from "@/lib/types";
import { formatDate } from "@/lib/text";
import { CtaButton } from "@/components/CtaButton";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { EditorsPickBadge, TypeBadge } from "@/components/TypeBadge";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TrustSection } from "@/components/TrustSection";
import { AdSlot } from "@/components/AdSlot";

export const revalidate = 300;

/** Large image-led lead story card for the hero. */
function HeroStoryCard({ post }: { post: PostCard }) {
  const category = getCategoryBySlug(post.categorySlug);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link href={`/${post.slug}`} className="relative block aspect-[16/10] bg-second-tint">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {post.editorsPick && (
          <span className="absolute left-4 top-4">
            <EditorsPickBadge />
          </span>
        )}
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs">
          {category && (
            <Link
              href={`/${category.slug}`}
              className="font-semibold uppercase tracking-wide text-brand hover:underline"
            >
              {category.title}
            </Link>
          )}
          <TypeBadge type={post.type} />
        </div>
        <h2 className="mt-2 text-2xl font-extrabold leading-tight text-ink">
          <Link href={`/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
        <p className="mt-3 text-xs text-ink/50">
          Updated {formatDate(post.updatedAt || post.publishedAt)} ·{" "}
          {post.readingTime} min read
        </p>
      </div>
    </article>
  );
}

/** Compact numbered row for the "Trending now" rail. */
function TrendingRow({ post, rank }: { post: PostCard; rank: number }) {
  return (
    <li className="flex gap-4 border-b border-line py-4 last:border-b-0">
      <span className="text-2xl font-extrabold leading-none text-second" aria-hidden="true">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-snug text-ink">
          <Link href={`/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-ink/50">{post.readingTime} min read</p>
      </div>
    </li>
  );
}

async function CategoryRow({
  slug,
  eyebrow,
  title,
  intro,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  const posts = (await getPostsByCategory(slug)).slice(0, 3).map(toCard);
  if (!posts.length) return null;
  return (
    <section aria-label={title}>
      <SectionHeader eyebrow={eyebrow} title={title} intro={intro} href={`/${slug}`} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [picks, latest, guides] = await Promise.all([
    getEditorsPicks(5),
    getPostCards(),
    getBuyingGuides(6),
  ]);
  const categories = getCategories();
  const lead = picks[0];
  const trending = latest.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6">
      {/* Hero: brand message + lead story */}
      <section className="grid items-center gap-10 pt-10 lg:grid-cols-[1fr_1.15fr] lg:pt-14" aria-label="Welcome">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-second">
            On Life Likes
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Practical picks for better{" "}
            <span className="text-brand">everyday living</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            On Life Likes helps you discover useful home ideas, smart products,
            cleaning tips, kitchen tools, small-space solutions, and buying
            guides that make daily life easier.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <CtaButton href="/buying-guides">Explore Buying Guides</CtaButton>
            <CtaButton href="/categories" variant="outline">
              Read Latest Tips
            </CtaButton>
          </div>
          <div className="mt-7 max-w-md">
            <SearchBar />
          </div>
        </div>
        {lead && <HeroStoryCard post={lead} />}
      </section>

      {/* Featured categories */}
      <section aria-label="Featured categories">
        <SectionHeader
          eyebrow="Explore"
          title="Browse by category"
          href="/categories"
          linkLabel="All 12 categories"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Editor's picks */}
      <section aria-label="Editor's picks">
        <SectionHeader
          eyebrow="Curated"
          title="Editor's picks"
          intro="The guides our editors would hand a friend first."
        />
        {picks[1] && <FeaturedArticleCard post={picks[1]} />}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.slice(2, 5).map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Latest + trending rail */}
      <section aria-label="Latest articles">
        <SectionHeader eyebrow="Fresh" title="The latest" />
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {latest.slice(0, 4).map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
          <aside className="rounded-2xl border border-line bg-white p-6 shadow-card" aria-label="Trending now">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-second">
              Trending now
            </h3>
            <ol className="mt-2">
              {trending.map((p, i) => (
                <TrendingRow key={p.slug} post={p} rank={i + 1} />
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <AdSlot position="in-article" />

      {/* Best buying guides */}
      <section aria-label="Best buying guides">
        <SectionHeader
          eyebrow="Research-based"
          title="Best buying guides"
          intro="Product guides with clear picks, honest trade-offs, and full disclosures."
          href="/buying-guides"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Topic sections */}
      <CategoryRow
        slug="smart-home"
        eyebrow="Smart Home"
        title="Smart home, made simple"
        intro="Beginner-friendly devices and setups that work in apartments and rentals."
      />
      <CategoryRow
        slug="cleaning"
        eyebrow="Cleaning"
        title="Cleaning, with less effort"
        intro="Routines and tools that keep your home clean without the marathon weekends."
      />
      <CategoryRow
        slug="kitchen"
        eyebrow="Kitchen"
        title="Kitchen tools that earn their space"
        intro="Compact appliances and gadgets picked for real, weekly usefulness."
      />
      <CategoryRow
        slug="small-spaces"
        eyebrow="Small Spaces"
        title="Small spaces, bigger living"
        intro="Space-saving products and layout ideas for apartments and compact rooms."
      />

      <NewsletterSignup />
      <TrustSection />
    </div>
  );
}
