import React from "react";
import "./CategoryPanel.css";


const CategoryPanel = ({ categories }) => {
  return (
    <div className="category-container">
      <h2 className="category-title">Categories</h2>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index}>
            <button className="category-item">{category}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPanel;
