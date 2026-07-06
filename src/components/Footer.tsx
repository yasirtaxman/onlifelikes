import Link from "next/link";
import { footerPolicyLinks, site } from "@/lib/site";
import { getCategories } from "@/lib/content";

export function Footer() {
  const categories = getCategories();
  return (
    <footer className="mt-16 bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-xl font-bold">
              On Life <span className="text-accent">Likes</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
              {site.tagline}. {site.description}
            </p>
            <p className="mt-4 max-w-md rounded-lg bg-brand-dark p-3 text-xs leading-relaxed text-white/70">
              <strong className="text-white/90">Affiliate disclosure:</strong>{" "}
              {site.amazonAssociateLine} When you buy through links on our site,
              we may earn a commission at no extra cost to you. This never
              influences our recommendations.{" "}
              <Link href="/affiliate-disclosure" className="underline hover:text-accent">
                Learn more
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Categories">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Categories
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-white/80 hover:text-accent">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="font-medium text-accent hover:text-white">
                  All categories →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company and policies">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {footerPolicyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/authors" className="text-white/80 hover:text-accent">
                  Our Authors
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}. All rights
            reserved.
          </p>
          <p>
            Prices and availability of products mentioned may change. Content is
            for general information — see our{" "}
            <Link href="/disclaimer" className="underline hover:text-accent">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
