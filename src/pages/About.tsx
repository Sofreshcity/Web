import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="section">
      <div className="container-x max-w-3xl">
        <h1>About So Fresh City</h1>
        <p className="mt-6 text-lg">So Fresh City is a 501(c)(3) nonprofit in the San Francisco Bay Area. We provide free haircuts, hygiene services, and social advocacy to people in underserved communities across San Francisco and Alameda County.</p>
        <h2 className="mt-12">Our approach</h2>
        <p className="mt-4">We believe grooming is about dignity. Feeling cared for opens doors, from job interviews to health appointments to reconnecting with family. Our work is built around that idea and around employment readiness.</p>
        <h2 className="mt-12">Who we serve</h2>
        <p className="mt-4">Anyone in San Francisco or Alameda County who could use a free haircut or hygiene support. No paperwork is required to attend an event.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/events" className="btn btn-primary">
            Upcoming events
          </Link>
          <Link to="/contact" className="btn btn-soft">
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
