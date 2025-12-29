import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar">
      <div className="navbar-logo">BusReservation</div>

      <ul className="navbar-menu">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/success" ? "active" : ""}>
          <Link to="/success">My Bookings</Link>
        </li>
      </ul>

      <div className="navbar-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>
    </nav>
  );
}
