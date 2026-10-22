import CommunityPhoto from "../components/CommunityPhoto";
import { Link } from "react-router-dom";
import { gallery } from "../data/gallery";

const services = [
  { title: "Free haircuts", body: "Cuts from volunteer barbers and stylists at our events.", color: "bg-lavender" },
  { title: "Hygiene services", body: "Hygiene supplies and care to help you feel your best.", color: "bg-mint" },
  { title: "Social advocacy", body: "Help connecting with local resources and employment readiness support.", color: "bg-peach" },
];

export default function Services() {
  return (
    <div className="section">
      <div className="container-x">
        <h1>Services</h1>
        <p className="mt-4 max-w-2xl text-lg">All of our services are free.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <CommunityPhoto photo={gallery[0]} className="aspect-[4/3] w-full rounded-3xl border-2 border-ink" />
          <CommunityPhoto photo={gallery[3]} className="aspect-[4/3] w-full rounded-3xl border-2 border-ink" />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className={`card ${s.color}`}>
              <h3>{s.title}</h3>
              <p className="mt-2">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="card mt-12 max-w-2xl bg-white">
          <h2 className="text-2xl sm:text-3xl">Find free services at an event</h2>
          <p className="mt-2">See upcoming opportunities to receive free haircuts and connect with our community.</p>
          <Link to="/events" className="btn btn-primary mt-6">View events</Link>
        </div>
      </div>
    </div>
  );
}
