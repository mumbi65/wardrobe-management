import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClothingItem from '../Clothing/ClothingItem';
import Filter from '../Filter/Filter';
import Search from '../Filter/Search';
import './Dashboard.css';

interface ClothingItem {
  id: number;
  name: string;
  description: string;
  category: string;
}

const Dashboard: React.FC = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await axios.get('/api/clothing');
        setClothingItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Error fetching clothing items', error);
      }
    };

    fetchClothingItems();
  }, []);

  const handleFilterChange = (category: string) => {
    const filtered = category === 'all'
      ? clothingItems
      : clothingItems.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  const handleSearchChange = (term: string) => {
    const filtered = clothingItems.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  const handleDelete = (id: number) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
    setFilteredItems(filteredItems.filter(item => item.id !== id));
  };

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`);
    // Implement edit functionality here
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Filter onFilterChange={handleFilterChange} />
      <Search onSearchChange={handleSearchChange} />
      <div className="clothing-items">
        {filteredItems.map(item => (
          <ClothingItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            category={item.category}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;