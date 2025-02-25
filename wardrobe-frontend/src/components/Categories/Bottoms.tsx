import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bottoms.css';

interface Bottom {
  id: number;
  name: string;
  description: string;
}

const Bottoms: React.FC = () => {
  const [bottoms, setBottoms] = useState<Bottom[]>([]);
  const [newBottom, setNewBottom] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchBottoms = async () => {
      try {
        const response = await axios.get('/api/bottoms');
        setBottoms(response.data);
      } catch (error) {
        console.error('Error fetching bottoms', error);
      }
    };

    fetchBottoms();
  }, []);

  const handleAddBottom = async () => {
    try {
      const response = await axios.post('/api/bottoms', newBottom);
      setBottoms([...bottoms, response.data]);
      setNewBottom({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding bottom', error);
    }
  };

  const handleDeleteBottom = async (id: number) => {
    try {
      await axios.delete(`/api/bottoms/${id}`);
      setBottoms(bottoms.filter(bottom => bottom.id !== id));
    } catch (error) {
      console.error('Error deleting bottom', error);
    }
  };

  return (
    <div className="bottoms-container">
      <h2>Bottoms</h2>
      <div className="add-bottom">
        <input
          type="text"
          placeholder="Name"
          value={newBottom.name}
          onChange={(e) => setNewBottom({ ...newBottom, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newBottom.description}
          onChange={(e) => setNewBottom({ ...newBottom, description: e.target.value })}
        />
        <button onClick={handleAddBottom}>Add Bottom</button>
      </div>
      <ul>
        {bottoms.map((bottom) => (
          <li key={bottom.id}>
            <span>{bottom.name}</span>
            <span>{bottom.description}</span>
            <button onClick={() => handleDeleteBottom(bottom.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bottoms;