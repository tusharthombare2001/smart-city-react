import React, { useState, useEffect } from "react";
import axios from "axios";
import './FeedbackList.css';  // Import feedback-specific styles

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]); // Initialize as an empty array

    useEffect(() => {
        axios.get('/api/tourism/feedback')
            .then(response => {
                console.log("Fetched feedback data:", response.data);
                const feedbackData = Array.isArray(response.data) ? response.data : []; 
                setFeedbacks(feedbackData); 
            })
            .catch(error => console.error("Error fetching feedback", error));
    }, []);  // Remove destinationId dependency

    return (
        <div className="feedback-list">
            <h2>Feedback</h2>
            {feedbacks.length > 0 ? (
                <ul>
                    {feedbacks.map(fb => (
                        <li key={fb.id} className="feedback-item">
                            <p>{fb.userName}: {fb.comments} (Rating: {fb.rating})</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feedback available.</p>
            )}
        </div>
    );
};

export default FeedbackList;
