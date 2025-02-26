import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import './AuthForm.css';
import axiosInstance from '../../api/axiosInstance';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match. Please retype them.");
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login/' : '/api/auth/register/';
      const payload = isLogin ? { email, password } : { email, password, username };
      const response = await axiosInstance.post(endpoint, payload);
      if (!isLogin && response.data.token) {
        alert("Registration successful. Please login.");
        navigate('/login');
      } else if (isLogin && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('username', username);
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
            <FaUser className="input-icon"/>
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
          <FaEnvelope className="input-icon"/>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group password-group">
          <FaLock className="input-icon"/>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-password" onClick={toggleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {!isLogin && (
          <div className="input-group password-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default AuthForm;