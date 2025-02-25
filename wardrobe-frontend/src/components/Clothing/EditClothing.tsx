import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditClothing.css';

interface EditClothingProps {
  id: number;
  onEditSuccess: () => void;
}

const EditClothing: React.FC<EditClothingProps> = ({ id, onEditSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tops');

  useEffect(() => {
    const fetchClothingItem = async () => {
      try {
        const response = await axios.get(`/api/clothing/${id}`);
        const { name, description, category } = response.data;
        setName(name);
        setDescription(description);
        setCategory(category);
      } catch (error) {
        console.error('Error fetching clothing item', error);
      }
    };

    fetchClothingItem();
  }, [id]);

  const handleEditClothing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedClothing = { name, description, category };
      const response = await axios.put(`/api/clothing/${id}`, updatedClothing);
      if (response.data.success) {
        alert('Clothing item updated successfully');
        onEditSuccess();
      } else {
        alert('Failed to update clothing item');
      }
    } catch (error) {
      console.error('Error updating clothing item', error);
    }
  };

  return (
    <div className="edit-clothing-container">
      <h2>Edit Clothing Item</h2>
      <form onSubmit={handleEditClothing}>
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
        <button type="submit">Update Clothing</button>
      </form>
    </div>
  );
};

export default EditClothing;