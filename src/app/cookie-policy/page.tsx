import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Which cookies On Life Likes uses, what they do, and how to control them — including the consent banner for US and EU visitors.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <StaticPage
      title="Cookie Policy"
      intro="Last updated: July 5, 2026"
      path="/cookie-policy"
    >
      <p>
        Cookies are small files stored in your browser. Here is exactly how{" "}
        {site.domain} uses them — and how you stay in control.
      </p>
      <h2>Essential (always on)</h2>
      <p>
        A single local-storage entry remembers your cookie choice so we
        don&apos;t ask on every visit. It contains no personal data and is not
        shared with anyone.
      </p>
      <h2>Analytics (only with consent)</h2>
      <p>
        If you accept all cookies, analytics tools (such as Google Analytics 4)
        may set cookies to measure page views and traffic sources with
        anonymized IPs. If this site uses Plausible Analytics instead, no
        analytics cookies are set at all — Plausible is cookieless by design.
      </p>
      <h2>Advertising (only with consent)</h2>
      <p>
        If you accept all cookies, Google AdSense and its certified partners
        may set cookies to serve and measure ads, including personalized ads
        based on your visits to this and other sites. Manage ad personalization
        at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>
      <h2>Affiliate cookies</h2>
      <p>
        Clicking a link to a retailer such as Amazon may set cookies on the
        retailer&apos;s domain to attribute purchases. These are governed by the
        retailer&apos;s own policies — see our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>Your choices</h2>
      <ul>
        <li>
          Choose <strong>&quot;Essential only&quot;</strong> in our banner and
          no advertising or analytics scripts load at all.
        </li>
        <li>
          Change your mind anytime: clear this site&apos;s browsing data (or
          just local storage) and the banner will ask again on your next visit.
        </li>
        <li>
          Your browser can also block or delete cookies globally — see its
          privacy settings.
        </li>
      </ul>
      <p>
        More on how we handle data overall:{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </StaticPage>
  );
}
