import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import './AddClothing.css';


interface Category {
  id: number;
  name: string;
}

const AddClothing: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<number>(1);
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

  const handleAddClothing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newClothing = { name, description, category_id: category };
      const response = await axiosInstance.post('/clothing-items/', newClothing);
      if (response.status === 201 || response.data.id) {
        alert('Clothing item added successfully');
        setName('');
        setDescription('');
        setCategory(1);
        navigate('/dashboard');
      } else {
        alert('Failed to add clothing item');
      }
    } catch (error) {
      console.error('Error adding clothing item', error);
    }
  };

  return (
    <div className="add-clothing-container">
      <form onSubmit={handleAddClothing}>
      <h2>Add Clothing Item</h2>
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
            onChange={(e) => setCategory(Number(e.target.value))}
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
        <button type="submit">Add Clothing</button>
      </form>
    </div>
  );
};

export default AddClothing;