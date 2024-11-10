import React from 'react';
import './Glossary.css';

export const getGlossary = () => {
  // TODO ADD ASYNC BACK
  // try {
  //   const response = await axios.get("http://localhost:5000/transcript");
  //   console.log(response);
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error.message);
  // }
  let glossary = "";
  for (let i = 0; i < 100; i++) {
    glossary += "Objection: this is a glossary.";
  }

  let json_obj = {
    glossary: glossary,
    keywords: [
      {
        startIndex: 0,
        lastIndex: 10,
      },
    ],
  };

  return json_obj;
};

function Glossary({ selectedWord, glossary, position, hidePopup }) {
  if (!Array.isArray(glossary)) {
    console.error('glossary prop should be an array');
    return null;
  }
  
  const selectedEntry = glossary.find((entry) => entry.word === selectedWord);

  if (!selectedEntry) return null;

  const popupWidth = 200;
  const popupHeight = 150; 
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const safeX = Math.min(position.x, screenWidth - popupWidth);
  const safeY = Math.min(position.y, screenHeight - popupHeight);

  return (
    <div
      className="popup-container"
      style={{ left: safeX, top: safeY }}
    >
      <div className="popup">
        <button className="close-popup" onClick={hidePopup}>X</button>
        <h2>{selectedEntry.word}</h2>
        <p>{selectedEntry.def}</p>
      </div>
    </div>
  );

}

export default Glossary;
