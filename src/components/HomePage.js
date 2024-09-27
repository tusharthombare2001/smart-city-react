import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // External CSS file

const HomePage = () => {
    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <header className="navbar">
                <div className="logo">
                     {/* Add logo image before the Smart City heading */}
                     <img src="Smartcity-logo.jpg" alt="Smartcity-logo" className="logo-image" /> {/* Adjust src to your actual logo path */}
                    <h1>Smart City</h1>
                   
                </div>
                <nav>
                    <ul>
                        <li><a href="#student">Student</a></li>
                        <li><a href="#hospital">Hospital</a></li>
                        <li><a href="#history">History</a></li>
                        <li><Link to="/tourism">Tourism</Link></li>
                        <li><Link to="/tourism/:id/feedback">Feedback</Link></li> {/* Adjust this as needed */}
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                <section className="intro">
                    <h2>Welcome to the Smart City Project</h2>
                    <p>This platform provides services for students, hospitals, tourism, and historical information.</p>
                </section>
            </main>

            {/* Footer */}
            <footer>
    <div className="footer-content">
        {/* About Smart City */}
        <div className="about-section">
            <h3>About Smart City</h3>
            <p>Our Smart City initiative is aimed at integrating modern technology with essential services to improve the quality of life for citizens. Explore our platform to discover educational resources, healthcare services, tourism highlights, and more.</p>
        </div>

        {/* Social Media Links */}
        <div className="social-icons">
            <p>Connect with us on:</p>
            <a href="https://github.com/tusharthombare2001" target="_blank" rel="noopener noreferrer">
                <img src="github.png" alt="GitHub" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="twitter.png" alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com/in/tushar-thombare-0824b7265/" target="_blank" rel="noopener noreferrer">
                <img src="linkedin.png" alt="LinkedIn" />
            </a>
        </div>

        {/* Contact Information */}
        <div className="contact-section">
            <h3>Contact Us</h3>
            <p>Email: tusharthombare@gmail.com.com</p>
            <p>Phone: +91 7517744853</p>
            <p>Address: Pune, Maharashtra, India</p>
        </div>
    </div>
    <div className="footer-bottom">
        <p>&copy; 2024 Smart City Project - All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
    </div>
</footer>
        </div>
    );
};

export default HomePage;
