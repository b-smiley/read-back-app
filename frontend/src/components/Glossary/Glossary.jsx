import React, { useState, useEffect } from 'react';
import './Glossary.css';
import axios from 'axios';

function Glossary({ selectedWord, position, setSelectedWord }) {
  const [definition, setDefinition] = useState('');
  const [extendedDefinition, setExtendedDefinition] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchDefinition = async () => {
      if (!selectedWord) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/get_definition_api/${selectedWord}`);
        setDefinition(response.data.message);
        setExtendedDefinition(response.data.extendedMessage || 'No additional info available');
      } catch (error) {
        console.error("Error fetching definition:", error.response ? error.response.data.message : error.message);
        setDefinition("Definition not found");
        setExtendedDefinition("");
      }
    };

    fetchDefinition();
  }, [selectedWord]);

  // Return null if no word is selected
  if (!selectedWord) return null;

  return (
    <div
      className="glossary-popup"
      style={{
        left: position.x + 25, // Offset to X position
        top: position.y + 25,  // Offset to Y position
      }}
    >
      <h2>Definition of {selectedWord}</h2>
      <p>{definition}</p>
      {showMore && <p>{extendedDefinition}</p>}
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}

export default Glossary;