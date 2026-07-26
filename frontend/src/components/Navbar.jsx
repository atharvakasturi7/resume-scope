import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">ResumeIQ</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/ats">ATS</Link>

        <Link to="/job-match">Job Match</Link>

        <Link to="/roadmap">Roadmap</Link>

        <Link to="/interview">Interview</Link>
      </div>
    </nav>
  );
}