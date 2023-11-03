import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./routes/Dashboard";
import MoviePage from "./routes/MoviePage";
import TVShowPage from "./routes/TVShowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Dashboard/></>
  },
  {
    path: "/movie",
    element: <><Navbar/><MoviePage/></>
  },
  {
    path: "/tv-show",
    element: <><Navbar/><TVShowPage/></>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;

// function App() {
//   const getMovies = () => {
//     fetch("config.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch config.json");
//         }
//         return response.json();
//       })
//       .then((config) => {
//         const PORT = config.PORT;
//         return fetch("http://localhost:" + PORT + "/get_movies");
//       })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("API Response:", data);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//       });
//   };

//   return (
//     <div className="App">
//       <button onClick={getMovies}>Get Movies</button>
//     </div>
//   );
// }

// export default App;
