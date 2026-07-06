import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:border-second hover:shadow-card-hover"
    >
      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-second-tint">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span>
        <span className="block font-semibold text-ink group-hover:text-brand">
          {category.title}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-ink/60">
          {category.description}
        </span>
      </span>
    </Link>
  );
}
