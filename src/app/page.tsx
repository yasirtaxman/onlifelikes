import Link from "next/link";
import {
  getBuyingGuides,
  getCategories,
  getEditorsPicks,
  getPostCards,
  getPostsByCategory,
  toCard,
} from "@/lib/content";
import { CtaButton } from "@/components/CtaButton";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ArticleCard } from "@/components/ArticleCard";
import { FeaturedArticleCard } from "@/components/FeaturedArticleCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { TrustSection } from "@/components/TrustSection";
import { AdSlot } from "@/components/AdSlot";

export const revalidate = 300;

async function CategoryRow({
  slug,
  title,
  intro,
}: {
  slug: string;
  title: string;
  intro: string;
}) {
  const posts = (await getPostsByCategory(slug)).slice(0, 3).map(toCard);
  if (!posts.length) return null;
  return (
    <section aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-pine">{title}</h2>
          <p className="mt-1 text-sm text-pine/60">{intro}</p>
        </div>
        <Link
          href={`/${slug}`}
          className="text-sm font-semibold text-forest hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [picks, latest, guides] = await Promise.all([
    getEditorsPicks(4),
    getPostCards(),
    getBuyingGuides(6),
  ]);
  const categories = getCategories();
  const featured = picks[0];

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6">
      {/* Hero */}
      <section className="pt-12 text-center sm:pt-16" aria-label="Welcome">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-pine sm:text-5xl">
          Practical picks for better{" "}
          <span className="text-forest">everyday living</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pine/70">
          On Life Likes helps you discover useful home ideas, smart products,
          cleaning tips, kitchen tools, small-space solutions, and buying guides
          that make daily life easier.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <CtaButton href="/buying-guides">Explore Buying Guides</CtaButton>
          <CtaButton href="/categories" variant="outline">
            Read Latest Tips
          </CtaButton>
        </div>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar />
        </div>
      </section>

      {/* Featured categories */}
      <section aria-label="Featured categories">
        <h2 className="text-2xl font-bold text-pine">Browse by category</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
        <p className="mt-4 text-right">
          <Link href="/categories" className="text-sm font-semibold text-forest hover:underline">
            See all 12 categories →
          </Link>
        </p>
      </section>

      {/* Editor's picks */}
      <section aria-label="Editor's picks">
        <h2 className="text-2xl font-bold text-pine">Editor&apos;s picks</h2>
        {featured && (
          <div className="mt-5">
            <FeaturedArticleCard post={featured} />
          </div>
        )}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.slice(1, 4).map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Latest articles */}
      <section aria-label="Latest articles">
        <h2 className="text-2xl font-bold text-pine">Latest articles</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <AdSlot position="in-article" />

      {/* Best buying guides */}
      <section aria-label="Best buying guides">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-pine">Best buying guides</h2>
            <p className="mt-1 text-sm text-pine/60">
              Research-based product guides with clear picks and honest trade-offs.
            </p>
          </div>
          <Link href="/buying-guides" className="text-sm font-semibold text-forest hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* Topic sections */}
      <CategoryRow
        slug="smart-home"
        title="Smart home, made simple"
        intro="Beginner-friendly devices and setups that work in apartments and rentals."
      />
      <CategoryRow
        slug="cleaning"
        title="Cleaning, with less effort"
        intro="Routines and tools that keep your home clean without the marathon weekends."
      />
      <CategoryRow
        slug="kitchen"
        title="Kitchen tools that earn their space"
        intro="Compact appliances and gadgets picked for real, weekly usefulness."
      />
      <CategoryRow
        slug="small-spaces"
        title="Small spaces, bigger living"
        intro="Space-saving products and layout ideas for apartments and compact rooms."
      />

      <NewsletterSignup />
      <TrustSection />
    </div>
  );
}
