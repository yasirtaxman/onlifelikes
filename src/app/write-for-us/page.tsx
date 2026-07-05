import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Write for Us",
  description:
    "Pitch On Life Likes — what we look for in contributors and why we don't auto-accept guest posts.",
  path: "/write-for-us",
});

export default function WriteForUsPage() {
  return (
    <StaticPage
      title="Write for us"
      intro="We work with a small number of genuinely good writers."
      path="/write-for-us"
    >
      <p>
        On Life Likes occasionally works with freelance writers who know home,
        kitchen, smart home, or small-space topics deeply. We are selective:
        every article on this site goes through human editorial review and must
        meet our <Link href="/editorial-policy">Editorial Policy</Link>.
      </p>
      <h2>Please note before pitching</h2>
      <ul>
        <li>
          <strong>We do not auto-accept guest posts.</strong> Most guest-post
          and link-placement pitches are declined.
        </li>
        <li>We do not publish paid links or undisclosed sponsored content.</li>
        <li>
          We do not accept content written to promote a specific brand or
          product in exchange for compensation, unless clearly labeled as
          advertising (see <Link href="/advertise">Advertise With Us</Link>).
        </li>
        <li>AI-generated bulk submissions are declined without reply.</li>
      </ul>
      <h2>What a good pitch looks like</h2>
      <ul>
        <li>A specific working title and 3–4 sentence outline.</li>
        <li>Why you&apos;re the right person to write it.</li>
        <li>Two writing samples you&apos;re proud of.</li>
      </ul>
      <p>
        Send pitches to{" "}
        <a href={`mailto:${site.email.editorial}`}>{site.email.editorial}</a>{" "}
        with the subject line &quot;Pitch: [your topic]&quot;. If it&apos;s a
        fit, we&apos;ll reply within two weeks with rates and a brief.
      </p>
    </StaticPage>
  );
}
