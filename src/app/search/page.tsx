import type { Metadata } from "next";
import { Suspense } from "react";
import { getPostCards } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description:
    "Search all On Life Likes articles, buying guides, comparisons, and how-to guides.",
  path: "/search",
  noIndex: true,
});

export const revalidate = 300;

export default async function SearchPage() {
  const posts = await getPostCards();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-pine">
        Search
      </h1>
      <Suspense>
        <SearchClient posts={posts} />
      </Suspense>
    </div>
  );
}
