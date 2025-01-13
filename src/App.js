import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes, 
  Navigate, useParams } from 'react-router-dom';
  import Auth from './components/Auth';
import Register from './components/register';
import Login from './components/Login';
import './components/Auth.css'; 
import HomePage from './components/HomePage';
import Student from './components/Student';  
import Hospital from './components/Hospital';
import Tourism from './components/Tourism'; 
import CityDetails from './components/CityDetails';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

 


function App() {

   const [isAuthenticated, setIsAuthenticated] = useState(false);


   
    const handleLogin = () => {
      setIsAuthenticated(true);
    };


   
   const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };




  return (
    <Router>
      <div className="App">
        <h1></h1>
        <Routes>
        
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />


          
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/student" element={<PrivateRoute element={<Student />} />} />
          <Route path="/hospital" element={<PrivateRoute element={<Hospital />} />} />
        
          <Route path="/tourism/:id/feedback" element={<PrivateRoute element={<FeedbackForm />} />} />

           
           <Route path="/tourism" element={<PrivateRoute element={<Tourism />} />} />
           
           <Route path="/city/:cityName" element={<CityDetails />} /> 

           
           <Route path="/tourism/:id/feedback/list" element={<PrivateRoute element={<FeedbackListWrapper />} />} />


            
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}



const FeedbackListWrapper = () => {
  const { id } = useParams(); 
  return <FeedbackList destinationId={id} />;
};

export default App;
