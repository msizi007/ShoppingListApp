import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar"; // Adjust path as needed

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Optional: Include Navbar if you want users to still have access to the menu */}
      <Navbar isLoggedIn={false} />

      <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          {/* Icon and Error Code */}
          <div className="mb-4">
            <FaExclamationTriangle className="text-warning display-1 mb-3" />
            <h1 className="display-1 fw-bold text-dark">404</h1>
          </div>

          {/* Text Content */}
          <h2 className="h4 fw-bold mb-3">Oops! Page not found.</h2>
          <p className="text-muted mb-5 px-3">
            The page you are looking for might have been removed,{" "}
            <br className="d-none d-md-block" />
            had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary btn-lg px-4 d-flex align-items-center justify-content-center gap-2"
            >
              <FaArrowLeft /> Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary btn-lg px-4 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            >
              <FaHome /> Return Home
            </button>
          </div>
        </div>
      </div>

      {/* Adding a simple footer-like bottom margin or space */}
      <footer className="py-4 text-center text-muted">
        &copy; {new Date().getFullYear()} Shopify List App
      </footer>
    </div>
  );
}
