import Link from "next/link";

const badges = [
  {
    title: "Research-based guides",
    text: "We compare features, specifications, use cases, and buyer needs — and we state our review method on every guide.",
  },
  {
    title: "Human-reviewed",
    text: "Every article is reviewed by an editor before publishing and updated regularly for accuracy and availability.",
  },
  {
    title: "Clear disclosures",
    text: "When a guide includes affiliate links, we say so at the top. Commissions never influence what we recommend.",
  },
  {
    title: "Independent picks",
    text: "Brands can't pay for placement or positive coverage. Advertising stays separate from editorial recommendations.",
  },
];

/** Trust badge section explaining editorial standards. */
export function TrustSection() {
  return (
    <section aria-label="Our editorial standards" className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
      <h2 className="text-2xl font-bold text-ink">Why trust On Life Likes</h2>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/75">
        Our guides are written to help real people make practical decisions. We
        compare features, use cases, product details, buyer needs, and everyday
        value. When a guide includes affiliate links, we clearly disclose it.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => (
          <div key={b.title} className="rounded-2xl bg-second-tint/70 p-5">
            <p className="flex items-center gap-2 font-semibold text-brand-dark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l7 3v6c0 4.5-3 8.6-7 10-4-1.4-7-5.5-7-10V5l7-3z" stroke="#0C5E69" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#0C5E69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{b.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink/60">
        Read our{" "}
        <Link href="/editorial-policy" className="font-medium text-brand underline">
          Editorial Policy
        </Link>{" "}
        and{" "}
        <Link href="/product-review-policy" className="font-medium text-brand underline">
          Product Review Policy
        </Link>
        .
      </p>
    </section>
  );
}
