import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import config from "../config.json";
import Modal from '@mui/material/Modal';

// Styling
import styles from "../styles/Dashboard.module.css";

function WatchListPage() {
    const [watchlist, setWatchlist] = useState([]);
    const [review, setReview] = useState('');
    const authToken = localStorage.getItem('authToken');
    const { user_id } = useParams();
    const { state } = useLocation();
    const  name  = state && state.name ? state.name : '';
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchWatchlist();
        
    }, [user_id, authToken]);

    const fetchWatchlist = (user_id) => {
        fetch(`http://localhost:${config.PORT}/get_watchlist?user_id=${localStorage.getItem("user_id")}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network error");
                }
                return response.json();
            })
            .then(data => {
                setWatchlist(data);
            })
            .catch(error => {
                console.error('Error fetching watchlist:', error);
            });
    };

    const addToWatchlist = (contentId, contentType) => {
        fetch(`http://localhost:${config.PORT}/add_to_watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                content_id: contentId,
                content_type: contentType,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchWatchlist();
            })
            .catch(error => {
                console.error('Error adding to watchlist:', error);
            });
    };
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

    const removeFromWatchlist = (watchlistItemId) => {
        fetch(`http://localhost:${config.PORT}/remove_from_watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                watchlist_item_id: watchlistItemId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                fetchWatchlist();
            })
            .catch(error => {
                console.error('Error removing from watchlist:', error);
            });
    };

    // Placeholder function for handling review submission
    const handleSubmitReview = () => {
        // Add your review submission logic here
    };

    return (
        <div>
            <h1>Watchlist for {name}</h1>

            {/* Render watchlist items */}
            {watchlist.map(item => (
                <div key={item.watchlist_item_id}>
                    <p>{item.title}</p>
                    <p>{item.content_type}</p>
                    {/* Add more details as needed */}
                    <button onClick={() => removeFromWatchlist(item.watchlist_item_id)}>
                        Remove from Watchlist
                    </button>
                </div>
            ))}

            {/* Modal for writing a review */}
            <Modal open={open} onClose={handleClose}>
                <div>
                    <h2>Details</h2>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                        rows="5"
                        cols="50"
                    />
                    <button onClick={() => { handleSubmitReview(); handleClose(); }}>
                        Submit Review
                    </button>
                </div>
            </Modal>

            {/* Button to add to watchlist */}
            <button onClick={() => addToWatchlist("movieId", 'movie')}>Add to Watchlist</button>
            <button onClick={() => addToWatchlist("tvShowId", 'tv_show')}>Add to Watchlist (TV Show)</button>
        </div>
    );
}

export default WatchListPage;
