import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import lock icon
import './Auth.css';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Automatically toggle password visibility based on whether the input is empty or not
    if (name === 'password') {
      setShowPassword(value.length > 0); // Show password if there's content
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);

      toast.success("🎉 Welcome Back, Login Successful!", {
        className: 'custom-toast',  
        position: "bottom-center",    
        autoClose: 3000,            
        hideProgressBar: false,     
        closeOnClick: true,         
        pauseOnHover: false,        
        draggable: true,            
      });

      onLogin();
      setTimeout(() => {
        navigate('/'); // Navigate after successful login
      }, 2000); 

    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <div className="input-container">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="input-container">
              <FontAwesomeIcon 
                icon={faLock} // Use lock icon instead
                className="input-icon" // Reuse the same styling class for consistency
              />
              <input
                type={showPassword ? "text" : "password"} // Change input type based on state
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;  
