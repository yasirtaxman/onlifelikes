import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Advertise With Us",
  description:
    "Advertising and partnership opportunities with On Life Likes — display advertising and clearly labeled sponsored placements that respect our editorial independence.",
  path: "/advertise",
});

export default function AdvertisePage() {
  return (
    <StaticPage
      title="Advertise with us"
      intro="Reach home-focused readers across the US, UK, Canada, and Europe."
      path="/advertise"
    >
      <p>
        On Life Likes reaches readers actively improving their homes — people
        researching purchases for their kitchens, cleaning routines, home
        offices, and small spaces. If your brand fits that audience, we&apos;d
        like to hear from you.
      </p>
      <h2>What we offer</h2>
      <ul>
        <li>Display advertising placements across the site.</li>
        <li>
          Clearly labeled sponsored content, where relevant to our readers.
        </li>
        <li>Newsletter sponsorship (as our list grows).</li>
      </ul>
      <h2>What we don&apos;t offer</h2>
      <p>
        We do not sell positive reviews, guaranteed placements in buying
        guides, undisclosed sponsored posts, or links disguised as editorial
        recommendations. Our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link> keeps advertising
        and editorial strictly separate — that separation is what makes our
        audience worth reaching.
      </p>
      <h2>Get in touch</h2>
      <p>
        Email <a href={`mailto:${site.email.advertise}`}>{site.email.advertise}</a>{" "}
        with your brand, goals, and timing, and we&apos;ll reply with current
        options and audience details.
      </p>
    </StaticPage>
  );
}
