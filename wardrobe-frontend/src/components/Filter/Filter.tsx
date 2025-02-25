import React, { useState } from 'react';
import './Filter.css';

interface FilterProps {
  onFilterChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState('all');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    onFilterChange(selectedCategory);
  };

  return (
    <div className="filter-container">
      <label htmlFor="category-filter">Filter by Category:</label>
      <select
        id="category-filter"
        value={category}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>
  );
};

export default Filter;