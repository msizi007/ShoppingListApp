import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import ListView from "./pages/ListView";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listView/:id" element={<ListView />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
