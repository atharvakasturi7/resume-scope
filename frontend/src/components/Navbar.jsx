import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">

      {/* <h2 className="logo">ResumeScope</h2> */}
      <Link to="/" className="logo">
        <img src={logo} alt="ResumeScope Logo" className="logo-icon" />
        <span>ResumeScope</span>
      </Link>

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