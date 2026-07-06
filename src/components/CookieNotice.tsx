"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Cookie consent for US/EU visitors.
 * - "accepted": analytics + ads scripts may load
 * - "essential": only essential cookies; no ad/analytics scripts
 * - null: no choice yet (banner is shown)
 * - "unknown": server render / before hydration (banner hidden, no scripts)
 * The choice lives in localStorage, read through useSyncExternalStore so
 * the banner and script gates stay in sync across tabs with no effects.
 */

type Consent = "accepted" | "essential" | null | "unknown";

const STORAGE_KEY = "onl-cookie-consent";
const CONSENT_EVENT = "onl-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Consent {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "essential" ? stored : null;
}

function getServerSnapshot(): Consent {
  return "unknown";
}

const ConsentContext = createContext<{
  consent: Consent;
  setConsent: (c: "accepted" | "essential") => void;
}>({ consent: "unknown", setConsent: () => {} });

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setConsent = useCallback((c: "accepted" | "essential") => {
    localStorage.setItem(STORAGE_KEY, c);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
      {consent === null && <CookieBanner onChoose={setConsent} />}
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-[0_-4px_20px_rgb(68_68_66/0.14)] sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-ink/85">
          We use cookies to run this site and — with your permission — to show
          ads and measure traffic. You can accept all cookies or keep only the
          essential ones. Details in our{" "}
          <Link href="/cookie-policy" className="font-medium text-brand underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-medium text-brand underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => onChoose("essential")}
            className="rounded-full border-2 border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-second hover:bg-second-tint"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => onChoose("accepted")}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
