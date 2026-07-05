import type { PostCard } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

export function RelatedPosts({
  posts,
  title = "Related articles",
}: {
  posts: PostCard[];
  title?: string;
}) {
  if (!posts.length) return null;
  return (
    <section className="my-10" aria-label={title}>
      <h2 className="text-2xl font-bold text-pine">{title}</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
