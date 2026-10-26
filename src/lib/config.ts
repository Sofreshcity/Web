export const CITIES = ["San Francisco", "Oakland", "Alameda County", "Other"] as const;

export const COUNTIES = [
  { id: "San Francisco", label: "San Francisco County" },
  { id: "Alameda", label: "Alameda County" },
  { id: "Santa Clara", label: "Santa Clara County" },
  { id: "Marin", label: "Marin County" },
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
  { id: "youth_family", label: "Youth & families" },
  { id: "recovery", label: "Addiction recovery" },
  { id: "veterans", label: "Veterans support" },
  { id: "education", label: "Education & literacy" },
  { id: "community", label: "Community advocacy" },
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
