import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Live View
      </Link>
      <Link
        to="/review"
        className={location.pathname === "/review" ? "active" : ""}
      >
        Review Case
      </Link>
    </div>
  );
}

export default NavBar;
