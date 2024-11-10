import React, { useState, useEffect } from 'react';
import './CategoriesList.css';

function CategoriesList() {
  const [openCategory, setOpenCategory] = useState(null); // State to track the open category
  const [categories, setCategories] = useState({
    evidence: [],
    witnesses: [],
    testimonies: []
  });

  /* TEST API CALL
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving new evidence from the backend
      const newEvidence = {
        id: `evidence-${Math.floor(Math.random() * 1000)}`,
        label: `Evidence ${Math.floor(Math.random() * 100)}`
      };

      // Add the new evidence to the state
      setCategories((prevCategories) => ({
        ...prevCategories,
        evidence: [...prevCategories.evidence, newEvidence]
      }));
    }, 5000); // Simulate receiving new evidence every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  */


  //Handle the click event to open or close a category
  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  //Handle the click event for an item to scroll to its section (Might need to change)
  const handleItemClick = (itemId) => {
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="categories-list">
      <h1>Categories</h1>

      {/* Iterate over the category names using Object.keys() */}
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <div
            className="category-title"
            onClick={() => toggleCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          {openCategory === category && (
            <ul className="category-items">
              {/* Map over the items of the current category */}
              {categories[category].map((item, index) => (
                <li
                  key={index}
                  className="category-item"
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoriesList;
