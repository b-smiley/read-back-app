import React from "react";
import "./Title.css";
import NavBar from "../NavBar/NavBar";
function Title({ caseName = "" }) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="title">
      <img src="ReadBack_Logo.png" alt="Legal Symbol"></img>
      {caseName ? (
        <h1 className="title-casename">
          Case: {caseName} - {today}
        </h1>
      ) : (
        <div className="title-casename">
          <h1>Read Back - Law Accessibility Application</h1>
        </div>
      )}
      <NavBar />
    </div>
  );
}

export default Title;
