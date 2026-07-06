import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/lib/types";
import { formatDate } from "@/lib/text";
import { getCategoryBySlug } from "@/lib/content";
import { EditorsPickBadge, TypeBadge } from "./TypeBadge";

/** Large horizontal card for hero/featured slots. */
export function FeaturedArticleCard({ post }: { post: PostCard }) {
  const category = getCategoryBySlug(post.categorySlug);
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover md:grid-cols-2">
      <Link href={`/${post.slug}`} className="relative block aspect-[16/10] bg-second-tint md:aspect-auto md:min-h-[280px]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
        {post.editorsPick && (
          <span className="absolute left-4 top-4">
            <EditorsPickBadge />
          </span>
        )}
      </Link>
      <div className="flex flex-col justify-center p-6 md:p-8">
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
        <h3 className="mt-3 text-2xl font-bold leading-tight text-ink">
          <Link href={`/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink/50">
          Updated {formatDate(post.updatedAt || post.publishedAt)} ·{" "}
          {post.readingTime} min read
        </p>
      </div>
    </article>
  );
}
