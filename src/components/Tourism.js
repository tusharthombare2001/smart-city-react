import React from 'react';
import { useNavigate } from 'react-router-dom';
import CityCarousel from './CityCarousel'; // Import the carousel component
import './Tourism.css';
import puneImage from '../assets/shaniwarWada.jpg';
import MumbaiImage from '../assets/getWay.jpeg';
import NagpurImage from '../assets/fatulaLake.jpeg';
import SambhajiNagarImage from '../assets/ElloraCaves.jpeg';
import NashikImage from '../assets/trambakeswer.jpeg';

function Tourism() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  // Sample city data; replace with your actual data
  const cities = [
    { name: 'Pune', imageUrl: puneImage },
    { name: 'Mumbai', imageUrl: MumbaiImage },
    { name: 'Nagpur', imageUrl: NagpurImage },
    { name: 'Sambhaji Nagar', imageUrl: SambhajiNagarImage },
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Tourism;
