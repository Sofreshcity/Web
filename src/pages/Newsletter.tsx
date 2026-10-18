import { Link } from "react-router-dom";
import NewsletterForm from "../components/NewsletterForm";

export default function Newsletter() {
  return (
    <div className="section">
      <div className="container-x max-w-2xl">
        <h1>Newsletter</h1>
        <p className="mt-4 text-lg">Get updates on upcoming free haircut events, volunteer opportunities, and local resources in San Francisco and Alameda County.</p>
        <div className="card mt-8 bg-lavender">
          <NewsletterForm source="newsletter-page" />
          <p className="mt-4 text-sm">We only send news about So Fresh City. Every email includes an unsubscribe link.</p>
        </div>
        <p className="mt-8">
          Looking for help right now? Browse our{" "}
          <Link to="/resources" className="font-bold underline">
            local resources
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
