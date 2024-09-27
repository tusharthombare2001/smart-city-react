import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CityDetails.css'; // CSS for card styles


function CityDetails() {
  const { cityName } = useParams();
  const [cityInfo, setCityInfo] = useState({ history: '', touristSpots: [], highlightedSpots: [] });

  useEffect(() => {
    // Fetch city information when the component loads
    axios.get(`/api/tourism/cities/${cityName}`)
      .then(response => {
        setCityInfo(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch city information:', error);
      });
  }, [cityName]);

  return (
    <div>
      <h2>{cityName} - Details</h2>
      <h3>History</h3>
      <p>{cityInfo.history || "No history available."}</p>

      <h3>Highlighted Tourist Spots</h3>
      {cityInfo.highlightedSpots && cityInfo.highlightedSpots.length > 0 ? (
        <div className="card-container">
          {cityInfo.highlightedSpots.map((spot, index) => (
            <div key={index} className="city-card">
              <img src={spot.imageUrl} alt={spot.name} className="city-image" />
              <h4>{spot.name}</h4>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No highlighted tourist spots available.</p>
      )}

      <h3>Tourist Spots</h3>
      {cityInfo.touristSpots && cityInfo.touristSpots.length > 0 ? (
        <div className="card-container">
          {cityInfo.touristSpots.map((spot, index) => (
            <div key={index} className="city-card">
              <img src={spot.imageUrl} alt={spot.name} className="city-image" />
              <h4>{spot.name}</h4>
              <p>{spot.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tourist spots available.</p>
      )}
    </div>
  );
}

export default CityDetails;


