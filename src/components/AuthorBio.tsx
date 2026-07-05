import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/types";

export function AuthorBio({ author }: { author: Author }) {
  return (
    <aside className="my-8 flex flex-col gap-4 rounded-2xl border border-beige bg-white p-6 shadow-card sm:flex-row sm:items-start">
      <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-sage-light">
        {author.image && (
          <Image src={author.image} alt={author.name} fill sizes="64px" className="object-cover" />
        )}
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-forest">
          About the author
        </p>
        <p className="mt-1 font-bold text-pine">
          <Link href={`/authors/${author.slug}`} className="hover:text-forest hover:underline">
            {author.name}
          </Link>{" "}
          <span className="font-normal text-pine/60">— {author.role}</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-pine/80">{author.bio}</p>
        {author.expertise && (
          <p className="mt-2 text-xs text-pine/50">
            Writes about: {author.expertise.join(" · ")}
          </p>
        )}
      </div>
    </aside>
  );
}
