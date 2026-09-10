import { useEffect, useState } from "react";
import { LEGAL_PATHS } from "@/data/site";

const CONSENT_KEY = "drd-consent";

type ConsentValue = "accepted" | "declined";

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
}

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      const timer = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!open) return null;

  const handleChoice = (value: ConsentValue) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-20 md:bottom-6 inset-x-0 z-50 flex justify-center px-4"
    >
      <div className="bg-card shadow-lg border rounded-xl p-4 sm:p-5 max-w-2xl w-full">
        <p className="text-sm text-foreground/80 leading-relaxed">
          This website does not use tracking or advertising cookies. We only
          store your preference and basic settings in your browser, and embedded
          content (Instagram, Google Maps) may set its own cookies. See our{" "}
          <a
            href={LEGAL_PATHS.cookies}
            className="font-medium text-primary underline underline-offset-2"
          >
            Cookie Policy
          </a>{" "}
          and{" "}
          <a
            href={LEGAL_PATHS.privacy}
            className="font-medium text-primary underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-3 mt-4 justify-end">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};