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

    useEffect(() => {
        //get user statistics
        fetchMoviePercentages();
        fetchTVPercentages();


    }, [authToken]);

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








    return (
        <div className={styles.form_background}>

            <h1>Cinecult Statistics</h1>

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


            <h2>The movie with the most reviews is</h2>

            <h2>The tv show with the most reviews is</h2>

            <button onClick={() => { (navigate("/dashboard-movies")) }}>Back to dashboard</button>

        </div>
    )
}


export default CinecultStatistics;
