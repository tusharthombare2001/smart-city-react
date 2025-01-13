// CityCarousel.js
// this id=f for the fliped imeges scrolling images 

import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CityCarousel.css'; 

const CityCarousel = ({ cities }) => {
  const navigate = useNavigate(); 

 
  const handleExplore = (cityName) => {
    navigate(`/city/${cityName}`); 
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    centerMode: true, 
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
