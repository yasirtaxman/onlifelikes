import type { Faq } from "@/lib/types";
import { InlineText } from "./InlineText";

/** Accessible FAQ accordion using native <details> — zero JavaScript. */
export function FaqAccordion({
  faqs,
  title = "Frequently asked questions",
}: {
  faqs: Faq[];
  title?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className="my-10" aria-label={title}>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-5 space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-line bg-white shadow-card open:border-second"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
              {faq.question}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-brand transition-transform group-open:rotate-180"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="border-t border-mist px-5 py-4 text-[15px] leading-relaxed text-ink/85">
              <InlineText text={faq.answer} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
