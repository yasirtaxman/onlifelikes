"use client";

import Script from "next/script";
import { useConsent } from "./CookieNotice";

/**
 * Loads analytics and the AdSense library only after cookie consent.
 * Three options, all controlled by env vars (see .env.example):
 *  - Google Analytics 4  (NEXT_PUBLIC_GA_MEASUREMENT_ID)
 *  - Plausible (privacy-friendly, cookieless — loads regardless of consent
 *    because it sets no cookies)  (NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
 *  - Google AdSense       (NEXT_PUBLIC_ADSENSE_CLIENT)
 */
export function Analytics() {
  const { consent } = useConsent();
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const consented = consent === "accepted";

  return (
    <>
      {plausible && (
        <Script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {ga && consented && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {adsense && consented && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
