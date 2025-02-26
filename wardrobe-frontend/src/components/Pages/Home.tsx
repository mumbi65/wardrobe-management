import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { motion } from "motion/react"

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="background-overlay">
      <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        Welcome to the Wardrobe Management System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
        Manage your wardrobe efficiently and effortlessly.
        </motion.p>
        <motion.div
          className="home-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
      </motion.div>
    </div>
    </div>
  );
};

export default Home;