import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import './Filter.css';

interface Category {
  id: number;
  name: string;
}

interface FilterProps {
  onFilterChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    onFilterChange(selected);
  };

  return (
    <div className="filter-container">
      <label htmlFor="category-filter">Filter by Category:</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.name.toLowerCase()}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;