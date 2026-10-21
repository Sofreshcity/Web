import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DONATE_URL } from "../lib/config";
import NewsletterForm from "./NewsletterForm";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/barbers", label: "Barbers" },
  { to: "/media", label: "Media" },
  { to: "/resources", label: "Resources" },
  { to: "/events", label: "Events" },
  { to: "/get-involved", label: "Get involved" },
  { to: "/contact", label: "Contact" },
  { to: "/newsletter", label: "Newsletter" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) => `font-display text-sm font-bold ${isActive ? "underline decoration-2 underline-offset-8" : "hover:underline hover:underline-offset-8"}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-xl font-black tracking-tight" onClick={() => setOpen(false)}>
            So Fresh City
          </Link>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/donate" className="btn btn-primary">
              Donate
            </Link>
          </nav>
          <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="container-x flex flex-col gap-4 pb-5 lg:hidden" aria-label="Mobile">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/donate" className="btn btn-primary self-start" onClick={() => setOpen(false)}>
              Donate
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <section aria-labelledby="footer-newsletter" className="border-t-2 border-ink bg-lavender">
        <div className="container-x grid items-center gap-6 py-10 md:grid-cols-2">
          <div>
            <h2 id="footer-newsletter" className="text-2xl sm:text-3xl">Stay in the loop</h2>
            <p className="mt-2">Event dates, volunteer needs, and local resources, straight to your inbox.</p>
          </div>
          <NewsletterForm source="footer" />
        </div>
      </section>

      <footer className="border-t-2 border-ink bg-ink text-paper">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-black">So Fresh City</p>
            <p className="mt-2 text-sm text-paper/80">A 501(c)(3) nonprofit in the San Francisco Bay Area providing free haircuts, hygiene services, and social advocacy.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/donate" className="hover:underline">
              Donate
            </Link>
            {DONATE_URL === "" && <span className="text-paper/60">Donations coming soon</span>}
            <Link to="/admin" className="text-paper/60 hover:underline">
              Staff login
            </Link>
          </div>
        </div>
        <p className="border-t border-paper/20 py-4 text-center text-xs text-paper/60">© {new Date().getFullYear()} So Fresh City</p>
      </footer>
    </div>
  );
}
