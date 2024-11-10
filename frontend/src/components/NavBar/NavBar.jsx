import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar-container">
      <Link to="/" exact activeClassName="active-link">Live</Link>
      <Link to="/review" activeClassName="active-link">Review</Link>
    </div>
  );
}

export default NavBar;
