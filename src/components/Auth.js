import React, { useState } from 'react';  
import Login from './Login';  
import HomePage from './HomePage';
  
const Auth = () => {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  
  const handleLogin = () => {  
   setIsAuthenticated(true);  
  };  
  
  if (!isAuthenticated) {  
   return <Login onLogin={handleLogin} />;  
  }  
  
  return <HomePage />;  
};  
  
export default Auth;