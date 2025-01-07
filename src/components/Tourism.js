// Tourism.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddDestinationForm from './AddDestinationForm';
import DestinationList from './DestinationList';
import CityCarousel from './CityCarousel'; // Import the new carousel component
import './Tourism.css';
import puneImage from '../assets/shaniwarWada.jpg';
import MumbaiImage from '../assets/getWay.jpeg';
import NagpurImage from '../assets/fatulaLake.jpeg';
import SambhajiNagarImage from '../assets/ElloraCaves.jpeg';
import NashikImage from '../assets/trambakeswer.jpeg';

function Tourism() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDestinations = JSON.parse(localStorage.getItem('destinations')) || [];
    setDestinations(storedDestinations);
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios.get('/api/tourist/destinations')
      .then(response => {
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
          localStorage.setItem('destinations', JSON.stringify(response.data));
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        setError('Failed to fetch tourist destinations');
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const addDestinationToList = (newDestination) => {
    setDestinations(prevDestinations => {
      const updatedDestinations = [...prevDestinations, newDestination];
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
      return updatedDestinations;
    });
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem('destinations');
    navigate('/login');
  };

  // Sample city data; replace with your actual data
  const cities = [
    { name: 'Pune', imageUrl: puneImage},
    { name: 'Mumbai', imageUrl: MumbaiImage },
    { name: 'Nagpur', imageUrl: NagpurImage},
    { name: 'Sambhaji Nagar', imageUrl: SambhajiNagarImage},
    { name: 'Nashik', imageUrl: NashikImage }
  ];

  return (
    <div className="container">
      <div className="background1">
        <div className="content">
          <h1>WELCOME TO MAHARASHTRA</h1>
        </div>
      </div>

      <div className="background2">
        <div className="content">
          <h2>Pick Your Trail - See MAHARASHTRA - As Per Your Interest</h2>
          <CityCarousel cities={cities} /> {/* Add the carousel here */}
          <button onClick={toggleForm}>
            {showForm ? 'Show Destinations' : 'Add Destination'}
          </button>

          {showForm ? (
            <AddDestinationForm onAddDestination={addDestinationToList} />
          ) : loading ? (
            <div>Loading tourist destinations...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <DestinationList 
              destinations={destinations} 
            />
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Tourism;
