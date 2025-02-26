import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import ClothingItem from '../Clothing/ClothingItem';
import Filter from '../Filter/Filter';
import Search from '../Filter/Search';
import './Dashboard.css';


interface Category {
  id: number;
  name: string;
}

interface ClothingItem {
  id: number;
  name: string;
  description: string;
  category_detail: Category;
}

const Dashboard: React.FC = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await axiosInstance.get('/clothing-items/');
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
      : clothingItems.filter(
          item => (item.category_detail?.name || '').toLowerCase() === category.toLowerCase()
        );
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
      navigate(`/edit-clothing/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Filter onFilterChange={handleFilterChange} />
      <Search onSearchChange={handleSearchChange} />
      <div className="clothing-items">
        {filteredItems.length === 0 ? (
          <p>No clothing items found. Please add some items</p>
        ) : (
        filteredItems.map(item => (
          <ClothingItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            category={item.category_detail}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
      </div>
    </div>
  );
};

export default Dashboard;