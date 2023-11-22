import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from "../config.json";

function MoviePage() {  // Assuming movieId is passed as a prop to this component
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [movieName, setMovieName] = useState('');
    const authToken = localStorage.getItem('authToken');
    const { movieId } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:${config.PORT}/reviews/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network broken yeet")
            }
            return response.json();
        })
        .then((data) => {
            setMovieName(data.name);
            setReviews(data.reviews);
        })
        .catch((error) => {
            console.error('Error fetching movies:', error);
        });
        
    }, [movieId, authToken]);

    const fetchReviews = (movieId) => {
        if (movieId) {
            fetch(`http://localhost:${config.PORT}/reviews/${movieId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network broken yeet");
                    }
                    return response.json();
                })
                .then((data) => {
                    setMovieName(data.name);
                    setReviews(data.reviews);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }

    const handleSubmitReview = () => {
        if (review.trim() === '') {
            alert('Please write a review before submitting.');
            return;
        }

        // Make an API call to the Flask server to save the review
        fetch(`http://localhost:${config.PORT}/reviews/${movieId}`, {
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

        fetchReviews(movieId);
    }


    const handleDeleteReview = () => {
        fetch(`http://localhost:${config.PORT}/reviews/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

            .catch(error => {
                console.error('Error:', error);
                alert('Error saving review. Please try again later.');
            });

        fetchReviews(movieId);
    }




    return (
        <div>
            <div>
                Reviews for {movieName.name}:
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


            <button onClick={handleDeleteReview}>Delete all Reviews</button>
        </div>
    )
}

export default MoviePage;
