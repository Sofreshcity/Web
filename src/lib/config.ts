export const CITIES = ["San Francisco", "Oakland", "Alameda County", "Other"] as const;

export const DONATE_URL = (import.meta.env.VITE_DONATE_URL as string | undefined) || "";
export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || "";

export const VOLUNTEER_INTERESTS = [
  "Haircuts & grooming",
  "Hygiene kits",
  "Event setup & logistics",
  "Outreach",
  "Social media & design",
  "Grant writing",
  "Photography & video",
] as const;
