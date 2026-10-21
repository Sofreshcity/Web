import { Link } from "react-router-dom";
import { Scissors, HeartHandshake, CalendarDays, ArrowRight } from "lucide-react";

const ways = [
  { icon: Scissors, title: "Share your skills", body: "Volunteer as a barber or stylist at a community haircut event.", color: "bg-mint" },
  { icon: HeartHandshake, title: "Make a connection", body: "Offer more than a haircut: a welcoming experience rooted in care and dignity.", color: "bg-peach" },
  { icon: CalendarDays, title: "Join an event", body: "See upcoming outreach dates and connect with our team about participating.", color: "bg-lavender" },
];

export default function Barbers() {
  return (
    <div>
      <section className="section border-b-2 border-ink bg-mint">
        <div className="container-x">
          <p className="font-display text-sm font-black uppercase tracking-widest">The people behind the cuts</p>
          <h1 className="mt-3">Barbers &amp; stylists</h1>
          <p className="mt-5 max-w-2xl text-lg">A great haircut can restore confidence and create connection. Our volunteer barbers and stylists help make free grooming services possible across the Bay Area.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-involved" className="btn btn-primary">Volunteer with us <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/services" className="btn btn-soft">Request a free haircut</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <h2>Be part of the impact</h2>
          <p className="mt-3 max-w-2xl">Whether you're an experienced barber, stylist, or a shop interested in collaborating, we'd love to connect.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ways.map(({ icon: Icon, title, body, color }) => (
              <article key={title} className={`card ${color}`}>
                <Icon size={36} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-5">{title}</h3>
                <p className="mt-3">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="card bg-white">
              <h2 className="text-2xl">For barbers &amp; shops</h2>
              <p className="mt-3">Interested in volunteering, bringing your team, or exploring a partnership? Tell us how you'd like to help.</p>
              <Link to="/get-involved" className="btn btn-primary mt-6">Get involved</Link>
            </div>
            <div className="card bg-white">
              <h2 className="text-2xl">Looking for a haircut?</h2>
              <p className="mt-3">Our haircut services are free. Visit our services page to send a request, or check the events calendar.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/services" className="btn btn-primary">Request a service</Link>
                <Link to="/events" className="btn btn-soft">See events</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
