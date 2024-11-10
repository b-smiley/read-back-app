import React, { useState, useEffect } from "react";
import "./Glossary.css";
import axios from "axios";
import AudioListener from "../AudioListener/AudioListener";

function Glossary({ selectedWord, position, setSelectedWord }) {
  const [definition, setDefinition] = useState("");
  const [extendedDefinition, setExtendedDefinition] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch the main definition when a word is selected
  useEffect(() => {
    const fetchDefinition = async () => {
      if (!selectedWord) return;

      try {
        const lowercasedWord = selectedWord.toLowerCase();
        const response = await axios.get(
          `http://localhost:5000/api/get_definition_api/${lowercasedWord}`
        );
        setDefinition(response.data.message);
      } catch (error) {
        console.error(
          "Error fetching definition:",
          error.response ? error.response.data.message : error.message
        );
        setDefinition("Definition not found");
      }
    };

    fetchDefinition();
  }, [selectedWord]);

  useEffect(() => {
    console.log("Cache Cleared");
    axios.post(`http://localhost:5000/api/clear_cache`);
  }, []);

  // Fetch the extended definition when the user clicks "Show More"
  const handleShowMore = async () => {
    if (!selectedWord || loading) return; // Prevent API call if already loading

    setLoading(true);

    if (showMore) {
      // If it's already showing, hide the extended definition
      setShowMore(false);
      setExtendedDefinition("");
    } else {
      // If it's not showing, fetch the extended definition
      try {
        const response = await axios.get(
          `http://localhost:5000/api/get_gpt_response/${selectedWord}`
        );

        const { explanation, usage } = response.data.data;

        if (explanation && usage) {
          setExtendedDefinition(`
          <strong>Explanation:</strong> ${explanation}<br />
          <strong>Usage:</strong> ${usage}<br /><br />
          `);
        } else {
          setExtendedDefinition("No additional info available");
        }

        setShowMore(true);
      } catch (error) {
        console.error(
          "Error fetching extended definition:",
          error.response ? error.response.data.message : error.message
        );
        setExtendedDefinition("No additional info available");
        setShowMore(true); // Still show the button even if there's no extended info
      }
    }
    setLoading(false);
  };

  const getAdjustedPosition = (x, y) => {
    const popupWidth = 300;  // Adjust the width as per the popup's actual width
    const popupHeight = 200; // Adjust the height as per the popup's actual height
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Adjust X position if too close to the right edge
    const adjustedX = x + popupWidth > screenWidth ? screenWidth - popupWidth - 10 : x;

    // Adjust Y position if too close to the bottom edge
    const adjustedY = y + popupHeight > screenHeight ? screenHeight - popupHeight - 10 : y;

    return { left: adjustedX + 25, top: adjustedY + 25 }; // Offset with 25px as per your original style
  };

  const adjustedPosition = getAdjustedPosition(position.x, position.y);

  // Return null if no word is selected
  if (!selectedWord) return null;

  return (
    <div
      className="glossary-popup"
      style={{
        left: adjustedPosition.left,
        top: adjustedPosition.top,
      }}
    >
      <h2>Definition of {selectedWord}</h2>
      <p>{definition}</p>
      {showMore && (
        <div
          className="extended-definition"
          dangerouslySetInnerHTML={{ __html: extendedDefinition }}
        />
      )}

      {/* Show loading while fetching extended definition */}
      <button
        onClick={handleShowMore}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Loading..." : showMore ? "Show Less" : "Show More"}
      </button>
      <AudioListener text={definition} />
    </div>
  );
}

export default Glossary;
