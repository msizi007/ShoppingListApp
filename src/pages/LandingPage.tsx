import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landingPage">
      <Navbar isLoggedIn={false} />
      <div className="body mt-5">
        <div className="content">
          <h1 className="mt-5 text-center title">Simplify Your Shopping</h1>
          <h4 className="text-center sub-title">
            The easiest way to create, manage, and share your grocery lists.
          </h4>
          <button
            className="signup-button"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
