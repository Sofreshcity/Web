export const CITIES = ["San Francisco", "Oakland", "Alameda County", "Other"] as const;

export const COUNTIES = [
  { id: "San Francisco", label: "San Francisco County" },
  { id: "Alameda", label: "Alameda County" },
] as const;

export const RESOURCE_CATEGORIES = [
  { id: "housing", label: "Housing" },
  { id: "employment", label: "Employment" },
  { id: "food", label: "Food" },
  { id: "health", label: "Health care" },
  { id: "mental_health", label: "Mental health" },
  { id: "legal", label: "Legal help" },
  { id: "reentry", label: "Reentry support" },
  { id: "id_documents", label: "ID & documents" },
  { id: "other", label: "Other" },
] as const;

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
