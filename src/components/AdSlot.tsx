"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "./CookieNotice";

/**
 * AdSense slot with a fixed-height reservation to prevent layout shift.
 * - Renders a quiet placeholder until NEXT_PUBLIC_ADSENSE_CLIENT is set
 *   AND the visitor has accepted cookies (US/EU consent friendly).
 * - Never contains wording that encourages clicking ads.
 */

const SLOT_IDS: Record<string, string | undefined> = {
  "in-article": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

export function AdSlot({
  position = "in-article",
  className = "",
}: {
  position?: "in-article" | "sidebar" | "footer";
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = SLOT_IDS[position];
  const { consent } = useConsent();
  const ref = useRef<HTMLModElement>(null);
  const active = Boolean(client && slot && consent === "accepted");

  useEffect(() => {
    if (!active || !ref.current) return;
    try {
      // @ts-expect-error — adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet; it picks the slot up on load.
    }
  }, [active]);

  return (
    <div
      className={`mx-auto my-8 w-full max-w-3xl ${className}`}
      style={{ minHeight: 250 }}
      aria-hidden="true"
    >
      {active ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block", minHeight: 250 }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-beige bg-beige-light/50">
          <span className="text-xs uppercase tracking-widest text-pine/35">
            Advertisement
          </span>
        </div>
      )}
    </div>
  );
}
