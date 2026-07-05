import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "On Life Likes helps readers find practical ideas, useful products, and smarter everyday solutions for a better home and easier routines.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage
      title="About On Life Likes"
      intro="Practical picks for better everyday living."
      path="/about"
    >
      <p>
        On Life Likes exists for one reason: everyday life gets easier when your
        home works with you instead of against you. We help readers across the
        US, UK, Canada, and Europe find practical ideas, useful products, and
        smarter everyday solutions — for a better home, easier routines, cleaner
        spaces, better work setups, and more comfortable living.
      </p>
      <h2>What we cover</h2>
      <p>
        Our guides focus on the rooms and routines where small improvements pay
        off daily: home organization, cleaning systems, kitchen tools,
        beginner-friendly smart home setups, small-space solutions, home
        offices, pet-friendly living, sleep, and outdoor spaces. Alongside the
        how-to content, we publish research-based buying guides, head-to-head
        product comparisons, and best-under-budget roundups.
      </p>
      <h2>How we work</h2>
      <p>
        Every article is written and reviewed by a real person on our editorial
        team. Our product guides state their review method plainly — tested,
        research-based, expert-reviewed, or updated — and we never claim
        hands-on testing that didn&apos;t happen. When we compare products, we
        compare specifications, features, use cases, and buyer needs, and we
        update guides as products and availability change. The full details are
        in our <Link href="/editorial-policy">Editorial Policy</Link> and{" "}
        <Link href="/product-review-policy">Product Review Policy</Link>.
      </p>
      <h2>How we make money</h2>
      <p>
        On Life Likes is supported by advertising and affiliate commissions.
        Some links on this site are affiliate links — if you buy through them we
        may earn a commission at no extra cost to you. {site.amazonAssociateLine}{" "}
        Commissions never decide what we recommend, and brands cannot pay for
        positive coverage. See our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for the
        full picture.
      </p>
      <h2>Meet the team</h2>
      <p>
        You can read about our writers and editors on the{" "}
        <Link href="/authors">Authors page</Link>. Questions, corrections, or
        ideas? We genuinely read our inbox —{" "}
        <Link href="/contact">get in touch</Link>.
      </p>
    </StaticPage>
  );
}
