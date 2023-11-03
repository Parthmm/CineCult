import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviePage() {  // Assuming movieId is passed as a prop to this component
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([])

    const location = useLocation();

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }

    const handleSubmitReview = () => {
        console.log(location.state.key);
        if (review.trim() === '') {
            alert('Please write a review before submitting.');
            return;
        }

        // Make an API call to the Flask server to save the review
        fetch(`/reviews/${location.state.key}`, {
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

    useEffect(() => {
        fetch(`/reviews/${location.state.key}`)  // Use the port from config
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network broken yeet")
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setReviews(data)
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });

    }, []);


    return (
        <div>
            <div>
                Reviews:
                {reviews.map((review) => {
                    return <div> <p>{review.review}</p> </div>
                })}
            </div>
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
