import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import AddDestinationForm from './AddDestinationForm'; 

function DestinationManager() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Retrieve destinations from local storage when the component mounts
    const savedDestinations = localStorage.getItem('destinations');
    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
    }
  }, []);

  useEffect(() => {
    // Store destinations in local storage whenever they change
    localStorage.setItem('destinations', JSON.stringify(destinations));
  }, [destinations]);

  const handleAddDestination = (newDestination) => {
    setDestinations((prevDestinations) => [...prevDestinations, newDestination]);
  };

  const handleDeleteDestination = (id) => {
    axios.delete(`/api/tourism/destinations/${id}`)
      .then(() => {
        setDestinations(prevDestinations => prevDestinations.filter(destination => destination.id !== id));
      })
      .catch(error => {
        console.error('Error deleting destination:', error);
      });
  };

  return (
    <div>
      <h1>Manage Destinations</h1>
      <AddDestinationForm onAddDestination={handleAddDestination} />
      <h2>Destination List</h2>
      <div className="destination-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <h3>{destination.name}</h3>
            <p>Category: {destination.category}</p>
            <p>Timings: {destination.timings}</p>
            <p>Entry Fee: {destination.entryFee}</p>
            <p>Best Time to Visit: {destination.bestTimeToVisit}</p>
            <p>City: {destination.city}</p>
            <p>Trip Date: {destination.tripDate}</p>
            <img src={destination.imageUrl} alt={destination.name} style={{ width: '100px', height: '100px' }} />
            <button onClick={() => handleDeleteDestination(destination.id)}>Delete</button> {/* Use handleDeleteDestination */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationManager;
