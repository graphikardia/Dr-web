export const LEADS_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzTLEzt8Isngldw4gjNaGI7lgyu9xWGc4Ocu6-2bRbFzl33g5VjL0jSv05f7qxyPw3dyQ/exec";

/**
 * Determines which tab of the leads spreadsheet a submission lands in.
 * Must stay in sync with the TABS map in public/apps_script_leads.gs.
 */
export type LeadSource = "chatbot" | "contact" | "help";

export interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  reason?: string;
  condition?: string;
  preferredDate?: string;
  page?: string;
}

export async function submitLead(
  source: LeadSource,
  payload: LeadPayload,
): Promise<void> {
  await fetch(LEADS_SHEET_URL, {
    method: "POST",
    mode: "no-cors" as RequestMode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      source,
      consent: "agreed",
      submittedAt: new Date().toISOString(),
    }),
  });
}
