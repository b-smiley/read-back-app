import React, { useState } from "react";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
import Glossary from "../../components/Glossary/Glossary";
import Title from "../../components/Title/Title";
import CategoriesList from "./review_comp/CategoriesList/CategoriesList";
import Evidence from "./review_comp/evidence/Evidence";
import AudioListener from "../../components/Audio/AudioListener";
import "./ReviewPage.css";


const jsonResponse = await getTranscript();
function ReviewPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="app-container">
      <Title caseName="Smiths Divorce Settlements" />
      <Glossary
        selectedWord={selectedWord}
        position={position}
        setSelectedWord={setSelectedWord}
      />
      <Transcript
        setSelectedWord={setSelectedWord}
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"review"}
        setPosition={setPosition}
      />
      <CategoriesList />
      <Evidence />
    </div>
  );
}

export default ReviewPage;
