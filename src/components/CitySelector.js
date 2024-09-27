import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CitySelector.css'; // Import CSS for styling

function CitySelector() {
  const [cities] = useState(['Pune', 'Mumbai', 'Nagpur', 'Aurangabad', 'Nashik']);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityInfo, setCityInfo] = useState({ history: '', touristSpots: [], highlightedSpots: [] });
  
  const navigate = useNavigate();

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    fetchCityInfo(city);
    navigate(`/city/${city}`);  
  };

  const fetchCityInfo = (city) => {
    axios.get(`/api/tourism/cities/${city}`)
      .then(response => {
        console.log('City Info:', response.data);
        setCityInfo(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch city information:', error);
        setCityInfo({ history: '', touristSpots: [], highlightedSpots: [] });
      });
  };

  return (
    <div>
      <h2>Select a City in Maharashtra</h2>
      <select onChange={handleCityChange} defaultValue="">
        <option value="" disabled>Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>

      {cityInfo && (
        <div>
          <h3>{selectedCity}</h3>
          <p>{cityInfo.history}</p>
          {cityInfo.highlightedSpots && cityInfo.highlightedSpots.length > 0 ? (
            <div className="tourist-spot-container">
              {cityInfo.highlightedSpots.map((spot, index) => (
                <TouristSpotCard key={index} spot={spot} />
              ))}
            </div>
          ) : (
            <p>No highlighted tourist spots available.</p>
          )}
        </div>
      )}
    </div>
  );
}

// New TouristSpotCard Component
const TouristSpotCard = ({ spot }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <h5>{spot.name}</h5>
          <img src={spot.imageUrl} alt={spot.name} style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className="card-back">
          <h5>{spot.name}</h5>
          <p>{spot.description}</p>
          <button onClick={() => alert("More information!")}>More Info</button>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
