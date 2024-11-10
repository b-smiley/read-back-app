import React, { useState, useEffect } from "react";
import "./Proceeding.css";

// Define the list of procedural steps as a constant
const proceduralSteps = [
  {
    title: "Opening Statements",
    desc: "The attorneys for each side present an overview of their cases to the jury or judge, outlining what they intend to prove during the trial.",
  },
  {
    title: "Plaintiff's Case",
    desc: "The plaintiff's attorney presents evidence and witnesses to support the plaintiff's claims, attempting to establish the case against the defendant.",
  },
  {
    title: "Defendant's Case",
    desc: "The defense attorney presents evidence and witnesses to refute the plaintiff's claims and to support the defendant's arguments.",
  },
  {
    title: "Closing Arguments",
    desc: "Each attorney summarizes their case, reinforcing key points and attempting to persuade the jury or judge one last time before deliberation.",
  },
  {
    title: "Jury Deliberation",
    desc: "The jury discusses the case in private, considering the evidence and arguments presented in order to reach a verdict.",
  },
  {
    title: "Verdict Announcement",
    desc: "The jury or judge announces the final decision of the court, determining the outcome of the case.",
  },
];

function Proceeding() {
  // Track which step is currently highlighted
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    // Set up the interval to change the highlighted index every 10 seconds
    const intervalId = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % proceduralSteps.length
      );
    }, 5000); // 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="proceeding">
      <h1>Court Proceeding</h1>
      <div className="card-row">
        {proceduralSteps.map((step, index) => (
          <div
            key={index}
            className={`card ${
              index === highlightedIndex ? "highlighted" : ""
            }`}
          >
            <h4>{step.title}</h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proceeding;
