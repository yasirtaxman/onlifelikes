import Link from "next/link";
import { footerPolicyLinks, site } from "@/lib/site";
import { getCategories } from "@/lib/content";

export function Footer() {
  const categories = getCategories();
  return (
    <footer className="mt-16 bg-pine text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-xl font-bold">
              On Life <span className="text-sage">Likes</span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/80">
              {site.tagline}. {site.description}
            </p>
            <p className="mt-4 max-w-md rounded-lg bg-pine-dark p-3 text-xs leading-relaxed text-cream/70">
              <strong className="text-cream/90">Affiliate disclosure:</strong>{" "}
              {site.amazonAssociateLine} When you buy through links on our site,
              we may earn a commission at no extra cost to you. This never
              influences our recommendations.{" "}
              <Link href="/affiliate-disclosure" className="underline hover:text-sage">
                Learn more
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Categories">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sage">
              Categories
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-cream/80 hover:text-sage">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="font-medium text-sage hover:text-cream">
                  All categories →
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company and policies">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sage">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {footerPolicyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/80 hover:text-sage">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/authors" className="text-cream/80 hover:text-sage">
                  Our Authors
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}. All rights
            reserved.
          </p>
          <p>
            Prices and availability of products mentioned may change. Content is
            for general information — see our{" "}
            <Link href="/disclaimer" className="underline hover:text-sage">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
