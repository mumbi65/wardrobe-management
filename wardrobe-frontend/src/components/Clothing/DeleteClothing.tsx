import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import './DeleteClothing.css';

const DeleteClothing: React.FC = () => {
  const [id, setId] = useState('');

  const handleDeleteClothing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.delete(`/clothing-items/${id}/`);
      if (response.status === 204) {
        alert('Clothing item deleted successfully');
        setId('');
      } else {
        alert('Failed to delete clothing item');
      }
    } catch (error) {
      console.error('Error deleting clothing item', error);
    }
  };

  return (
    <div className="delete-clothing-container">
      <h2>Delete Clothing Item</h2>
      <form onSubmit={handleDeleteClothing}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Clothing ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Clothing</button>
      </form>
    </div>
  );
};

export default DeleteClothing;