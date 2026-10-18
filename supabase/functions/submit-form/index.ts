// Public form endpoint: validates, saves with the service role, emails via Resend.
// Secrets required: RESEND_API_KEY, FROM_EMAIL, NOTIFY_EMAIL, ALLOWED_ORIGINS (comma-separated).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Kind = "volunteer" | "service" | "contact";

const cors = (origin: string | null) => {
  const allowed = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const ok = origin && (allowed.length === 0 || allowed.includes(origin));
  return {
    "Access-Control-Allow-Origin": ok ? origin! : allowed[0] ?? "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
};

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const emailOk = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

async function sendEmail(to: string | string[], subject: string, html: string, replyTo?: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("FROM_EMAIL");
  if (!key || !from) return; // email not configured yet; the submission is still saved
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, headers);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, headers);
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (str(body.website, 200)) return json({ ok: true }, 200, headers);

  const kind = body.kind as Kind;
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const notify = Deno.env.get("NOTIFY_EMAIL");

  try {
    if (kind === "volunteer") {
      const row = {
        full_name: str(body.full_name, 120),
        email: str(body.email, 200).toLowerCase(),
        phone: str(body.phone, 40) || null,
        city: str(body.city, 80) || null,
        interests: Array.isArray(body.interests) ? body.interests.map((i) => str(i, 60)).filter(Boolean).slice(0, 12) : [],
        availability: str(body.availability, 300) || null,
        message: str(body.message, 2000) || null,
      };
      if (row.full_name.length < 2 || !emailOk(row.email)) return json({ error: "Name and a valid email are required." }, 400, headers);
      const { error } = await db.from("volunteer_signups").insert(row);
      if (error) throw error;
      await sendEmail(
        row.email,
        "Thanks for volunteering with So Fresh City",
        `<p>Hi ${esc(row.full_name)},</p><p>Thank you for signing up to volunteer. A member of our team will reach out soon about next steps.</p><p>— So Fresh City</p>`,
      );
      if (notify) await sendEmail(notify, `New volunteer: ${row.full_name}`, `<p>${esc(row.full_name)} (${esc(row.email)}) signed up.</p><p>Interests: ${esc(row.interests.join(", "))}</p><p>${esc(row.message ?? "")}</p>`, row.email);
    } else if (kind === "service") {
      const service = str(body.service, 20);
      const row = {
        full_name: str(body.full_name, 120),
        phone: str(body.phone, 40) || null,
        email: str(body.email, 200).toLowerCase() || null,
        preferred_city: str(body.preferred_city, 80) || null,
        service: ["haircut", "hygiene", "advocacy", "other"].includes(service) ? service : "other",
        message: str(body.message, 2000) || null,
        consent_to_contact: body.consent_to_contact === true,
      };
      if (row.full_name.length < 2 || (!row.phone && !row.email)) return json({ error: "Name and a phone or email are required." }, 400, headers);
      if (row.email && !emailOk(row.email)) return json({ error: "Please enter a valid email." }, 400, headers);
      const { error } = await db.from("service_requests").insert(row);
      if (error) throw error;
      if (row.email) {
        await sendEmail(row.email, "We got your request — So Fresh City", `<p>Hi ${esc(row.full_name)},</p><p>We received your request and will be in touch soon.</p><p>— So Fresh City</p>`);
      }
      if (notify) await sendEmail(notify, `New service request: ${row.service}`, `<p>${esc(row.full_name)} · ${esc(row.phone ?? "")} · ${esc(row.email ?? "")}</p><p>City: ${esc(row.preferred_city ?? "")}</p><p>${esc(row.message ?? "")}</p>`, row.email ?? undefined);
    } else if (kind === "contact") {
      const row = {
        full_name: str(body.full_name, 120),
        email: str(body.email, 200).toLowerCase(),
        subject: str(body.subject, 160) || null,
        message: str(body.message, 4000),
      };
      if (row.full_name.length < 2 || !emailOk(row.email) || row.message.length < 5) return json({ error: "Name, a valid email and a message are required." }, 400, headers);
      const { error } = await db.from("contact_messages").insert(row);
      if (error) throw error;
      if (notify) await sendEmail(notify, `Contact: ${row.subject ?? "New message"}`, `<p>From ${esc(row.full_name)} (${esc(row.email)})</p><p>${esc(row.message)}</p>`, row.email);
    } else {
      return json({ error: "Unknown form type" }, 400, headers);
    }
    return json({ ok: true }, 200, headers);
  } catch (e) {
    console.error(e);
    return json({ error: "Something went wrong. Please try again." }, 500, headers);
  }
});
