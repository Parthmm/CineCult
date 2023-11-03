import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";

function Dashboard() {

    //state to hold movies and shit? 
    const [dashboardInfo, setDashboardInfo] = useState([])

    //everytime we navigate to the webpage
    useEffect(() => {
        fetch("http://localhost:3000/get_dashboard_info")
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
                console.error('Error fetching movies:', error);
            });





    }, []);

    return (
        <div>
            {dashboardInfo.map((movie) => {
                return <MovieCard key={movie.movie_id} name={movie.movie_name} rating={movie.movie_rating} genre={movie.genre} language={movie.language} />
            })}
            <MovieCard />

            <TVShowCard />
        </div >
    )
}

export default Dashboard;