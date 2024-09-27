import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TouristDestinationList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios.get('/api/tourism/destinations')
      .then(response => {
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
        setError('Failed to fetch tourist destinations');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading tourist destinations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const addDestinationToList = (newDestination) => {
    setDestinations(prevDestinations => [...prevDestinations, newDestination]);
  };

  return (
    <div>
      <h1>Tourist Destinations</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>City</th>
            <th>Trip Date</th> {/* New column for trip date */}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {destinations.length > 0 ? (
            destinations.map(destination => (
              <tr key={destination.id}>
                <td>{destination.name}</td>
                <td>{destination.category}</td>
                <td>{destination.city}</td>
                <td>{destination.tripDate ? new Date(destination.tripDate).toLocaleDateString() : 'N/A'}</td> {/* Display trip date */}
                <td>
                  <a href={`/tourist-destination/${destination.id}`}>View Details</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No destinations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TouristDestinationList;
