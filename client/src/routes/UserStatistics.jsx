import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/Form.module.css"

function UserStatistics() {
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

            <h1>Here are some cool statistics for you, {name}! </h1>

            <h2>Your favorite movie was  <span style={{ color: "red" }}>{topMovies[0][1]} </span>  you gave it a rating of  <span style={{ color: "red" }}>{topMovies[0][2]} </span></h2>

            <h2>Your favorite tv show was <span style={{ color: "red" }}> {topShows[0][1]} </span>, you gave it a rating of  <span style={{ color: "red" }}></span>{topShows[0][2]}</h2>

            <h2>Here is how many reviews for movies you wrote : <span style={{ color: "red" }}>{numMovieReviews}</span></h2>

            <h2>Here is how many reviews for tv shows you wrote:  <span style={{ color: "red" }}>{numTVReviews}</span></h2>

            <button onClick={() => { (navigate("/dashboard-movies")) }}>Back to dashboard</button>

        </div>
    )
}


export default UserStatistics;
