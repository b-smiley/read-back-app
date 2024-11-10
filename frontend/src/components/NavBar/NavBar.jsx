import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Live View</Link>
      <Link to="/review">Review Case</Link>
    </div>
  );
}

export default NavBar;
