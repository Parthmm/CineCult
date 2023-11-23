import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./routes/Dashboard";
import MoviePage from "./routes/MoviePage";
import TVShowPage from "./routes/TVShowPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import './styles/App.css'; // Import your global styles

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Login /></>
  },
  {
    path: "/register",
    element: <><Register /></>
  },
  {
    path: "/dashboard",
    element: <><Navbar /><Dashboard /></>
  },
  {
    path: "/movie/:movieId",
    element: <><Navbar /><MoviePage /></>
  },
  {
    path: "/tv-show",
    element: <><Navbar /><TVShowPage /></>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;