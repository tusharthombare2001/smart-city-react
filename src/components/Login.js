
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import default CSS for toast

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });


  const [message, setMessage] = useState(''); // State to hold the login message

  const navigate = useNavigate(); // To navigate programmatically after login

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);


        // Customized success toast
      // Customized success toast
    toast.success("🎉 Welcome Back, Login Successful!", {
      className: 'custom-toast',  // Apply custom class
      position: "bottom-center",    // Customize position
      autoClose: 3000,            // Close after 4 seconds
      hideProgressBar: false,     // Show progress bar
      closeOnClick: true,         // Close when clicked
      pauseOnHover: false,        // No pause on hover
      draggable: true,            // Draggable toast
      progress: undefined,
      style: {
        backgroundColor: '#4CAF50',  // Green background
        color: '#fff',                // White text
        fontWeight: 'bold',           // Bold text
      },
    });

       // Call onLogin to update authentication status
       onLogin();

       setTimeout(() => {
        navigate('/');
      }, 2000); // Adjust the delay as needed (in milliseconds)


      } catch (error) {
        // If login fails (e.g., 401 Unauthorized), display error toast
        if (error.response && error.response.status === 401) {
          const errorMessage = error.response.data; 
          toast.error("Invalid username or password. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          // Handle other errors
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
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
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
