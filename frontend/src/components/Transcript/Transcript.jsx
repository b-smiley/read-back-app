import React from "react";
import "./Transcript.css";
import axios from "axios";

/** Gets the transcript */
export const getTranscript = () => {
  // TODO ADD ASYNC BACK
  // try {
  //   const response = await axios.get("http://localhost:5000/transcript");
  //   console.log(response);
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error.message);
  // }
  let transcript = "";
  for (let i = 0; i < 100; i++) {
    transcript += "Objection this is a transcript.";
  }

  let json_obj = {
    transcript: transcript,
    keywords: [
      {
        startIndex: 0,
        lastIndex: 10,
      },
    ],
  };

  return json_obj;
};

function Transcript({
  setSelectedWord,
  transcript = "",
  keywords = [],
  mode = "",
}) {
  const generateInteractiveText = () => {
    let segments = [];
    let lastIndex = 0;
    debugger;
    // Iterate over the keywords to find the sections of the transcript
    keywords.forEach((keyword, index) => {
      // Push text before the keyword
      if (keyword.startIndex > lastIndex) {
        segments.push({
          type: "text",
          content: transcript.slice(lastIndex, keyword.startIndex),
        });
      }
      // Push the keyword as a button
      segments.push({
        type: "button",
        content: transcript.slice(keyword.startIndex, keyword.lastIndex),
        startIndex: keyword.startIndex,
        lastIndex: keyword.lastIndex,
      });

      // Update the completed portion
      lastIndex = keyword.lastIndex;
    });
    // Add the remaining text after the last keyword
    if (lastIndex < transcript.length) {
      segments.push({
        type: "text",
        content: transcript.slice(lastIndex),
      });
    }

    // Create the component for the segments
    return segments.map((segment, index) => {
      if (segment.type === "button") {
        return (
          <button
            key={index}
            className="transcript-button"
            onClick={() => setSelectedWord(segment.content)}
          >
            {segment.content}
          </button>
        );
      } else {
        return <span key={index}>{segment.content}</span>;
      }
    });
  };
  const renderText = () => {
    // TODO

    switch (mode) {
      case "live":
        return (
          <div className="live-transcript">{generateInteractiveText()}</div>
        );
      case "review":
        return (
          <div className="review-transcript">{generateInteractiveText()}</div>
        );
      default:
        return <div>ERROR</div>;
    }
  };

  return (
    <div className="transcript">
      <h2>Transcript</h2>
      <div className="transcript-text">{renderText()}</div>
    </div>
  );
}
export default Transcript;
