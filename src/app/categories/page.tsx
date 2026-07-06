import type { Metadata } from "next";
import { getCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { CategoryCard } from "@/components/CategoryCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "All Categories",
  description:
    "Browse every On Life Likes category: home & living, cleaning, kitchen, smart home, small spaces, home office, pets, sleep, outdoor, and buying guides.",
  path: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Categories", path: "/categories" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        All categories
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        Everything we cover, in one place — from everyday home ideas to
        research-based buying guides.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
