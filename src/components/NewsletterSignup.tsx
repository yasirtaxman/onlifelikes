"use client";

import { useState } from "react";

/**
 * Newsletter signup. Posts to NEXT_PUBLIC_NEWSLETTER_ACTION (Mailchimp,
 * Buttondown, ConvertKit form endpoint…). Until that's configured, it shows
 * a friendly confirmation without sending data anywhere.
 */
export function NewsletterSignup() {
  const action = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION;
  const [done, setDone] = useState(false);

  return (
    <section
      aria-label="Newsletter signup"
      className="rounded-3xl bg-brand px-6 py-10 text-center text-white sm:px-10"
    >
      <h2 className="text-2xl font-bold">Get one practical idea a week</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/80">
        Join our free newsletter for home ideas, honest buying guides, and
        small-space solutions — no spam, unsubscribe anytime.
      </p>
      {done ? (
        <p className="mt-6 font-semibold text-accent">
          Thanks — you&apos;re on the list! 🌿
        </p>
      ) : (
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          action={action || undefined}
          method={action ? "post" : undefined}
          onSubmit={(e) => {
            if (!action) {
              e.preventDefault();
              setDone(true);
            }
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-white/20 bg-brand-dark px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-2 focus:outline-accent/60"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-ink-dark transition-colors hover:bg-white"
          >
            Subscribe
          </button>
        </form>
      )}
      <p className="mt-4 text-xs text-white/50">
        We respect your privacy. Read our privacy policy for details.
      </p>
    </section>
  );
}
