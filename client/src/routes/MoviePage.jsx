import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import config from "../config.json";
import Review from "../components/Review"

function MoviePage() {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    const authToken = localStorage.getItem('authToken');
    const { movieId } = useParams();
    //gets the shit from the location can't get it from params. Fixes case where there no review and the Reviews for doesn't show up
    const { state } = useLocation();
    const { id, name } = state;


    useEffect(() => {
        //get the reviews 
        fetchReviews(movieId);

    }, [movieId, authToken]);

    //get the reviews 
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
                    setReviews(data.reviews);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }

    // for editing reviews in the future
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }

    //submitting a review
    const handleSubmitReview = () => {


        const hasUsername = reviews.some(review => review.username === localStorage.getItem("username"));

        if (hasUsername) {
            alert('You have already written a review');
            return;
        }

        if (review.trim() === '') {
            alert('Please write a review before submitting.');
            return;
        }

        // Make an API call to the Flask server to save the review
        fetch(`http://localhost:${config.PORT}/reviews/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                movieId: movieId,
                review: review,

            })
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

        //get the reviews after fetching
        fetchReviews(movieId);
    }

    //deleting a review
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

    //callback for review component
    const deleteReview = () => {
        console.log("callback worked")

        fetch(`http://localhost:${config.PORT}/reviews/${movieId}/${localStorage.getItem("username")}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(() => {

            fetchReviews(movieId);
        })
            .catch(error => {
                console.error('Error:', error);
                alert("Error deleting review. Please try again later.");
            })

        fetchReviews(movieId)

    }



    return (
        <div>
            <div>
                Reviews for {name}:

                {reviews.map((review) => {
                    return <Review username={review.username} review={review.review} isUser={localStorage.getItem("username") == review.username} deleteReview={deleteReview} ></Review>
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
        </div >
    )
}

export default MoviePage;
