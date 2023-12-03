import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import config from "../config.json";
import Review from "../components/Review"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'

//styling 
import styles from "../styles/Dashboard.module.css"
import reviewStyles from "../styles/Review.module.css"
import formStyles from "../styles/Form.module.css"

function TVShowPage() {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    const authToken = localStorage.getItem('authToken');
    const { tvShowId } = useParams();
    //gets the shit from the location can't get it from params. Fixes case where there no review and the Reviews for doesn't show up
    const { state } = useLocation();
    const { name } = state;

    //modal stuff from MUI docs 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    //rating states
    const [value, setValue] = useState(NaN);

    useEffect(() => {
        console.log(tvShowId)
        //get the reviews 
        fetchReviews(tvShowId);

    }, [tvShowId, authToken]);

    //get the reviews 
    const fetchReviews = (tvShowId) => {
        if (tvShowId) {
            fetch(`http://localhost:${config.PORT}/tvreviews/${tvShowId}`, {
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
                    console.log(data)
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
        fetch(`http://localhost:${config.PORT}/tvreviews/${tvShowId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                tv_id: tvShowId,
                review: review,
                rating: value,
                reviewer: localStorage.getItem("isReviewer")

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
        fetchReviews(tvShowId);
    }

    //deleting a review
    const handleDeleteReview = () => {
        fetch(`http://localhost:${config.PORT}/tvreviews/${tvShowId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

            .catch(error => {
                console.error('Error:', error);
                alert('Error saving review. Please try again later.');
            });

        fetchReviews(tvShowId);
    }

    //callback for review component
    const deleteReview = () => {
        console.log("callback worked")

        fetch(`http://localhost:${config.PORT}/tvreviews/${tvShowId}/${localStorage.getItem("username")}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(() => {

            fetchReviews(tvShowId);
        })
            .catch(error => {
                console.error('Error:', error);
                alert("Error deleting review. Please try again later.");
            })

        fetchReviews(tvShowId)

    }



    return (
        <div className={reviewStyles.review_background}>

            <h1>
                Reviews for {name}:
            </h1>
            <div className={styles.dashboard_background}>


                {reviews.map((review) => {
                    return <Review username={review.username} review={review.review} isUser={localStorage.getItem("username") === review.username} isReviewer={review.isReviewer} deleteReview={deleteReview} rating={review.rating} ></Review>
                })}
            </div>
            <br />

            {localStorage.getItem("isReviewer") === 1 && (
                <Button onClick={handleDeleteReview}>Delete all Reviews</Button>
            )}
            <Button onClick={handleOpen}>Write a review</Button>
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

                    <Typography component="legend">Give it a Rating</Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />

                    <button className={formStyles.form_button} onClick={() => { handleSubmitReview(); handleClose(); }}>Submit Review</button>



                </div>

            </Modal >




        </div >
    )
}

export default TVShowPage;
