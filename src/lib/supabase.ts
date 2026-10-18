import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "http://localhost:54321";
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || "missing-key";

export const supabase = createClient(SUPABASE_URL, anonKey);
