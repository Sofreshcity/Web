import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, HeartHandshake, MapPin, Mail, Scissors } from "lucide-react";
import NewsletterForm from "../components/NewsletterForm";

const topics = [
  { icon: CalendarDays, title: "Events & outreach", body: "Get the latest on free haircut days, community gatherings, and outreach opportunities.", color: "bg-mint" },
  { icon: Scissors, title: "Stories from the chair", body: "Meet the barbers, volunteers, and neighbors who make So Fresh City possible.", color: "bg-peach" },
  { icon: MapPin, title: "Community resources", body: "Learn about useful local services and connections in San Francisco and Alameda County.", color: "bg-lavender" },
];

export default function Newsletter() {
  return (
    <div>
      <section className="section border-b-2 border-ink bg-lavender">
        <div className="container-x grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider"><Mail size={16} aria-hidden="true" /> The So Fresh City newsletter</p>
            <h1 className="mt-5">Good news. Fresh perspectives.</h1>
            <p className="mt-6 max-w-xl text-lg">Stay connected to the people and projects making a difference across our Bay Area communities. Free haircut events, volunteer opportunities, neighborhood resources, and stories worth sharing—delivered to your inbox.</p>
            <p className="mt-4 text-sm font-semibold">Community-first updates. No spam. Unsubscribe anytime.</p>
          </div>
          <div className="card bg-white lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl">Be part of the story.</h2>
            <p className="mt-3 mb-6">Sign up for So Fresh City news and ways to get involved.</p>
            <NewsletterForm source="newsletter-page" />
            <p className="mt-4 text-xs leading-relaxed">By subscribing, you agree to receive So Fresh City emails. Each email includes a way to unsubscribe.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <p className="font-display text-sm font-black uppercase tracking-widest">What to expect</p>
          <h2 className="mt-3">More than just updates.</h2>
          <p className="mt-4 max-w-2xl text-lg">Our newsletter connects you with the work happening on the ground—and opportunities to take part.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {topics.map(({ icon: Icon, title, body, color }) => (
              <article key={title} className={`card ${color}`}>
                <Icon size={36} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-5">{title}</h3>
                <p className="mt-3">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-t-2 border-ink bg-white">
        <div className="container-x grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <HeartHandshake size={40} strokeWidth={1.8} aria-hidden="true" />
            <h2 className="mt-4">Your community. Your impact.</h2>
            <p className="mt-4 max-w-xl">Can't wait for the next update? Explore upcoming events, discover local resources, or find a way to volunteer today.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/events" className="btn btn-primary">Find events <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/resources" className="btn btn-soft">Explore resources</Link>
            <Link to="/get-involved" className="btn btn-soft">Get involved</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
