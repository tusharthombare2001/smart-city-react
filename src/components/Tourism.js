import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddDestinationForm from './AddDestinationForm';
import DestinationList from './DestinationList';
import CitySelector from './CitySelector';
import './Tourism.css'; 

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
          localStorage.setItem('destinations', JSON.stringify(response.data)); // Sync with local storage
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
      localStorage.setItem('destinations', JSON.stringify(updatedDestinations)); // Sync with local storage
      return updatedDestinations;
    });
    setShowForm(false); 
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDeleteDestination = (id) => {
    axios.delete(`/api/tourism/destinations/${id}`)
      .then(() => {
        setDestinations((prevDestinations) => {
          const updatedDestinations = prevDestinations.filter(dest => dest.id !== id);
          localStorage.setItem('destinations', JSON.stringify(updatedDestinations)); // Update local storage
          return updatedDestinations;
        });
      })
      .catch((error) => {
        console.error('Error deleting destination:', error);
      });
  };

  if (loading) {
    return <div>Loading destinations...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('destinations'); // Clear saved destinations
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container">
      <h1>Tourism Module</h1>

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
          onDeleteDestination={handleDeleteDestination} 
        />
      )}

      <CitySelector />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Tourism;
