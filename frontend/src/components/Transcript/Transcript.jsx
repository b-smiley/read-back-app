import React from "react";
import './Transcript.css';
import axios from "axios";

export const getTranscript = () => {
  let transcript = "";
  for (let i = 0; i < 100; i++) {
    transcript += "charge";
  }

  let json_obj = {
    transcript: transcript,
    keywords: [
      {
        startIndex: 0,
        endIndex: 6,
      }
    ],
  };

  return json_obj;
};

function Transcript({ setSelectedWord, transcript = "", keywords = [], mode = "", setPosition }) {
  const generateInteractiveText = () => {
    let segments = [];
    let lastIndex = 0;

    keywords.forEach((keyword, index) => {
      if (keyword.startIndex > lastIndex) {
        segments.push({
          type: "text",
          content: transcript.slice(lastIndex, keyword.startIndex),
        });
      }

      segments.push({
        type: "button",
        content: transcript.slice(keyword.startIndex, keyword.endIndex),
        startIndex: keyword.startIndex,
        endIndex: keyword.endIndex,
      });

      lastIndex = keyword.endIndex;
    });

    if (lastIndex < transcript.length) {
      segments.push({
        type: "text",
        content: transcript.slice(lastIndex),
      });
    }

    return segments.map((segment, index) => {
      if (segment.type === "button") {
        return (
          <button
            key={index}
            className="transcript-button"
            onClick={(e) => {
              const rect = e.target.getBoundingClientRect();
              setPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });

              // If the same word is clicked again, close the glossary
              setSelectedWord((prev) => (prev === segment.content ? null : segment.content));
            }}
          >
            {segment.content}
          </button>
        );
      } else {
        return <span key={index}>{segment.content}</span>;
      }
    });
  };

  return (
    <div className="transcript">
      <h2>Transcript</h2>
      <div className="transcript-text">{generateInteractiveText()}</div>
    </div>
  );
}

export default Transcript;