import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DONATE_URL } from "../lib/config";
import NewsletterForm from "./NewsletterForm";

// Website logo derived from the supplied So Fresh City image (monochrome PNG).
const logoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAQAAAAAUekxPAAAD90lEQVR42u2WP2gkdRTHP783k80oe9k1BFmOYIZUAZuxy3nRjCeihUWwsjjhQBErDXJCCkl+eiektLTcwsLOK62OX87I2SjBP6igOEjUIAHXEHCSzM67YmZ3Z4YcWNjprxnmO++93/f9mfce/H/GZ1UHTWja0Wliy0DSwBww31AF8MoXKR5TAENXk4vwFKKGubZnCYoXHwAT03rrZ/KqvSm4SMxZVTWAl8we2IpcAPMsjVgX2BrcYQB7dS++fiylvFgAjMP8+MVNyCq6FnYkZUSm/GDWOQYzkRPozX584EoyPoCf8ezb5lKKTnS74DbTXhvisW6IF7MdnpakBWCAR27jM8ugIifse1bjSlwsAbShTzrGHF2IYK8MJ2Ag5lVN6RVYmaOYnoPjiXOCgU3t4Y/dKrQZQl7IyRi/GaIYuiCYtEBtDBZeB2FqDnw4wqKo9UDIT32AQQdwmC2L4GdFHqJqiONJtSXs4BCwAV14ZJJ+KQQA+tBFATHJlUJdLSQk9io+K3NFeI8A0IOLIK8QEkPOMgSE5nEwTxPiWEjRhICuzIL5SR22o8m0qgtY0MMRTVXbUU3v/5sZvKyJQLsBWTxapw2xBOa2tHrSBFjSOnYL2Ktj2YuIeajBZB+Rfh2SrzBiGvy8XJr8sCCr9Tv0aFRDdZP/GDuJdoffcPz+e9+vn/DmsgIStUgNkXBj2gUh87N45sFPHr5z+YUfvv30taXkmS6/vnxXuLAibhf8zyCIt4PrFiQK8pWOTReM63SyzdWdI3z+9i3rAd/98btlDxZByNztGN9mH0Ba9gMJZ0gXWl0xN6Zdb7mzcwSysvqnqqreVR0W/v7bMUCmG/bexXjU86F+Lvntul7eBhM1ch4h+lFdLltCWGtc+hzCoa1jyTk1GZ/DOb5PPZ93rjtA1ZX/h1lDzIVFh+0SHsN2QO+JDMwVQmI6KeoIiGQWMYsA/NXiUgwMtIeo2xgA2EECAbyxgbD7fMH9y4JJ7xTRsAzWU30ICe2HlV5CDANMt+gvKQP4pfxyUM1RDIRsESNkAinw+bgbCXmQ4UP3BIjRdyyCHkIKM8QYjB0WlloIbPaXMUWgBMgwwFUw1R6bA941pBgWAihqgWsElZ5tcRwA7UkvVkg4jan1dlfOu6hWfyndo8LiCEvIaas1MWFl9gwR66aozB4YOjYSoZAb9d8o1zQaDeBy8D1gza4r68IvXUsHuuwjw7G9YiRuTLaGwjmjmo1qUcqI64606/UZwmVzMHKukBvAkwR1LIN9m4wolzcNyR9NbxlXkTuD3+gXG0tlQZjxLL3G/mKy5v7SHhdGpYmOl6Ja/KDZlVfO2a88x8I5+1ryX11V7wHnX7k7UmuIRAAAAABJRU5ErkJggg==";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/resources", label: "Resources" },
  { to: "/media", label: "Media" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) => `font-display text-sm font-bold ${isActive ? "underline decoration-2 underline-offset-8" : "hover:underline hover:underline-offset-8"}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="inline-flex items-center" aria-label="So Fresh City home" onClick={() => setOpen(false)}>
            <img src={logoSrc} alt="So Fresh City" className="h-12 w-12 rounded-full object-cover" width={48} height={48} />
          </Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="main-menu" className="container-x flex flex-col gap-4 pb-5" aria-label="Main navigation">
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
            <img src={logoSrc} alt="So Fresh City" className="h-20 w-20 rounded-full object-cover" width={80} height={80} />
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
