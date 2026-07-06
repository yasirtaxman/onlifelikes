import Link from "next/link";
import { site } from "@/lib/site";

/** Shown at the top of any article containing affiliate links. */
export function AffiliateDisclosure() {
  return (
    <aside
      aria-label="Affiliate disclosure"
      className="my-5 rounded-xl border border-second/50 bg-second-tint px-5 py-3.5 text-sm leading-relaxed text-ink/85"
    >
      <strong className="font-semibold text-ink">Affiliate disclosure:</strong>{" "}
      This article contains affiliate links. If you buy through them, we may
      earn a commission at no extra cost to you. {site.amazonAssociateLine}{" "}
      Our recommendations are always independent —{" "}
      <Link href="/affiliate-disclosure" className="font-medium text-brand underline hover:text-brand-dark">
        read how this works
      </Link>
      .
    </aside>
  );
}
