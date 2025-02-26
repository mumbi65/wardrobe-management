import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './EditClothing.css';

interface Category {
  id: number;
  name: string;
}

interface ClothingItemData {
  name: string;
  description: string;
  category: Category;
}

interface EditClothingProps {
  onEditSuccess?: () => void; // optional callback
}

const EditClothing: React.FC<EditClothingProps> = ({ onEditSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchClothingItem = async () => {
      try {
        const response = await axiosInstance.get(`/clothing-items/${id}/`);
        const data: ClothingItemData = response.data;
        console.log("Fetched clothing item:", data);
        setName(data.name);
        setDescription(data.description);
        setCategoryId(data.category && data.category.id ? data.category.id : 1);
      } catch (error) {
        console.error('Error fetching clothing item', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories/');
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    if (id) {
      fetchClothingItem();
      fetchCategories();
    }
  }, [id]);

  const handleEditClothing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedClothing = { name, description, category_id: categoryId };
      console.log("Payload:", updatedClothing);
      const response = await axiosInstance.put(`/clothing-items/${id}/`, updatedClothing);
      if (response.status === 200) {
        alert('Clothing item updated successfully');
        navigate('/dashboard');
        if (onEditSuccess) {
          onEditSuccess();
        }
      } else {
        alert('Failed to update clothing item');
      }
    } catch (error) {
      console.error('Error updating clothing item', error);
    }
  };

  return (
    <div className="edit-clothing-container">  
      <form onSubmit={handleEditClothing}>
      <h2>Edit Clothing Item</h2>
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
             value={categoryId}
             onChange={(e) => {
               const newValue = Number(e.target.value);
               console.log("Selected category id:", newValue);
               setCategoryId(newValue);
             }}
            required
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <>
                <option value={1}>Tops</option>
                <option value={2}>Bottoms</option>
                <option value={3}>Shoes</option>
                <option value={4}>Outwear</option>
                <option value={5}>Accessories</option>
              </>
            )}
          </select>
        </div>
        <button type="submit">Update Clothing</button>
      </form>
    </div>
  );
};

export default EditClothing;