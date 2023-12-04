import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import config from "../config.json";
import Review from "../components/Review"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

//styling 
import styles from "../styles/Dashboard.module.css"
import reviewStyles from "../styles/Review.module.css"
import formStyles from "../styles/Form.module.css"

function MoviePage() {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    const authToken = localStorage.getItem('authToken');
    const { movieId } = useParams();
    //gets the shit from the location can't get it from params. Fixes case where there no review and the Reviews for doesn't show up
    const { state } = useLocation();
    const { name } = state;

        // Use useNavigate instead of useHistory
        const navigate = useNavigate();

        // Function to navigate to the watchlist
        const goToWatchlist = () => {
            // Assuming you have a route named '/watchlist'
            navigate('/watchlist');
        };

    //modal stuff from MUI docs 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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

    // const addToWatchlist = (contentId, contentType) => {
    //     fetch(`http://localhost:${config.PORT}/add_to_watchlist`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${authToken}`,
    //         },
    //         body: JSON.stringify({
    //             user_id: localStorage.getItem("user_id"),
    //             content_id: contentId,
    //             content_type: contentType,
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.message);
            
    //         })
    //         .catch(error => {
    //             console.error('Error adding to watchlist:', error);
    //         });
    // };



    return (
        <div className={reviewStyles.review_background}>

            <h1>
                Reviews for {name}:
            </h1>
            <div className={styles.dashboard_background}>


                {reviews.map((review) => {
                    return <Review username={review.username} review={review.review} isUser={localStorage.getItem("username") === review.username} deleteReview={deleteReview} ></Review>
                })}
            </div>

            {/*
            <div className={formStyles.form_div}>
                <h2>Write a Review</h2>
                <textarea
                    className={formStyles.input_box}
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Write your review here..."
                    rows="5"
                    cols="50"
                />

                <button className={formStyles.form_button} onClick={handleSubmitReview}>Submit Review</button>


                <button className={formStyles.form_button} onClick={handleDeleteReview}>Delete all Reviews</button>
            </div>
            */}
            <br />


            <Button onClick={handleOpen}>Write a review</Button>
            {/* <Button onClick={addToWatchlist}>Add to WatchList</Button> */}
            <Modal
                className={formStyles.form_background}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={formStyles.form_div}>
                    <h2>Write a Review</h2>
                    <textarea
                        className={formStyles.input_box}
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Write your review here..."
                        rows="5"
                        cols="50"
                    />

                    <button className={formStyles.form_button} onClick={() => { handleSubmitReview(); handleClose(); }}>Submit Review</button>


                    <button className={formStyles.form_button} onClick={handleDeleteReview}>Delete all Reviews</button>
                </div>

            </Modal >




        </div >
    )
}

export default MoviePage;
