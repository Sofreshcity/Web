import { useRef } from "react";
import CommunityPhoto from "../components/CommunityPhoto";
import { gallery } from "../data/gallery";
import { Link } from "react-router-dom";
import { Scissors, Sparkles, Megaphone, ArrowLeft, ArrowRight } from "lucide-react";
import { DONATE_URL } from "../lib/config";

const pillars = [
  { icon: Scissors, title: "Free haircuts", body: "Professional-quality cuts for people who need them, delivered with respect.", color: "bg-lavender" },
  { icon: Sparkles, title: "Hygiene services", body: "Care and supplies that help people feel clean, confident, and ready for the day.", color: "bg-mint" },
  { icon: Megaphone, title: "Social advocacy", body: "Connecting neighbors to the resources and opportunities that support employment readiness.", color: "bg-peach" },
];

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const moveGallery = (direction: number) => galleryRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  return (
    <>
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
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
          <div className="lg:col-span-2">
            <CommunityPhoto photo={gallery[2]} className="aspect-[4/3] w-full rounded-3xl border-2 border-ink" />
            <p className="mt-3 text-sm font-bold">Community care in action</p>
          </div>
          <div className="card bg-lavender lg:col-span-5">
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

      <section className="section border-t-2 border-ink bg-white" aria-labelledby="community-gallery-heading">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-display text-sm font-black uppercase tracking-wider">The So Fresh City community</p>
              <h2 id="community-gallery-heading" className="mt-2">Our work, in pictures</h2>
              <p className="mt-3 max-w-2xl">Real moments from the people, barbers, stylists and neighbors who make our events possible.</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => moveGallery(-1)} aria-label="Scroll gallery left" className="btn btn-soft !p-3"><ArrowLeft size={20} /></button>
              <button type="button" onClick={() => moveGallery(1)} aria-label="Scroll gallery right" className="btn btn-soft !p-3"><ArrowRight size={20} /></button>
            </div>
          </div>
          <div ref={galleryRef} tabIndex={0} aria-label="Community photo gallery, scroll horizontally for more photos" className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 focus-visible:outline-offset-4" style={{ scrollbarWidth: "thin" }}>
            {gallery.map((photo) => (
              <Link to="/media" key={photo.id} className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl border-2 border-ink bg-paper sm:w-[43%] lg:w-[31%]">
                <CommunityPhoto photo={photo} className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.025]" />
                <p className="px-5 py-4 font-display font-bold">{photo.caption}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <Link to="/media" className="btn btn-primary">Explore the full gallery <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
