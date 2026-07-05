"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Cookie consent for US/EU visitors.
 * - "accepted": analytics + ads scripts may load
 * - "essential": only essential cookies; no ad/analytics scripts
 * The choice is stored in localStorage and exposed via useConsent().
 */

type Consent = "accepted" | "essential" | null;

const ConsentContext = createContext<{
  consent: Consent;
  setConsent: (c: Exclude<Consent, null>) => void;
}>({ consent: null, setConsent: () => {} });

export function useConsent() {
  return useContext(ConsentContext);
}

const STORAGE_KEY = "onl-cookie-consent";

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "essential") setConsentState(stored);
    setLoaded(true);
  }, []);

  const setConsent = useCallback((c: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, c);
    setConsentState(c);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
      {loaded && consent === null && <CookieBanner onChoose={setConsent} />}
    </ConsentContext.Provider>
  );
}

function CookieBanner({
  onChoose,
}: {
  onChoose: (c: "accepted" | "essential") => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-beige bg-white p-4 shadow-[0_-4px_20px_rgb(52_78_65/0.12)] sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-pine/85">
          We use cookies to run this site and — with your permission — to show
          ads and measure traffic. You can accept all cookies or keep only the
          essential ones. Details in our{" "}
          <Link href="/cookie-policy" className="font-medium text-forest underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-medium text-forest underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => onChoose("essential")}
            className="rounded-full border-2 border-beige px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:border-sage hover:bg-sage-light"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => onChoose("accepted")}
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
