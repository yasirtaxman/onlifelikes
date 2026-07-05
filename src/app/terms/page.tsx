import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "The terms and conditions for using onlifelikes.com — content usage, intellectual property, and limitations of liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage
      title="Terms and Conditions"
      intro="Last updated: July 5, 2026"
      path="/terms"
    >
      <p>
        By accessing {site.domain} you agree to these terms. If you do not
        agree, please do not use the site.
      </p>
      <h2>Use of content</h2>
      <p>
        All content on this site — text, graphics, logos, and layout — is the
        property of {site.name} or its licensors and is protected by copyright.
        You may read, share links to, and quote brief excerpts of our content
        with attribution. You may not republish, scrape, or commercially
        redistribute substantial portions of the site without written
        permission.
      </p>
      <h2>Informational purposes only</h2>
      <p>
        Our content is general information and opinion, provided in good faith.
        It is not professional, financial, medical, veterinary, legal, or
        safety advice. Product decisions and their consequences are your own —
        see our <Link href="/disclaimer">Disclaimer</Link>.
      </p>
      <h2>Affiliate links and third parties</h2>
      <p>
        The site contains links to third-party websites, including affiliate
        links to retailers such as Amazon (see our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>). We are
        not responsible for the content, pricing, availability, or practices of
        third-party sites. Prices and availability of products mentioned may
        change at any time.
      </p>
      <h2>No warranties</h2>
      <p>
        The site is provided &quot;as is&quot; without warranties of any kind.
        While we work hard to keep information accurate and updated, we do not
        guarantee completeness, accuracy, or fitness for a particular purpose.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {site.name} shall not be liable
        for any indirect, incidental, or consequential damages arising from
        your use of the site or reliance on its content.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time; the date above reflects
        the latest revision. Continued use of the site after changes
        constitutes acceptance.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${site.email.contact}`}>{site.email.contact}</a>.
      </p>
    </StaticPage>
  );
}
