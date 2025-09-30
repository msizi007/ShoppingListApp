import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<h1>Home</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </>
  );
}

export default App;
