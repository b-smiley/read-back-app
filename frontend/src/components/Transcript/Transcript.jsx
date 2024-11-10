import React from "react";
import "./Transcript.css";
import axios from "axios";

export const getTranscript = async (file = "input_text.txt", live = false) => {
  try {
    // const transcript_response = await axios.get(
    //   `http://localhost:5000/stream?file=${file}&live=${live}`
    // );

    const keywords_response = await axios.get(
      `http://localhost:5000/get-saved-transcript-keywords?file=${file}`
    );

    const transcript_response = await axios.get(
      `http://localhost:5000/saved_text`
    );

    // Convert keywords object to an array of keyword object
    const keywords = keywords_response.data;

    const keywordEntries = Object.keys(keywords).map((startIndex) => ({
      keyword: keywords[startIndex].keyword,
      startIndex: parseInt(startIndex, 10),
      endIndex: parseInt(startIndex, 10) + keywords[startIndex].length,
    }));

    const json_obj = {
      transcript: transcript_response.data,
      keywords: keywordEntries,
    };

    return json_obj;
  } catch (error) {
    console.error(error);
  }
};
function Transcript({
  setSelectedWord,
  transcript = "",
  keywords = [],
  mode = "",
  setPosition,
}) {
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
              setPosition({
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY,
              });

              // If the same word is clicked again, close the glossary
              setSelectedWord((prev) =>
                prev === segment.content.toLowerCase()
                  ? null
                  : segment.content.toLowerCase()
              );
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
    <div
      className={`transcript ${
        mode === "live" ? "live-transcript" : "review-transcript"
      }`}
    >
      <h2>Transcript</h2>
      <div className="transcript-text">{generateInteractiveText()}</div>
    </div>
  );
}

export default Transcript;
