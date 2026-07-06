import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAuthors } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Our Authors",
  description:
    "Meet the On Life Likes editorial team — the writers and editors behind our home, kitchen, smart home, and buying guides.",
  path: "/authors",
});

export default function AuthorsPage() {
  const authors = getAuthors();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Authors", path: "/authors" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Our authors
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        Every guide on On Life Likes is written and reviewed by a real person on
        this team.
      </p>
      <div className="mt-8 space-y-6">
        {authors.map((a) => (
          <article
            key={a.slug}
            className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:flex-row"
          >
            <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full bg-second-tint">
              {a.image && (
                <Image src={a.image} alt={a.name} fill sizes="80px" className="object-cover" />
              )}
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">
                <Link href={`/authors/${a.slug}`} className="hover:text-brand">
                  {a.name}
                </Link>
              </h2>
              <p className="text-sm font-medium text-brand">{a.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{a.bio}</p>
              <Link
                href={`/authors/${a.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
              >
                View articles →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
