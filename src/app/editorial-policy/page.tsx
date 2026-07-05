import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Policy",
  description:
    "How On Life Likes creates, reviews, updates, and corrects content — and how we keep editorial recommendations independent from advertising.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <StaticPage
      title="Editorial Policy"
      intro="The standards behind every article we publish."
      path="/editorial-policy"
    >
      <h2>Original, helpful content</h2>
      <p>
        On Life Likes creates original content written to solve real problems
        for real readers. We do not copy, scrape, or lightly rewrite other
        publications&apos; work, and we do not mass-produce thin pages to chase
        search traffic. Every article must earn its existence by being genuinely
        useful.
      </p>
      <h2>Human review before publishing</h2>
      <p>
        Every article is reviewed by a human editor before it goes live. Writers
        may use research tools in their workflow, but a person on our team is
        responsible for the accuracy, honesty, and usefulness of everything we
        publish — and their name is on it.
      </p>
      <h2>Regular updates</h2>
      <p>
        Products get discontinued, prices shift, and better options appear. We
        review published guides on a rolling schedule, and each article displays
        its last-updated date. Guides that can no longer be brought up to
        standard are revised or unpublished, not left to rot.
      </p>
      <h2>Clear affiliate disclosure</h2>
      <p>
        Any article containing affiliate links carries a disclosure at the top
        of the article, before any product recommendation. A site-wide
        disclosure also appears in our footer. Details:{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>No payment for positive reviews</h2>
      <p>
        We do not accept payment, free products in exchange for guaranteed
        coverage, or any other compensation in return for a positive
        recommendation. Brands cannot buy a place in our guides. If we ever
        publish sponsored content, it will be clearly and prominently labeled as
        such — and it will never be disguised as an editorial recommendation.
      </p>
      <h2>Editorial independence from advertising</h2>
      <p>
        Advertising (including Google AdSense) and affiliate relationships are
        managed separately from editorial decisions. The people who choose what
        we recommend do not answer to advertisers, and ad placements never
        influence rankings, picks, or conclusions.
      </p>
      <h2>Honest testing claims</h2>
      <p>
        We never claim first-hand product testing that did not happen. Every
        product guide states its review method: <strong>tested</strong> (we used
        the product), <strong>research-based</strong> (built on specifications,
        feature comparison, and buyer needs), <strong>expert-reviewed</strong>{" "}
        (checked by a subject-matter expert), or <strong>updated</strong>{" "}
        (refreshed for accuracy and availability). Most of our guides are
        research-based, and we say so plainly.
      </p>
      <h2>Corrections</h2>
      <p>
        When we get something wrong, we fix it. Significant corrections are
        noted in the article. To report an error, email{" "}
        <Link href="/contact">our editorial team</Link> with the article URL —
        we review correction reports promptly.
      </p>
      <h2>Expert review where necessary</h2>
      <p>
        For topics where mistakes have real consequences — safety, electrical
        devices, pet wellbeing — we seek expert review or defer to authoritative
        guidance, and we link readers to primary sources where appropriate.
      </p>
    </StaticPage>
  );
}
