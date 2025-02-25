import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Shoes.css';

interface Shoe {
  id: number;
  name: string;
  description: string;
}

const Shoes: React.FC = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [newShoe, setNewShoe] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get('/api/shoes');
        setShoes(response.data);
      } catch (error) {
        console.error('Error fetching shoes', error);
      }
    };

    fetchShoes();
  }, []);

  const handleAddShoe = async () => {
    try {
      const response = await axios.post('/api/shoes', newShoe);
      setShoes([...shoes, response.data]);
      setNewShoe({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding shoe', error);
    }
  };

  const handleDeleteShoe = async (id: number) => {
    try {
      await axios.delete(`/api/shoes/${id}`);
      setShoes(shoes.filter(shoe => shoe.id !== id));
    } catch (error) {
      console.error('Error deleting shoe', error);
    }
  };

  return (
    <div className="shoes-container">
      <h2>Shoes</h2>
      <div className="add-shoe">
        <input
          type="text"
          placeholder="Name"
          value={newShoe.name}
          onChange={(e) => setNewShoe({ ...newShoe, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newShoe.description}
          onChange={(e) => setNewShoe({ ...newShoe, description: e.target.value })}
        />
        <button onClick={handleAddShoe}>Add Shoe</button>
      </div>
      <ul>
        {shoes.map((shoe) => (
          <li key={shoe.id}>
            <span>{shoe.name}</span>
            <span>{shoe.description}</span>
            <button onClick={() => handleDeleteShoe(shoe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shoes;