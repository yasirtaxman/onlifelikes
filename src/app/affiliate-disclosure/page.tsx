import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How affiliate links work on On Life Likes: what we earn, what it costs you (nothing extra), and why it never changes our recommendations.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <StaticPage
      title="Affiliate Disclosure"
      intro="Plain-language honesty about how this site earns money."
      path="/affiliate-disclosure"
    >
      <p>
        Some links on On Life Likes are <strong>affiliate links</strong>. If you
        click one and make a purchase, the retailer pays us a small commission.
        You pay exactly the same price either way — the commission comes from
        the retailer, not from you.
      </p>
      <h2>Amazon Associates</h2>
      <p>
        On Life Likes is a participant in the Amazon Services LLC Associates
        Program and equivalent Amazon associate programs in the UK, Canada,
        Germany, France, Spain, and Italy — affiliate advertising programs
        designed to provide a means for sites to earn advertising fees by
        advertising and linking to Amazon.{" "}
        <strong>{site.amazonAssociateLine}</strong>
      </p>
      <h2>Where you'll see disclosures</h2>
      <ul>
        <li>
          At the top of every article that contains affiliate links, before any
          recommendation.
        </li>
        <li>In the footer of every page on the site.</li>
        <li>On this page, in full.</li>
      </ul>
      <h2>What affiliate links never change</h2>
      <p>
        Which products we recommend, how we rank them, and what we say about
        their downsides. Commissions are broadly similar across competing
        products in a category, which means there is no financial reason to
        prefer one pick over another — and our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link> forbids it
        anyway. We routinely recommend products we earn nothing from when
        they&apos;re the right answer.
      </p>
      <h2>About prices</h2>
      <p>
        Prices and availability of products mentioned on this site may change at
        any time. Unless explicitly stated otherwise, any price information is a
        typical range at the time of writing, not a live price — always confirm
        the current price on the retailer&apos;s page before buying.
      </p>
      <h2>Questions</h2>
      <p>
        If anything about our affiliate relationships is unclear,{" "}
        <Link href="/contact">ask us directly</Link> — we&apos;re happy to
        explain.
      </p>
    </StaticPage>
  );
}
