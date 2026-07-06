import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/lib/types";
import { formatDate } from "@/lib/text";
import { getCategoryBySlug } from "@/lib/content";
import { EditorsPickBadge, TypeBadge } from "./TypeBadge";

export function ArticleCard({
  post,
  headingLevel = 3,
}: {
  post: PostCard;
  headingLevel?: 2 | 3;
}) {
  const category = getCategoryBySlug(post.categorySlug);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link href={`/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-second-tint">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {post.editorsPick && (
          <span className="absolute left-3 top-3">
            <EditorsPickBadge />
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
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
        <Heading className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={`/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink/50">
          {formatDate(post.updatedAt || post.publishedAt)} · {post.readingTime} min
          read
        </p>
      </div>
    </article>
  );
}
