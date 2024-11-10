import React, { useState, useEffect } from 'react';
import Transcript, { getTranscript } from "../../components/Transcript/Transcript";
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

  // Fetch glossary data from the backend API
  useEffect(() => {
    const fetchGlossary = async () => {
      try {
        const response = await fetch('/api/get_definition_api');  // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch glossary data');
        }
        const data = await response.json();
        setGlossary(data.glossary);
      } catch (error) {
        console.error('Error fetching glossary data:', error);
      }
    };

    fetchGlossary();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="app-container">
      {/* Render the Glossary with its specified mode */}
      <Glossary selectedWord={selectedWord} glossary={glossary} position={{ x: 100, y: 100 }} hidePopup={() => {}} /> 

      {/* Render the Evidence, Witnesses, etc. */}
      <div className="content-container">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}

export default ReviewPage;
