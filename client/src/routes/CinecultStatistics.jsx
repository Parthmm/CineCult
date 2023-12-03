import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/Form.module.css"

function CinecultStatistics() {
    const navigate = useNavigate();

    const name = localStorage.getItem("username")
    const authToken = localStorage.getItem('authToken');

    const [topMovies, setTopMovies] = useState([[]])
    const [topShows, setTopShows] = useState([[]])
    const [numMovieReviews, setMovieReviews] = useState(0)
    const [numTVReviews, setTVReviews] = useState(0)

    useEffect(() => {
        //get user statistics
        fetchTopMovie();
        fetchTopShow();
        fetchNumReviews();
        fetchTVNumReviews();


    }, [authToken]);

    //get the top movie
    const fetchTopMovie = () => {

        fetch(`http://localhost:${config.PORT}/userstatisticsmovie/${localStorage.getItem("username")}`, {
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
                console.log(data)
                setTopMovies(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });



    }

    //get the top tv show
    const fetchTopShow = () => {

        fetch(`http://localhost:${config.PORT}/userstatisticsshow/${localStorage.getItem("username")}`, {
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
                console.log(data)
                setTopShows(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });

    }

    const fetchNumReviews = () => {
        fetch(`http://localhost:${config.PORT}/userstatisticsnum/${localStorage.getItem("username")}`, {
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
                console.log(data)
                setMovieReviews(data)

            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });

    }

    const fetchTVNumReviews = () => {
        fetch(`http://localhost:${config.PORT}/userstatisticsnumshows/${localStorage.getItem("username")}`, {
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
                console.log(data)
                setTVReviews(data)

            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });

    }




    return (
        <div className={styles.form_background}>

            <h1>Cinecult Statistics</h1>

            <h2>Cinecult has x amount of users</h2>

            <h2>The percentage of postive movie reviews is</h2>

            <h2>The percentage of negative movie reviews is</h2>

            <h2>The percentage of postive tv reviews is</h2>

            <h2>The percentage of negative tv reviews is</h2>

            <h2>The movie with the most reviews is</h2>

            <h2>The tv show with the most reviews is</h2>

            <button onClick={() => { (navigate("/dashboard-movies")) }}>Back to dashboard</button>

        </div>
    )
}


export default CinecultStatistics;
