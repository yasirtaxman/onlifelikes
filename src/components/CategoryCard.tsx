import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-beige bg-white p-4 shadow-card transition-all hover:border-sage hover:shadow-card-hover"
    >
      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sage-light">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span>
        <span className="block font-semibold text-pine group-hover:text-forest">
          {category.title}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-pine/60">
          {category.description}
        </span>
      </span>
    </Link>
  );
}
