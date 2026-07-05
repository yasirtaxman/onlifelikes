import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Disclaimer for onlifelikes.com: general information, product recommendations, pricing, and external links.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <StaticPage
      title="Disclaimer"
      intro="Last updated: July 5, 2026"
      path="/disclaimer"
    >
      <h2>General information</h2>
      <p>
        The content on {site.domain} is published in good faith for general
        information purposes. It reflects our research and editorial opinion at
        the time of writing and should not be treated as professional advice of
        any kind.
      </p>
      <h2>Product recommendations</h2>
      <p>
        Our guides state their review method — tested, research-based,
        expert-reviewed, or updated. Research-based guides are built on product
        specifications, feature comparison, and buyer needs, not hands-on
        testing, and we say so in the article. Manufacturers change products
        without notice; always verify specifications on the retailer&apos;s
        page before purchasing. See our{" "}
        <Link href="/product-review-policy">Product Review Policy</Link>.
      </p>
      <h2>Pricing</h2>
      <p>
        Prices and availability of products mentioned on this site may change
        at any time. Price bands quoted are typical ranges at the time of
        writing, not live prices, and are not guaranteed.
      </p>
      <h2>Affiliate relationships</h2>
      <p>
        {site.amazonAssociateLine} Full details in our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>External links</h2>
      <p>
        Links to other websites are provided for convenience. We do not control
        and are not responsible for the content or practices of external sites.
      </p>
      <h2>Errors</h2>
      <p>
        Despite careful editing, errors can occur. If you spot one, please{" "}
        <Link href="/contact">let us know</Link> and we will correct it.
      </p>
    </StaticPage>
  );
}
