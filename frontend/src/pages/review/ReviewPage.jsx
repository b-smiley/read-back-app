import React, { useState } from 'react';
import Transcript, { getTranscript } from "../../components/Transcript/Transcript";
import Glossary from "../../components/Glossary/Glossary";

const jsonResponse = getTranscript();

function ReviewPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="app-container">
      <Glossary selectedWord={selectedWord} position={position} setSelectedWord={setSelectedWord} />
      <Transcript
        setSelectedWord={setSelectedWord}
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"review"}
        setPosition={setPosition}
      />
    </div>
  );
}

export default ReviewPage;
