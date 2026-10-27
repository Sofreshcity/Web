import CommunityPhoto from "../components/CommunityPhoto";
import { gallery } from "../data/gallery";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  city: string;
  venue: string | null;
  address: string | null;
  starts_at: string;
  ends_at: string | null;
};

// Dates include Pacific daylight/standard offsets so event times don't shift
// when visitors view the website from another timezone.
const featuredEvents: EventRow[] = [
  {
    id: "sfc-dish-tenant-appreciation-2026",
    title: "DISH Tenant Appreciation Party",
    description: "Free haircuts for guests.",
    city: "San Francisco, CA",
    venue: "DISH Tenant Appreciation Party",
    address: "240 Turk Street",
    starts_at: "2026-10-22T12:00:00-07:00",
    ends_at: "2026-10-22T15:00:00-07:00",
  },
  {
    id: "sfc-berkeley-dia-de-los-muertos-2026",
    title: "Berkeley Día de los Muertos Celebration",
    description: "Haircuts for students and youth, various youth activities, and resources.",
    city: "Berkeley, CA",
    venue: "Sylvia Mendez Elementary School",
    address: "2840 Ellsworth Street",
    starts_at: "2026-10-24T11:00:00-07:00",
    ends_at: "2026-10-24T16:00:00-07:00",
  },
  {
    id: "sfc-mercy-housing-4th-street-2026",
    title: "Mercy Housing at 4th Street",
    description: "Free haircuts for guests.",
    city: "San Francisco, CA",
    venue: "Mercy Housing",
    address: "1180 4th Street",
    starts_at: "2026-11-04T13:00:00-08:00",
    ends_at: "2026-11-04T17:00:00-08:00",
  },
  {
    id: "sfc-mercy-housing-china-basin-2026",
    title: "Mercy Housing at China Basin",
    description: "Free haircuts for guests.",
    city: "San Francisco, CA",
    venue: "Mercy Housing",
    address: "691 China Basin Street",
    starts_at: "2026-11-12T16:00:00-08:00",
    ends_at: null,
  },
];

const eventDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const eventTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
  });

const displayTime = (event: EventRow) =>
  event.ends_at
    ? `${eventTime(event.starts_at)} – ${eventTime(event.ends_at)}`
    : `${eventTime(event.starts_at)} start`;

export default function Events() {
  const [onlineEvents, setOnlineEvents] = useState<EventRow[]>([]);
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
        else setOnlineEvents((data ?? []) as EventRow[]);
      });
  }, []);

  const currentTime = Date.now();
  const scheduled = [...featuredEvents, ...onlineEvents]
    .filter((e) => new Date(e.ends_at ?? e.starts_at).getTime() >= currentTime)
    .filter((event, index, all) =>
      all.findIndex((candidate) =>
        candidate.title.trim().toLowerCase() === event.title.trim().toLowerCase() &&
        candidate.starts_at.slice(0, 10) === event.starts_at.slice(0, 10)
      ) === index
    )
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());

  return (
    <div className="section">
      <div className="container-x max-w-3xl">
        <h1>Events</h1>
        <p className="mt-4 text-lg">
          Join So Fresh City at upcoming community events for free haircuts and resources.
        </p>
        <CommunityPhoto photo={gallery[6]} className="mt-8 aspect-[16/9] w-full max-w-md rounded-3xl border-2 border-ink" />
        <div className="mt-8 space-y-5">
          {scheduled.length === 0 && (
            <p className="card bg-white">
              No upcoming events are scheduled yet. Check back soon or follow us for updates.
            </p>
          )}
          {scheduled.map((e) => (
            <article key={e.id} className="card bg-mint">
              <h2 className="text-2xl">{e.title}</h2>
              <p className="mt-3 flex items-center gap-2 font-semibold">
                <Calendar size={18} aria-hidden="true" />
                {eventDate(e.starts_at)}
              </p>
              <p className="mt-2 flex items-center gap-2 font-semibold">
                <Clock size={18} aria-hidden="true" />
                {displayTime(e)}
              </p>
              <p className="mt-2 flex items-start gap-2">
                <MapPin size={18} className="mt-1 shrink-0" aria-hidden="true" />
                <span>{[e.venue, e.address, e.city].filter(Boolean).join(" · ")}</span>
              </p>
              {e.description && <p className="mt-3">{e.description}</p>}
            </article>
          ))}
          {failed && (
            <p className="text-sm text-ink/70">
              Additional community events may be temporarily unavailable.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
