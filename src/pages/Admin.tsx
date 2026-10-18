import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { CITIES } from "../lib/config";

type Row = Record<string, any>;
type Tab = "events" | "volunteer_signups" | "service_requests" | "contact_messages";

const TABS: { id: Tab; label: string }[] = [
  { id: "events", label: "Events" },
  { id: "volunteer_signups", label: "Volunteers" },
  { id: "service_requests", label: "Service requests" },
  { id: "contact_messages", label: "Messages" },
];
const STATUSES = ["new", "in_progress", "done", "archived"];

function toCsv(rows: Row[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const cell = (v: unknown) => {
    let s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s; // avoid spreadsheet formula injection
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
}

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Login() {
  const [error, setError] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
    if (error) setError(error.message);
  }
  return (
    <form onSubmit={onSubmit} className="card mx-auto mt-10 max-w-sm space-y-4 bg-white">
      <h1 className="text-3xl sm:text-3xl">Staff login</h1>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className="input" autoComplete="username" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required className="input" autoComplete="current-password" />
      </div>
      {error && <p role="alert" className="font-semibold text-red-700">{error}</p>}
      <button className="btn btn-primary">Sign in</button>
    </form>
  );
}

function EventsManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  const load = useCallback(async () => {
    const { data, error } = await supabase.from("events").select("*").order("starts_at", { ascending: false });
    if (error) setErr(error.message);
    else setRows(data ?? []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const { error } = await supabase.from("events").insert({
      title: fd.get("title"),
      city: fd.get("city"),
      venue: fd.get("venue") || null,
      address: fd.get("address") || null,
      description: fd.get("description") || null,
      starts_at: new Date(String(fd.get("starts_at"))).toISOString(),
      status: fd.get("status"),
    });
    if (error) setErr(error.message);
    else {
      setErr("");
      form.reset();
      load();
    }
  }
  const setStatus = async (id: string, status: string) => {
    await supabase.from("events").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="card grid gap-4 bg-white sm:grid-cols-2">
        <div className="sm:col-span-2"><label className="label" htmlFor="title">Title</label><input id="title" name="title" required className="input" /></div>
        <div><label className="label" htmlFor="starts_at">Starts</label><input id="starts_at" name="starts_at" type="datetime-local" required className="input" /></div>
        <div><label className="label" htmlFor="city">City</label><select id="city" name="city" className="input">{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label className="label" htmlFor="venue">Venue</label><input id="venue" name="venue" className="input" /></div>
        <div><label className="label" htmlFor="address">Address</label><input id="address" name="address" className="input" /></div>
        <div className="sm:col-span-2"><label className="label" htmlFor="description">Description</label><textarea id="description" name="description" rows={3} className="input" /></div>
        <div><label className="label" htmlFor="status">Status</label><select id="status" name="status" className="input" defaultValue="published"><option value="published">published</option><option value="draft">draft</option></select></div>
        <div className="flex items-end"><button className="btn btn-primary">Add event</button></div>
        {err && <p role="alert" className="font-semibold text-red-700 sm:col-span-2">{err}</p>}
      </form>

      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.id} className="card flex flex-wrap items-center justify-between gap-3 bg-white py-4">
            <div>
              <p className="font-display font-bold">{r.title}</p>
              <p className="text-sm">{new Date(r.starts_at).toLocaleString()} · {r.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="input w-auto py-1.5" aria-label="Status">
                {["draft", "published", "cancelled"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => remove(r.id)} className="btn btn-soft py-1.5">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Submissions({ table }: { table: Exclude<Tab, "events"> }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState("");
  const load = useCallback(async () => {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) setErr(error.message);
    else setRows(data ?? []);
  }, [table]);
  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    await supabase.from(table).update({ status }).eq("id", id);
    load();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">{rows.length} total</p>
        <button className="btn btn-soft" onClick={() => download(`${table}.csv`, toCsv(rows))} disabled={!rows.length}>Export CSV</button>
      </div>
      {err && <p role="alert" className="mb-3 font-semibold text-red-700">{err}</p>}
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.id} className="card bg-white py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display font-bold">{r.full_name}</p>
                <p className="text-sm">{[r.email, r.phone].filter(Boolean).join(" · ")} · {new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="input w-auto py-1.5" aria-label="Status">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            {(r.subject || r.service || r.interests?.length > 0) && (
              <p className="mt-2 text-sm font-semibold">{[r.subject, r.service, r.preferred_city, r.city, r.interests?.join(", ")].filter(Boolean).join(" · ")}</p>
            )}
            {(r.message || r.availability) && <p className="mt-2 whitespace-pre-wrap text-sm">{[r.availability && `Availability: ${r.availability}`, r.message].filter(Boolean).join("\n")}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("events");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(null);
    supabase.rpc("is_admin").then(({ data }) => setIsAdmin(data === true));
  }, [session]);

  return (
    <div className="section">
      <div className="container-x">
        {session === undefined && <p>Loading…</p>}
        {session === null && <Login />}
        {session && isAdmin === false && (
          <div className="card max-w-md bg-peach">
            <p className="font-semibold">This account doesn't have admin access.</p>
            <button className="btn btn-primary mt-4" onClick={() => supabase.auth.signOut()}>Sign out</button>
          </div>
        )}
        {session && isAdmin && (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-4xl sm:text-4xl">Dashboard</h1>
              <button className="btn btn-soft" onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
            <div role="tablist" className="mb-6 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`btn ${tab === t.id ? "btn-primary" : "btn-soft"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            {tab === "events" ? <EventsManager /> : <Submissions key={tab} table={tab} />}
          </>
        )}
      </div>
    </div>
  );
}
