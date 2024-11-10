import React from 'react';

function CategoryDetail({ id, title, content }) {
  return (
    <div id={id} className="category-detail">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default CategoryDetail;