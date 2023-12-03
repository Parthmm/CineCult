import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieDashboard from "./routes/MovieDashboard";
import TVDashboard from "./routes/TVDashboard";
import MoviePage from "./routes/MoviePage";
import TVShowPage from "./routes/TVShowPage";
import WatchListPage from "./routes/WatchListPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import './styles/App.css'; // Import your global styles
import PasswordChangeForm from "./components/PasswordChangeForm";
import ReviewerRegister from "./routes/ReviewerRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Login reviewer={false} /></>
  },
  {
    path: "reviewer-login/",
    element: <><Login reviewer={true} /></>
  },
  {
    path: "/register",
    element: <><Register /></>
  },
  {
    path: "/reviewer-register",
    element: <><ReviewerRegister /></>
  },
  {
    path: "/dashboard-movies",
    element: <><Navbar /><MovieDashboard /></>
  },
  {
    path: "/dashboard-tvshows",
    element: <><Navbar /><TVDashboard /></>
  },
  {
    path: "changePassword",
    element: <><PasswordChangeForm /></>
  },
  {
    path: "/movie/:movieId",
    element: <><Navbar /><MoviePage /></>
  },
  {
    path: "/tvshow/:tvShowId",
    element: <><Navbar /><TVShowPage /></>
  },
  {
    path: "/watchList",
    element: <><Navbar /><WatchListPage /></>
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;