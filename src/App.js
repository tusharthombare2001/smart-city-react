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
import Tourism from './components/Tourism';  // Add this import

import DestinationDetail from './components/DestinationDetail';

import CityDetails from './components/CityDetails';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
 


function App() {

   // State to manage whether the user is logged in or not
   const [isAuthenticated, setIsAuthenticated] = useState(false);


    // Function to handle successful login
    const handleLogin = () => {
      setIsAuthenticated(true);
    };


   // Private Route component to protect routes
   const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };




  return (
    <Router>
      <div className="App">
        <h1></h1>
        <Routes>
          {/* Define the routes for login and registration */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />


          {/* Protect the homepage and other routes */}
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/student" element={<PrivateRoute element={<Student />} />} />
          <Route path="/hospital" element={<PrivateRoute element={<Hospital />} />} />


            {/* Corrected the name to TouristDestinationList */}
          {/* <Route path="/tourism" element={<PrivateRoute element={<TouristDestinationList />} />} /> */}

            
          {/* Add the feedback form and list */}
          <Route path="/tourism/:id/feedback" element={<PrivateRoute element={<FeedbackForm />} />} />

           {/* Updated tourism route */}
           <Route path="/tourism" element={<PrivateRoute element={<Tourism />} />} />
           <Route path="/city/:cityName" element={<CityDetails />} /> {/* New route */}

           {/* Feedback list route with destinationId passed to FeedbackList */}
           <Route path="/tourism/:id/feedback/list" element={<PrivateRoute element={<FeedbackListWrapper />} />} />


           <Route path="/destination/:id" element={<DestinationDetail />} /> {/* Add the detail route */}


          {/* Redirect to login page if no path matches */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}


// Wrapper component to pass destinationId to FeedbackList
const FeedbackListWrapper = () => {
  const { id } = useParams(); // Get the destination ID from the URL
  return <FeedbackList destinationId={id} />;
};

export default App;
