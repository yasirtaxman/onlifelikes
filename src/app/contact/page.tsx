import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact the On Life Likes team — editorial questions, corrections, advertising, and general inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage
      title="Contact us"
      intro="We read everything. Here's where to send it."
      path="/contact"
    >
      <h2>General &amp; editorial</h2>
      <p>
        Questions about an article, a correction, outdated product information,
        or a topic you&apos;d like us to cover:{" "}
        <a href={`mailto:${site.email.editorial}`}>{site.email.editorial}</a>
      </p>
      <h2>Everything else</h2>
      <p>
        General inquiries: <a href={`mailto:${site.email.contact}`}>{site.email.contact}</a>
      </p>
      <h2>Advertising &amp; partnerships</h2>
      <p>
        For advertising opportunities, see{" "}
        <Link href="/advertise">Advertise With Us</Link> or email{" "}
        <a href={`mailto:${site.email.advertise}`}>{site.email.advertise}</a>.
        Please note: we do not accept payment for positive reviews or
        undisclosed sponsored content — read our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link> before pitching.
      </p>
      <h2>Reporting outdated information</h2>
      <p>
        Products change faster than any site can track alone. If you spot a
        discontinued product, a broken link, or a spec that&apos;s changed,
        email us with the article URL and we&apos;ll review it — usually within
        a few business days.
      </p>
      <p>
        We aim to respond to all messages within 3–5 business days.
      </p>
    </StaticPage>
  );
}
