import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How On Life Likes collects, uses, and protects personal data — including cookies, analytics, advertising, and your rights under GDPR and CCPA.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPage
      title="Privacy Policy"
      intro={`Last updated: July 5, 2026 · Applies to ${site.domain}`}
      path="/privacy-policy"
    >
      <p>
        This policy explains what data On Life Likes (&quot;we&quot;,
        &quot;us&quot;) collects when you visit {site.domain}, how we use it,
        and the choices you have. We designed this site to collect as little
        personal data as possible.
      </p>
      <h2>Data we collect</h2>
      <ul>
        <li>
          <strong>Usage data (with your consent):</strong> if you accept
          cookies, analytics tools may collect anonymized information such as
          pages viewed, approximate location (country/region), device type, and
          referral source. IP addresses are anonymized where the tool supports
          it.
        </li>
        <li>
          <strong>Newsletter data:</strong> if you subscribe, we store your
          email address with our newsletter provider solely to send you the
          newsletter. You can unsubscribe at any time via the link in every
          email.
        </li>
        <li>
          <strong>Contact data:</strong> if you email us, we keep the
          correspondence for as long as needed to handle your request.
        </li>
      </ul>
      <h2>Cookies and consent</h2>
      <p>
        On your first visit we ask whether you accept all cookies or only
        essential ones. Advertising and analytics scripts load{" "}
        <strong>only after you accept</strong>. You can change your mind at any
        time by clearing this site&apos;s data in your browser, which resets the
        choice. Details of each cookie category are in our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
      <h2>Advertising</h2>
      <p>
        We use Google AdSense to display advertising. Google and its partners
        may use cookies to serve ads based on your prior visits to this or
        other websites. You can opt out of personalized advertising at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . Visitors in the EEA and UK are shown ads in line with Google&apos;s
        EU user consent policy.
      </p>
      <h2>Affiliate links</h2>
      <p>
        When you click an affiliate link (for example to Amazon), the retailer
        may set cookies to attribute your purchase. This is governed by the
        retailer&apos;s own privacy policy. See our{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>Legal bases (GDPR)</h2>
      <p>
        For visitors in the EEA/UK: we process usage data on the basis of your
        consent (Art. 6(1)(a) GDPR), newsletter data on the basis of consent,
        and contact data on the basis of legitimate interest in responding to
        you (Art. 6(1)(f)).
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on your location (GDPR in the EU/UK, CCPA/CPRA in California,
        and similar laws elsewhere), you may have the right to access, correct,
        delete, or export your personal data, to object to processing, and to
        withdraw consent. To exercise any right, email{" "}
        <a href={`mailto:${site.email.contact}`}>{site.email.contact}</a>. We do
        not sell personal information.
      </p>
      <h2>Data retention and security</h2>
      <p>
        We keep personal data only as long as needed for the purposes above.
        The site is served over HTTPS, and access to any stored personal data
        is limited to the people who need it.
      </p>
      <h2>Children</h2>
      <p>
        This site is not directed at children under 16 and we do not knowingly
        collect their data.
      </p>
      <h2>Changes and contact</h2>
      <p>
        We&apos;ll update this policy when our practices change and revise the
        date above. Questions:{" "}
        <a href={`mailto:${site.email.contact}`}>{site.email.contact}</a>.
      </p>
    </StaticPage>
  );
}
