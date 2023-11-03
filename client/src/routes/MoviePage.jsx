import React, { useState } from 'react';

function MoviePage({ movieId }) {  // Assuming movieId is passed as a prop to this component
    const [review, setReview] = useState('');

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }

    const handleSubmitReview = () => {
        if (review.trim() === '') {
            alert('Please write a review before submitting.');
            return;
        }

        // Make an API call to the Flask server to save the review
        fetch(`/reviews/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `review=${encodeURIComponent(review)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error saving review: ' + data.error);
            } else {
                alert('Review saved successfully!');
                setReview('');  // Clear the review input after successful submission
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving review. Please try again later.');
        });
    }

    return (
        <div>
            <h2>Write a Review</h2>
            <textarea 
                value={review}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
                rows="5"
                cols="50"
            />
            <br />
            <button onClick={handleSubmitReview}>Submit Review</button>
        </div>
    )
}

export default MoviePage;
