import React, { useState } from 'react';
import axios from 'axios';
import './AddClothing.css';

const AddClothing: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tops');

  const handleAddClothing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newClothing = { name, description, category };
      const response = await axios.post('/api/clothing', newClothing);
      if (response.data.success) {
        alert('Clothing item added successfully');
        setName('');
        setDescription('');
        setCategory('tops');
      } else {
        alert('Failed to add clothing item');
      }
    } catch (error) {
      console.error('Error adding clothing item', error);
    }
  };

  return (
    <div className="add-clothing-container">
      <h2>Add Clothing Item</h2>
      <form onSubmit={handleAddClothing}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
        <button type="submit">Add Clothing</button>
      </form>
    </div>
  );
};

export default AddClothing;