import React from 'react';
import axiosInstance from '../../api/axiosInstance';
import './ClothingItem.css';


interface Category{
  id: number;
  name: string;
}

interface ClothingItemProps {
  id: number;
  name: string;
  description: string;
  category?: Category;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ id, name, description, category, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this clothing item?")) {
      try {
        await axiosInstance.delete(`/clothing-items/${id}/`);
        onDelete(id);
      } catch (error) {
        console.error('Error deleting clothing item', error);
      }
    };
  }

  return (
    <div className="clothing-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p><strong>Category:</strong> {category ? category.name : "None"}</p>
      <div className="button-group">
        <button onClick={() => onEdit(id)} className="edit-button">Edit</button>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default ClothingItem;