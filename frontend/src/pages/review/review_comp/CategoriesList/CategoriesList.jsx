import React, { useEffect, useState } from "react";
import "./CategoriesList.css";

function CategoriesList() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch("http://localhost:5000/names");
        const data = await response.json();

        // Format the data and set state
        const formattedPeople = data.map((person) => ({
          name: person.name,
          speech: person.speech.map((speech) => ({
            content: speech.content,
            index: speech.index,
            length: speech.length,
          })),
        }));

        setPeople(formattedPeople); // Update data
      } catch (error) {
        console.error("Error fetching people data:", error);
      }
    };

    fetchPeopleData(); // Fetch data when the component mounts
  }, []);

  const handleItemClick = (personName) => {
    if (selectedPerson && selectedPerson.name === personName) {
      setSelectedPerson(null); // Deselect if the same person is clicked again
      document.body.classList.remove("greyed-out");
    } else {
      const person = people.find((p) => p.name === personName);
      if (person) {
        setSelectedPerson(person); // Show details of selected person
        document.body.classList.add("greyed-out");
      }
    }
  };

  const handleClosePopup = () => {
    setSelectedPerson(null); // Hide the details
    document.body.classList.remove("greyed-out"); // Remove the greyed-out overlay
  };

  return (
    <div className="categories-list">
      <h2>Speakers</h2>
      {/* List all people */}
      <ul className="category-items">
        {people.map((person) => (
          <li
            key={person.name}
            className="category-item"
            onClick={() => handleItemClick(person.name)}
          >
            {person.name}
          </li>
        ))}
      </ul>

      {/* Display the selected person's speech details if they are selected */}
      {selectedPerson && (
        <div>
          <div className="greyed-out" onClick={handleClosePopup}></div>
          <div className="person-details-box">
            <h3>{selectedPerson.name}</h3>
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
            <div className="speech-details">
              {selectedPerson.speech.map((item, index) => (
                <div key={index} className="speech-item">
                  <p>
                    <strong>Speech #{index + 1}</strong>:
                  </p>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesList;
