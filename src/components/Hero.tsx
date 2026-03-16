import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <header className="py-5 mt-5 mb-5">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold text-dark mb-3">
              Simplify Your Shopping
            </h1>
            <p className="lead text-secondary mb-4">
              The easiest way to create, manage, and share your grocery lists.
              Never forget an item again.
            </p>
            <button
              className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm fw-bold"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
