import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/Login';
import './components/Auth.css'; 


function App() {
  return (
<Router>
      <div className="App">
        <h1>Smart City Authentication</h1>
        <Routes>
          {/* Define the routes for login and registration */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect to login page if no path matches */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
