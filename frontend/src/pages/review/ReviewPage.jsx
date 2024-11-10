import React, { useState } from 'react';
import Transcript, {getTranscript,} from "../../components/Transcript/Transcript";
import Glossary from "../../components/Glossary/Glossary";
import CategoriesList from './review_comp/CategoriesList/CategoriesList';
import CategoryDetail from './review_comp/CategoriesList/CategoryDetail';
const jsonResponse = getTranscript();

function ReviewPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [glossary, setGlossary] = useState([]);
  const [categories, setCategories] = useState({
    evidence: [],
    witnesses: [],
    testimonies: []
  });

  //API CALL HERE
  //setGlossary();

  //Handles click in the transcript
  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  return (
    <div className="app-container">
      {/*Render the Glossary with its specified mode*/}
      <Glossary selectedWord={selectedWord} glossary={glossary} position={{ x: 100, y: 100 }} hidePopup={() => {}} /> 
      <Transcript 
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"review"}
      />
      {/*Render the Evidence, Witnesses, etc. Update the data displayed from useEffect above*/}
      <div className="content-container">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}

export default ReviewPage;
