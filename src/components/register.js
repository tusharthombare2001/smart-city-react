import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate(); // To navigate programmatically after registration

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', userData);
      alert(response.data);  // Show success message
      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      alert("Error: " + error.response.data);  // Show error message
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
