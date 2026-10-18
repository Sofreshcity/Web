import { Link } from "react-router-dom";
import { Scissors, Sparkles, Megaphone } from "lucide-react";
import { DONATE_URL } from "../lib/config";

const pillars = [
  { icon: Scissors, title: "Free haircuts", body: "Professional-quality cuts for people who need them, delivered with respect.", color: "bg-lavender" },
  { icon: Sparkles, title: "Hygiene services", body: "Care and supplies that help people feel clean, confident, and ready for the day.", color: "bg-mint" },
  { icon: Megaphone, title: "Social advocacy", body: "Connecting neighbors to the resources and opportunities that support employment readiness.", color: "bg-peach" },
];

export default function Home() {
  return (
    <>
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-4 inline-block rounded-full border-2 border-ink bg-rose px-4 py-1 font-display text-xs font-bold uppercase tracking-wider">San Francisco &amp; Alameda County</p>
            <h1>Free haircuts. Real dignity.</h1>
            <p className="mt-6 max-w-xl text-lg">So Fresh City is a 501(c)(3) nonprofit serving the San Francisco Bay Area with free haircuts, hygiene services, and social advocacy for people in need.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-primary">
                Request a service
              </Link>
              <Link to="/get-involved" className="btn btn-soft">
                Volunteer
              </Link>
              {DONATE_URL && (
                <Link to="/donate" className="btn btn-soft">
                  Donate
                </Link>
              )}
            </div>
          </div>
          <div className="card bg-lavender lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl">Looking sharp is a first step.</h2>
            <p className="mt-3">A fresh cut can change how someone feels walking into an interview, a clinic, or a new chapter.</p>
          </div>
        </div>
      </section>

      <section className="section border-y-2 border-ink bg-white">
        <div className="container-x">
          <h2>What we do</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body, color }) => (
              <div key={title} className={`card ${color}`}>
                <Icon aria-hidden="true" />
                <h3 className="mt-4">{title}</h3>
                <p className="mt-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <div className="card bg-mint">
            <h2 className="text-2xl sm:text-3xl">Find an event</h2>
            <p className="mt-2">See where our next haircut event is happening.</p>
            <Link to="/events" className="btn btn-primary mt-5">
              View events
            </Link>
          </div>
          <div className="card bg-peach">
            <h2 className="text-2xl sm:text-3xl">Join the team</h2>
            <p className="mt-2">Barbers, stylists, organizers, and everyday helpers are all welcome.</p>
            <Link to="/get-involved" className="btn btn-primary mt-5">
              Become a volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
