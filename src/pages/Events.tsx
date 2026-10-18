import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { supabase } from "../lib/supabase";

type EventRow = { id: string; title: string; description: string | null; city: string; venue: string | null; address: string | null; starts_at: string; ends_at: string | null };

const fmt = (iso: string) => new Date(iso).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function Events() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    supabase
      .from("events")
      .select("id,title,description,city,venue,address,starts_at,ends_at")
      .eq("status", "published")
      .gte("starts_at", new Date(Date.now() - 6 * 3600 * 1000).toISOString())
      .order("starts_at")
      .then(({ data, error }) => {
        if (error) setFailed(true);
        else setEvents(data as EventRow[]);
      });
  }, []);

  return (
    <div className="section">
      <div className="container-x max-w-3xl">
        <h1>Events</h1>
        <p className="mt-4 text-lg">Find an upcoming free haircut event near you.</p>
        <div className="mt-8 space-y-5">
          {events === null && !failed && <p>Loading…</p>}
          {failed && <p>We couldn't load events right now. Please check back soon.</p>}
          {events?.length === 0 && <p className="card bg-white">No events are scheduled yet. Check back soon or follow us for updates.</p>}
          {events?.map((e) => (
            <article key={e.id} className="card bg-mint">
              <h2 className="text-2xl">{e.title}</h2>
              <p className="mt-3 flex items-center gap-2 font-semibold">
                <Calendar size={18} aria-hidden="true" />
                {fmt(e.starts_at)}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <MapPin size={18} aria-hidden="true" />
                {[e.venue, e.address, e.city].filter(Boolean).join(" · ")}
              </p>
              {e.description && <p className="mt-3">{e.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
