import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Product Review Policy",
  description:
    "How On Life Likes selects, evaluates, and updates product recommendations — and how affiliate links work without influencing our picks.",
  path: "/product-review-policy",
});

export default function ProductReviewPolicyPage() {
  return (
    <StaticPage
      title="Product Review Policy"
      intro="Exactly how our product recommendations are made."
      path="/product-review-policy"
    >
      <h2>How products are selected</h2>
      <p>
        We start from the reader&apos;s problem, not from a brand&apos;s
        catalog. For each guide we map the realistic buyer needs (budget, space,
        household type), survey the current market, and shortlist products that
        credibly meet those needs. Availability across our main markets — the
        US, UK, Canada, and Europe — is part of the filter. No brand can pay to
        be included, and no brand can pay to be ranked higher.
      </p>
      <h2>Tested vs research-based</h2>
      <p>
        Every product guide states its review method near the top of the
        article:
      </p>
      <ul>
        <li>
          <strong>Tested</strong> — we personally used the product and describe
          our experience.
        </li>
        <li>
          <strong>Research-based</strong> — recommendations built on product
          specifications, feature comparison, capacity and sizing data, and
          documented buyer needs. Most of our guides fall in this category, and
          we never dress research up as hands-on testing.
        </li>
        <li>
          <strong>Expert-reviewed</strong> — a subject-matter expert has checked
          the guidance.
        </li>
        <li>
          <strong>Updated</strong> — a previously published guide refreshed for
          availability, pricing bands, and product changes.
        </li>
      </ul>
      <h2>What factors we consider</h2>
      <p>
        Depending on the category: build quality and materials, published
        specifications, footprint and sizing, ease of use and cleaning, running
        costs (bags, filters, subscriptions), renter-friendliness, and value for
        money over time. Cheapest is not our metric — cost per use is.
      </p>
      <h2>How recommendations are updated</h2>
      <p>
        Guides are reviewed on a rolling schedule and show a last-updated date.
        Discontinued products are replaced; significant market changes trigger a
        rework of the guide. Prices shown are typical ranges, not live prices —
        we tell readers to confirm current pricing on the retailer&apos;s page,
        and we never display live prices unless they are accurate and
        maintained.
      </p>
      <h2>How affiliate links work</h2>
      <p>
        When you buy through links in our guides, we may earn a commission from
        the retailer (such as Amazon) at no extra cost to you. Commissions are
        paid by retailers, are broadly similar across competing products, and
        play no role in which products we pick or how we rank them. Full
        details: <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>Why our opinions stay independent</h2>
      <p>
        The writers who choose products are held to our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link>: no payment for
        coverage, no advertiser influence on rankings, and honest wording about
        how conclusions were reached. A guide that recommends a worse product
        for a bigger commission would break the only asset this site has —
        reader trust — and we treat it that way.
      </p>
      <h2>Report outdated information</h2>
      <p>
        If you find a discontinued product, changed spec, or broken link in any
        guide, please <Link href="/contact">contact us</Link> with the article
        URL. Reader reports are one of our best update triggers, and we act on
        them quickly.
      </p>
    </StaticPage>
  );
}
