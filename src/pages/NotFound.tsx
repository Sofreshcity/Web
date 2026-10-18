import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section">
      <div className="container-x">
        <h1>Page not found</h1>
        <Link to="/" className="btn btn-primary mt-6">
          Back home
        </Link>
      </div>
    </div>
  );
}
