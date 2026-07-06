"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PostCard } from "@/lib/types";
import { ArticleCard } from "@/components/ArticleCard";

export function SearchClient({ posts }: { posts: PostCard[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return posts;
    const terms = query.split(/\s+/);
    return posts
      .map((p) => {
        const haystack =
          `${p.title} ${p.excerpt} ${p.categorySlug} ${p.type}`.toLowerCase();
        const hits = terms.filter((t) => haystack.includes(t)).length;
        const titleBoost = p.title.toLowerCase().includes(query) ? 2 : 0;
        return { post: p, score: hits + titleBoost };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.post);
  }, [q, posts]);

  return (
    <div className="mt-6">
      <label htmlFor="search-page-input" className="sr-only">
        Search articles
      </label>
      <input
        id="search-page-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try “robot vacuum”, “small kitchen”, “desk lamp”…"
        autoFocus
        className="w-full max-w-xl rounded-full border border-line bg-white px-6 py-3.5 text-ink placeholder:text-ink/40 focus:border-second focus:outline-2 focus:outline-second/50"
      />
      <p className="mt-4 text-sm text-ink/60" role="status">
        {q.trim()
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”`
          : `Browsing all ${posts.length} articles`}
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
      {q.trim() && results.length === 0 && (
        <p className="mt-8 rounded-2xl border border-line bg-white p-8 text-ink/70">
          No matches. Try a shorter keyword — for example “vacuum” instead of
          “vacuum cleaner for wooden floors”.
        </p>
      )}
    </div>
  );
}
