import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './CityDetails.css';

function CityDetails() {
  const { cityName } = useParams();
  const [cityInfo, setCityInfo] = useState({
    history: '',
    touristSpots: [],
    highlightedSpots: [],
  });
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [zoomLevel, setZoomLevel] = useState(12); // Default zoom level

  useEffect(() => {
    axios
      .get(`/api/tourism/cities/${cityName}`)
      .then((response) => {
        setCityInfo(response.data);

        // Set the map center based on the city
        if (cityName.toLowerCase() === 'pune') {
          setMapCenter([18.5204, 73.8567]);
        } else if (cityName.toLowerCase() === 'mumbai') {
          setMapCenter([19.0760, 72.8777]);
        } else if (cityName.toLowerCase() === 'nagpur') {
          setMapCenter([21.1458, 79.0882]);
        } else if (cityName.toLowerCase() === 'aurangabad') {
          setMapCenter([19.8762, 75.3433]);
        } else if (cityName.toLowerCase() === 'nashik') {
          setMapCenter([20.0118, 73.7908]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch city information:', error);
      });
  }, [cityName]);

  // Adding search control to the map
  function MapWithSearchControl() {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      // Create and add search control
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'button', // You can customize the style here
      });
      
      map.addControl(searchControl);

      return () => {
        map.removeControl(searchControl);
      };
    }, [map]);

    return null;
  }

  return (
    <div className="city-details-container">
      <div className="hero-section">
        <h1>{cityName} - Discover the Best of {cityName}</h1>
        <p className="hero-text">{cityInfo.history || 'No history available.'}</p>
      </div>

      <div className="section">
        <h2>Highlighted Tourist Spots</h2>
        {cityInfo.highlightedSpots && cityInfo.highlightedSpots.length > 0 ? (
          <div className="card-container">
            {cityInfo.highlightedSpots.map((spot, index) => (
              <div key={index} className="tourist-spot-card">
                <img src={spot.imageUrl} alt={spot.name} className="spot-image" />
                <h4>{spot.name}</h4>
                <p>{spot.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No highlighted tourist spots available.</p>
        )}
      </div>

      <div className="section">
        <h2>Popular Tourist Spots</h2>
        {cityInfo.touristSpots && cityInfo.touristSpots.length > 0 ? (
          <div className="destination-list">
            {cityInfo.touristSpots.map((spot, index) => (
              <div key={index} className="destination-card">
                <img src={spot.imageUrl} alt={spot.name} className="destination-image" />
                <h4>{spot.name}</h4>
                <p>{spot.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tourist spots available.</p>
        )}
      </div>

      <h3>Map of {cityName}</h3>
      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cityInfo.touristSpots.map((spot, index) => {
          const lat = parseFloat(spot.latitude);
          const lon = parseFloat(spot.longitude);

          // Validate the latitude and longitude values
          if (!isNaN(lat) && !isNaN(lon)) {
            return (
              <Marker
                key={index}
                position={[lat, lon]}
                icon={new L.Icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })}
              >
                <Popup>
                  <h4>{spot.name}</h4>
                  <p>{spot.description}</p>
                </Popup>
              </Marker>
            );
          } else {
            console.error(`Invalid coordinates for spot ${spot.name}: (${spot.latitude}, ${spot.longitude})`);
            return null;
          }
        })}
        <MapWithSearchControl />
      </MapContainer>
    </div>
  );
}

export default CityDetails;
