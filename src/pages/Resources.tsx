import { useEffect, useMemo, useState } from "react";
import { Clock, Globe, MapPin, Phone } from "lucide-react";
import { COUNTIES, RESOURCE_CATEGORIES } from "../lib/config";
import { supabase } from "../lib/supabase";

type Resource = {
  id: string;
  county: string;
  category: string;
  name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  hours: string | null;
};

const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

function ResourceCard({ r }: { r: Resource }) {
  return (
    <li className="card bg-white py-5">
      <h4 className="font-display text-lg font-extrabold">{r.name}</h4>
      {r.description && <p className="mt-1">{r.description}</p>}
      <ul className="mt-3 space-y-1 text-sm">
        {r.phone && (
          <li className="flex items-center gap-2">
            <Phone size={16} aria-hidden="true" />
            <a href={telHref(r.phone)} className="font-semibold underline">
              {r.phone}
            </a>
          </li>
        )}
        {r.address && (
          <li className="flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            {r.address}
          </li>
        )}
        {r.hours && (
          <li className="flex items-center gap-2">
            <Clock size={16} aria-hidden="true" />
            {r.hours}
          </li>
        )}
        {r.website && (
          <li className="flex items-center gap-2">
            <Globe size={16} aria-hidden="true" />
            <a href={r.website} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Website
            </a>
          </li>
        )}
        {r.email && (
          <li>
            <a href={`mailto:${r.email}`} className="font-semibold underline">
              {r.email}
            </a>
          </li>
        )}
      </ul>
    </li>
  );
}

export default function Resources() {
  const [rows, setRows] = useState<Resource[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    supabase
      .from("resources")
      .select("id,county,category,name,description,phone,email,website,address,hours")
      .eq("published", true)
      .order("sort_order")
      .order("name")
      .then(({ data, error }) => {
        if (error) setFailed(true);
        else setRows(data as Resource[]);
      });
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, Resource[]>>();
    for (const r of rows ?? []) {
      const byCat = map.get(r.county) ?? new Map<string, Resource[]>();
      byCat.set(r.category, [...(byCat.get(r.category) ?? []), r]);
      map.set(r.county, byCat);
    }
    return map;
  }, [rows]);

  return (
    <div className="section">
      <div className="container-x">
        <h1>Local resources</h1>
        <p className="mt-4 max-w-2xl text-lg">Housing, jobs, food, health care, and more, organized by county. Hours and services change, so call ahead when you can.</p>

        <nav aria-label="Jump to county" className="mt-6 flex flex-wrap gap-2">
          {COUNTIES.map((c) => (
            <a key={c.id} href={`#${c.id.toLowerCase().replace(/\s+/g, "-")}`} className="btn btn-soft">
              {c.label}
            </a>
          ))}
        </nav>

        {rows === null && !failed && <p className="mt-10">Loading…</p>}
        {failed && <p className="mt-10">We couldn't load resources right now. Please check back soon.</p>}

        {rows &&
          COUNTIES.map((county, i) => {
            const byCat = grouped.get(county.id);
            const cats = RESOURCE_CATEGORIES.filter((c) => byCat?.has(c.id));
            return (
              <section key={county.id} id={county.id.toLowerCase().replace(/\s+/g, "-")} className="mt-14 scroll-mt-24">
                <h2 className={`inline-block rounded-2xl border-2 border-ink px-5 py-2 ${i % 2 === 0 ? "bg-lavender" : "bg-mint"}`}>{county.label}</h2>
                {cats.length === 0 && <p className="card mt-6 bg-white">Resources for this county are coming soon.</p>}
                {cats.length > 1 && (
                  <nav aria-label={`${county.label} categories`} className="mt-5 flex flex-wrap gap-2">
                    {cats.map((c) => (
                      <a key={c.id} href={`#${county.id.toLowerCase().replace(/\s+/g, "-")}-${c.id}`} className="rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-semibold">
                        {c.label}
                      </a>
                    ))}
                  </nav>
                )}
                {cats.map((c) => (
                  <div key={c.id} id={`${county.id.toLowerCase().replace(/\s+/g, "-")}-${c.id}`} className="mt-8 scroll-mt-24">
                    <h3>{c.label}</h3>
                    <ul className="mt-4 grid gap-4 md:grid-cols-2">
                      {byCat!.get(c.id)!.map((r) => (
                        <ResourceCard key={r.id} r={r} />
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            );
          })}
      </div>
    </div>
  );
}
