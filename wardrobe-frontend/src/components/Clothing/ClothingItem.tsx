import React from 'react';
import axios from 'axios';
import './ClothingItem.css';

interface ClothingItemProps {
  id: number;
  name: string;
  description: string;
  category: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ id, name, description, category, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/clothing/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting clothing item', error);
    }
  };

  return (
    <div className="clothing-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p><strong>Category:</strong> {category}</p>
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ClothingItem;