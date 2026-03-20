import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PreviewSection from "../components/PreviewSection";

export default function LandingPage() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar isLoggedIn={false} />

      <Hero />
      <PreviewSection />

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
