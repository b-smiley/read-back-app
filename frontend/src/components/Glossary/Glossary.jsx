import React, { useState, useEffect } from 'react';
import './Glossary.css';
import axios from 'axios';

const fetchDefinition = async (term) => {
  try {
    const response = await axios.get(`/api/get_definition_api/${term}`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching definition:", error.response ? error.response.data.message : error.message);
    return "Definition not found";
  }
};

function Glossary({ term }) {
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    const getDefinition = async () => {
      const def = await fetchDefinition(term);
      setDefinition(def);
    };

    if (term) {
      getDefinition();
    }
  }, [term]);

  return (
    <div>
      <h2>Definition of {term}</h2>
      <p>{definition}</p>
    </div>
  );
}


export default Glossary;
