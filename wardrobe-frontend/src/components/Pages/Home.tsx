import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Wardrobe Management System</h1>
      <p>Manage your wardrobe efficiently and effortlessly.</p>
      <div className="home-buttons">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
      </div>
    </div>
  );
};

export default Home;