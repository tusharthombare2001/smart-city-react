// CityCarousel.js
// this id=f for the fliped imeges scrolling images 

import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CityCarousel.css'; // Create custom styles for the carousel

const CityCarousel = ({ cities }) => {
  const navigate = useNavigate(); // Use navigate from react-router

  // Define handleExplore function
  const handleExplore = (cityName) => {
    navigate(`/city/${cityName}`); // Navigate to city-specific route
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 slides at a time
    slidesToScroll: 1,
    centerMode: true, // Center the slides
    centerPadding: '0',
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {cities.map((city, index) => (
          <div className="carousel-item card" key={index}>
            <img src={city.imageUrl} alt={city.name} />
            <h3>{city.name}</h3>
            <button onClick={() => handleExplore(city.name)}>Explore</button> {/* Call handleExplore */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CityCarousel;
