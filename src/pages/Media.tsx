import CommunityPhoto from "../components/CommunityPhoto";
import { gallery } from "../data/gallery";
import { Link } from "react-router-dom";
import { Camera, Film, Images, ArrowRight } from "lucide-react";

const categories = [
  { icon: Camera, title: "Community photography", description: "Portraits and moments from our outreach events and neighborhood work.", color: "bg-mint" },
  { icon: Film, title: "Video stories", description: "Stories from our community, volunteers, and the people making a difference.", color: "bg-lavender" },
  { icon: Images, title: "Event highlights", description: "A look at the care, creativity, and connections behind each event.", color: "bg-peach" },
];

export default function Media() {
  return (
    <div>
      <section className="section bg-lavender border-b-2 border-ink">
        <div className="container-x">
          <p className="font-display text-sm font-black uppercase tracking-widest">Our stories</p>
          <h1 className="mt-3">Media &amp; stories</h1>
          <p className="mt-5 max-w-2xl text-lg">See the people, partnerships, and moments that bring So Fresh City to life. Our media collection is growing alongside the community we serve.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/events" className="btn btn-primary">Explore events <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/contact" className="btn btn-soft">Media inquiries</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <h2>Inside the community</h2>
          <p className="mt-3 max-w-2xl">A home for photography, videos, and highlights from So Fresh City's work.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.map(({ icon: Icon, title, description, color }) => (
              <article key={title} className={`card ${color} flex flex-col`}>
                <Icon size={36} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-5">{title}</h3>
                <p className="mt-3 flex-1">{description}</p>
              </article>
            ))}
          </div>
          <section aria-label="Community photo gallery" className="mt-12">
            <h2>Community in pictures</h2>
            <p className="mt-3">Real moments from haircuts, neighborhood gatherings, and community care.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((photo) => (
                <figure key={photo.id} className="rounded-3xl border-2 border-ink bg-white p-2.5 pb-5">
                  <CommunityPhoto photo={photo} className="aspect-[4/3] w-full rounded-2xl" />
                </figure>
              ))}
            </div>
          </section>
          <div className="card mt-10 bg-white">
            <h2 className="text-2xl">Have a story to share?</h2>
            <p className="mt-3 max-w-2xl">Were you part of a So Fresh City event? We would love to hear from you. Reach out about photos, interviews, collaborations, or media coverage.</p>
            <Link to="/contact" className="btn btn-primary mt-6">Contact our team <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
