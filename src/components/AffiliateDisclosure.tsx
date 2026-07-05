import Link from "next/link";
import { site } from "@/lib/site";

/** Shown at the top of any article containing affiliate links. */
export function AffiliateDisclosure() {
  return (
    <aside
      aria-label="Affiliate disclosure"
      className="my-5 rounded-xl border border-sage/50 bg-sage-light px-5 py-3.5 text-sm leading-relaxed text-pine/85"
    >
      <strong className="font-semibold text-pine">Affiliate disclosure:</strong>{" "}
      This article contains affiliate links. If you buy through them, we may
      earn a commission at no extra cost to you. {site.amazonAssociateLine}{" "}
      Our recommendations are always independent —{" "}
      <Link href="/affiliate-disclosure" className="font-medium text-forest underline hover:text-forest-dark">
        read how this works
      </Link>
      .
    </aside>
  );
}
