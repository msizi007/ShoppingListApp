import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="homePage">
      <Navbar isLoggedIn={true} />
    </div>
  );
}
