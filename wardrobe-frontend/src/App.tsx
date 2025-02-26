import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Pages/Home';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddClothing from './components/Clothing/AddClothing';
import NotFound from './components/Pages/NotFound';
import EditClothing from './components/Clothing/EditClothing';
// import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-clothing" element={<AddClothing />} />
            <Route path="/edit-clothing/:id" element={<EditClothing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;