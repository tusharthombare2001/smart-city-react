import React, { useState } from "react";
import axios from "axios";
import FeedbackList from "./FeedbackList";  // Import the FeedbackList component
import './Feedback.css';  // Import feedback-specific styles

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({ userName: "", comments: "", rating: 0 });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    // Handle star rating selection
    const handleStarClick = (ratingValue) => {
        setFeedback({ ...feedback, rating: ratingValue });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/tourism/feedback', feedback)
            .then(response => {
                alert("Feedback submitted!");
                // Optionally refresh the feedback list here
            })
            .catch(error => console.error("Error submitting feedback", error));
    };

    return (
        <div className="feedback-container">
            <form onSubmit={handleSubmit} className="feedback-form">
                <h2>Leave Your Feedback</h2>
                <input
                    type="text"
                    name="userName"
                    placeholder="Your Name"
                    onChange={handleChange}
                    className="feedback-input"
                />
                <textarea
                    name="comments"
                    placeholder="Your Comments"
                    onChange={handleChange}
                    className="feedback-textarea"
                ></textarea>
                
                <div className="star-rating">
                    <h3>Rate Us:</h3>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${feedback.rating >= star ? "filled" : ""}`}
                            onClick={() => handleStarClick(star)}
                        >
                            &#9733; {/* Unicode star character */}
                        </span>
                    ))}
                </div>
                
                <button type="submit" className="feedback-submit">Submit Feedback</button>
            </form>

            {/* Render the FeedbackList component below the form */}
            <FeedbackList />
        </div>
    );
};

export default FeedbackForm;
