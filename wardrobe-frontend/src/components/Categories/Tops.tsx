import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tops.css';

interface Top {
  id: number;
  name: string;
  description: string;
}

const Tops: React.FC = () => {
  const [tops, setTops] = useState<Top[]>([]);
  const [newTop, setNewTop] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const response = await axios.get('/api/tops');
        setTops(response.data);
      } catch (error) {
        console.error('Error fetching tops', error);
      }
    };

    fetchTops();
  }, []);

  const handleAddTop = async () => {
    try {
      const response = await axios.post('/api/tops', newTop);
      setTops([...tops, response.data]);
      setNewTop({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding top', error);
    }
  };

  const handleDeleteTop = async (id: number) => {
    try {
      await axios.delete(`/api/tops/${id}`);
      setTops(tops.filter(top => top.id !== id));
    } catch (error) {
      console.error('Error deleting top', error);
    }
  };

  return (
    <div className="tops-container">
      <h2>Tops</h2>
      <div className="add-top">
        <input
          type="text"
          placeholder="Name"
          value={newTop.name}
          onChange={(e) => setNewTop({ ...newTop, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTop.description}
          onChange={(e) => setNewTop({ ...newTop, description: e.target.value })}
        />
        <button onClick={handleAddTop}>Add Top</button>
      </div>
      <ul>
        {tops.map((top) => (
          <li key={top.id}>
            <span>{top.name}</span>
            <span>{top.description}</span>
            <button onClick={() => handleDeleteTop(top.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tops;