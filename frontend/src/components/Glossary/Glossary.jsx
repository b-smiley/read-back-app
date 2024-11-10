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

  // Return null if no word is selected
  if (!selectedWord) return null;

  return (
    <div
      className="glossary-popup"
      style={{
        left: position.x + 25, // Offset to X position
        top: position.y + 25, // Offset to Y position
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
