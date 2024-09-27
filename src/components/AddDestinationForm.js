import React, { useState } from 'react';
import axios from 'axios';
import './AddDestinationForm1.css'; 

function AddDestinationForm({ onAddDestination }) {
  const [destination, setDestination] = useState({
    name: '',
    category: '',
    timings: '',
    entryFee: '',
    bestTimeToVisit: '',
    imageUrl: '',
    videoUrl: '',
    city: '',
    tripDate: '',
  });

  const [imageUrls, setImageUrls] = useState([]);

  const bestTimeMapping = {
    Pune: 'October to February',
    Mumbai: 'November to February',
    Nagpur: 'November to March',
    SambhajiNagar: 'October to March',
    Nashik: 'September to March',
  };

  const imageUrlMapping = {
    Pune: [
      { url: 'https://th.bing.com/th/id/OIP.s0RXVX_YQEwEhtLtZ2dRvwHaEL?rs=1&pid=ImgDetMain.jpg', label: 'Pune - Shaniwar Wada' },
      { url: 'https://example.com/pune-image2.jpg', label: 'Pune - Aga Khan Palace' },
    ],
    Mumbai: [
      { url: 'https://example.com/mumbai-image1.jpg', label: 'Mumbai - Gateway of India' },
      { url: 'https://example.com/mumbai-image2.jpg', label: 'Mumbai - Marine Drive' },
      { url: 'https://example.com/mumbai-image3.jpg', label: 'Mumbai - Elephanta Caves' },
    ],
    Nagpur: [
      { url: 'https://example.com/nagpur-image1.jpg', label: 'Nagpur - Deekshabhoomi' },
      { url: 'https://example.com/nagpur-image2.jpg', label: 'Nagpur - Futala Lake' },
    ],
    SambhajiNagar: [
      { url: 'https://example.com/sambhajinagar-image1.jpg', label: 'Sambhaji Nagar - Ellora Caves' },
      { url: 'https://example.com/sambhajinagar-image2.jpg', label: 'Sambhaji Nagar - Bibi Ka Maqbara' },
    ],
    Nashik: [
      { url: 'https://example.com/nashik-image1.jpg', label: 'Nashik - Sula Vineyards' },
      { url: 'https://example.com/nashik-image2.jpg', label: 'Nashik - Trimbakeshwar' },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'city') {
      setDestination((prevState) => ({
        ...prevState,
        city: value,
        bestTimeToVisit: bestTimeMapping[value] || '',
        imageUrl: '', // Reset the selected image URL when changing city
      }));

      // Update image URLs based on the selected city
      setImageUrls(imageUrlMapping[value] || []);
    } else {
      setDestination((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (!destination.name || !destination.city || !destination.category) {
      alert('Please fill in all required fields: Name, City, and Category');
      return;
    }

    // Prepare the data to send to the backend
    const destinationData = {
      name: destination.name,
      category: destination.category,
      timings: destination.timings,
      entryFee: destination.entryFee ? parseFloat(destination.entryFee) : 0, // Ensure it's a valid number
      bestTimeToVisit: destination.bestTimeToVisit,
      imageUrl: destination.imageUrl,
      city: destination.city,
      tripDate: destination.tripDate,
    };

    // Post request to save destination in database
    axios.post('/api/tourism/destinations', destinationData)
      .then((response) => {
        alert('Destination added successfully!');

        // Call the parent handler to update the UI with the new destination
        onAddDestination(response.data);

        // Reset form fields after successful submission
        setDestination({
          name: '',
          category: '',
          timings: '',
          entryFee: '',
          bestTimeToVisit: '',
          imageUrl: '',
          videoUrl: '',
          city: '',
          tripDate: '',
        });

        // Clear the available image URLs list
        setImageUrls([]);
      })
      .catch((error) => {
        console.error('Error adding destination:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={destination.name}
        onChange={handleChange}
        required
      />

      <select name="city" value={destination.city} onChange={handleChange} required>
        <option value="">Select City</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Nagpur">Nagpur</option>
        <option value="SambhajiNagar">Sambhaji Nagar</option>
        <option value="Nashik">Nashik</option>
      </select>

      <select name="category" value={destination.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Historical">Historical</option>
        <option value="Adventure">Adventure</option>
        <option value="Nature/Wildlife">Nature/Wildlife</option>
        <option value="Religious/Spiritual">Religious/Spiritual</option>
        <option value="Mountain">Mountain</option>
      </select>

      <input
        type="text"
        name="timings"
        placeholder="Timings"
        value={destination.timings}
        onChange={handleChange}
      />

      <input
        type="number"
        name="entryFee"
        placeholder="Entry Fee"
        value={destination.entryFee}
        onChange={handleChange}
      />

      {/* Dropdown for selecting image URL based on city */}
      <select name="imageUrl" value={destination.imageUrl} onChange={handleChange}>
        <option value="">Select Image URL</option>
        {imageUrls.map((image, index) => (
          <option key={index} value={image.url}>
            {image.label}
            
          </option>
        ))}
      </select>

      {/* Date input for selecting trip date */}
      <label htmlFor="tripDate">Select Trip Date:</label>
      <input
        type="date"
        name="tripDate"
        value={destination.tripDate}
        onChange={handleChange}
      />

      <button type="submit">Add Destination</button>
    </form>
  );
}

export default AddDestinationForm;
