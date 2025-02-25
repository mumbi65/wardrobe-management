import React, { useState } from 'react';
import './Search.css';

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;