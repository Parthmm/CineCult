import { useEffect, useState } from "react";
import TVShowCard from "../components/TVShowCard";
import config from "../config.json";  // Import the config.json file 
import styles from "../styles/Dashboard.module.css"

function TVDashboard() {

    //state to hold movies and tv shows
    const [dashboardInfo, setDashboardInfo] = useState([])
    const authToken = localStorage.getItem('authToken');

    //everytime we navigate to the webpage
    useEffect(() => {
        fetch(`http://localhost:${config.PORT}/get_tv_dashboard_info`, {
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
                console.log(data);
                setDashboardInfo(data)
            })
            .catch((error) => {
                console.error('Error fetching TV Shows:', error);
            });

    }, []);

    return (
        <div className={styles.dashboard_background}>
            {
                dashboardInfo.map((tvShow) => {
                    return <TVShowCard key={tvShow.tv_id} name={tvShow.tv_name} seasons={tvShow.numberSeasons} episodes={tvShow.numberEpisodes} rating={tvShow.tv_rating} genre={tvShow.genre} language={tvShow.language} id={tvShow.tv_id} />
                })
            }
        </div >
    )
}

export default TVDashboard;
