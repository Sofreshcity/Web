import { Link } from "react-router-dom";
import { DONATE_URL } from "../lib/config";

export default function Donate() {
  return (
    <div className="section">
      <div className="container-x max-w-2xl">
        <h1>Donate</h1>
        <p className="mt-4 text-lg">So Fresh City is a 501(c)(3) nonprofit. Your gift helps us provide free haircuts, hygiene services, and advocacy.</p>
        {DONATE_URL ? (
          <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
            Give securely
          </a>
        ) : (
          <div className="card mt-8 bg-peach">
            <p>Online giving is coming soon. In the meantime, reach out and we'll help you give another way.</p>
            <Link to="/contact" className="btn btn-primary mt-4">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
