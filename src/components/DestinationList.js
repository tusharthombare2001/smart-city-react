import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function DestinationList({ destinations, onDeleteDestination }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this destination?");
    if (confirmDelete) {
      onDeleteDestination(id);
    }
  };

  return (
    <div className="tourist-spot-container">
      <input
        type="text"
        placeholder="Search Destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredDestinations.length === 0 ? (
        <p>No destinations found</p>
      ) : (
        filteredDestinations.map((destination) => (
          <div className="tourist-spot" key={destination.id}>
            <div className="card">
              <div className="card-front">
                <h5>{destination.name}</h5>
                <img src={destination.imageUrl} alt={destination.name} style={{ width: '100px', height: '100px' }} />
                <p>Category: {destination.category}</p>
                <p>City: {destination.city}</p>
                <p>Trip Date: {destination.tripDate ? new Date(destination.tripDate).toLocaleDateString() : 'N/A'}</p>
               
              </div>
              <div className="card-back">
                <h5>{destination.name} </h5>
                <Link to={`/destination/${destination.id}`}>
                  <button>More Info</button>
                </Link>
                <p>Entry Fee: {destination.entryFee}</p>
                <p>Timings: {destination.timings}</p>
                <p>Best Time to Visit: {destination.bestTimeToVisit}</p>
                <button onClick={() => handleDelete(destination.id)}>
                Delete
              </button>
              </div>
             
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DestinationList;
