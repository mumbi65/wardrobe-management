import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './AuthForm.css';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const payload = isLogin ? { email, password } : { email, password, username };
      const response = await axios.post(endpoint, payload);
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert(`${isLogin ? 'Login' : 'Registration'} failed`);
      }
    } catch (error) {
      console.error(`There was an error during ${isLogin ? 'login' : 'registration'}!`, error);
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="input-group">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default AuthForm;