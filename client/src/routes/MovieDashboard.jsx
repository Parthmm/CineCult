import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import config from "../config.json";  // Import the config.json file 
import styles from "../styles/Dashboard.module.css"

function MovieDashboard() {

    //state to hold movies and tv shows
    const [dashboardInfo, setDashboardInfo] = useState([])
    const authToken = localStorage.getItem('authToken');

    //everytime we navigate to the webpage
    useEffect(() => {
        fetch(`http://localhost:${config.PORT}/get_movie_dashboard_info`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })  // Use the port from config
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network broken yeet")
                }
                return response.json();
            })
            .then((data) => {
                setDashboardInfo(data)
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });

    }, []);

    return (
        <div className={styles.dashboard_background}>
            {
                dashboardInfo.map((movie) => {
                    return <MovieCard key={movie.movie_id} name={movie.movie_name} rating={movie.movie_rating} genre={movie.genre} language={movie.language} id={movie.movie_id} poster={movie.poster} />
                })
            }
        </div >
    )
}

export default MovieDashboard;
