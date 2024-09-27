// DestinationDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function DestinationDetail() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContacts, setShowContacts] = useState(false); 

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`/api/tourism/destinations/${id}`);
        setDestination(response.data);
      } catch (err) {
        setError('Failed to fetch destination details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const toggleContacts = () => {
    setShowContacts(!showContacts); // Toggle visibility
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!destination) return <div>No destination found</div>;

  return (
    <div>
      <h1>{destination.name}</h1>
      <img src={destination.imageUrl} alt={destination.name} />
      <p>Category: {destination.category}</p>
      <p>City: {destination.city}</p>
      <p>Entry Fee: {destination.entryFee}</p>
      <p>Timings: {destination.timings}</p>
      <p>Best Time to Visit: {destination.bestTimeToVisit}</p>
      <p>Trip Date: {destination.tripDate ? new Date(destination.tripDate).toLocaleDateString() : 'N/A'}</p>
      {/* Emergency Contact Button */}
      <button onClick={toggleContacts}>
        {showContacts ? 'Hide Emergency Contacts' : 'Show Emergency Contacts'}
      </button>

      {/* Emergency Contact Information */}
      {showContacts && (
        <div>
          <h2>Emergency Contact Information</h2>
          <p><strong>Local Police:</strong> 100</p>
          <p><strong>Hospital:</strong> 102</p>
          <p><strong>Tourist Information Center:</strong> 1800-xxx-xxxx</p>
          {/* Add more contacts as needed */}
        </div>
      )}
    </div>
  );
}

export default DestinationDetail;
