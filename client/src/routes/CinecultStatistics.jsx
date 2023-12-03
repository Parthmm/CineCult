import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { BarChart } from "@mui/x-charts"

import styles from "../styles/Form.module.css"

function CinecultStatistics() {
    const navigate = useNavigate();

    const authToken = localStorage.getItem("authToken")

    const [moviePercentage, setMoviePercentage] = useState("")
    const [tvPercentage, setTVPercentage] = useState("")
    const [tvShowReview, setTvShowReview] = useState([[]])
    const [movieReview, setMovieReview] = useState([[]])
    const [numUsers, setNumUsers] = useState(0)

    useEffect(() => {
        //get user statistics
        fetchMoviePercentages();
        fetchTVPercentages();
        fetchReviewsPerShow();
        fetchReviewsPerMovie();
        fetchNumUsers();


    }, [authToken]);

    const fetchNumUsers = () => {

        fetch(`http://localhost:${config.PORT}/numusers`, {
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
                setNumUsers(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });



    }

    //get the top movie
    const fetchMoviePercentages = () => {

        fetch(`http://localhost:${config.PORT}/percentageMovieReviews`, {
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
                setMoviePercentage(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });



    }

    const fetchTVPercentages = () => {

        fetch(`http://localhost:${config.PORT}/percentageTVReviews`, {
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
                setTVPercentage(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });



    }

    const fetchReviewsPerShow = () => {
        fetch(`http://localhost:${config.PORT}/reviewspershow`, {
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
                setTvShowReview(data)
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }

    const fetchReviewsPerMovie = () => {
        fetch(`http://localhost:${config.PORT}/reviewspermovie`, {
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
                setMovieReview(data)

            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }








    return (
        <div className={styles.form_background}>

            <h1>Cinecult Statistics</h1>

            <h2>Cinecult has <span style={{ color: "red" }}>{numUsers}</span> users</h2>

            <h2>Reviews per Movie/TV Show</h2>

            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: movieReview.map(reviews => reviews[0]).concat(tvShowReview.map(reviews => reviews[0])),
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: movieReview.map(reviews => reviews[1]).concat(tvShowReview.map(reviews => reviews[1])),
                    },
                ]}
                width={1000}
                height={300}
            />


            <h2>Positive vs Negative Movie Reviews</h2>

            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['positive reviews', 'negative reviews'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [parseInt(moviePercentage), 100 - parseInt(moviePercentage)],
                    },
                ]}
                width={500}
                height={300}
            />


            <h2>Positive vs Negative TV Reviews</h2>

            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['positive reviews', 'negative reviews'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [parseInt(tvPercentage), 100 - parseInt(tvPercentage)],
                    },
                ]}
                width={500}
                height={300}
            />

            <button onClick={() => { (navigate("/dashboard-movies")) }}>Back to dashboard</button>

        </div>
    )
}


export default CinecultStatistics;
