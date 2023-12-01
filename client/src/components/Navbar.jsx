import { Stack } from "@mui/material";
import "../css/Navbar.css"
import NavbarLink from "./NavbarLink";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username')
        // Navigate to the login page or any other appropriate page
        navigate("/");
    };

    return (
        <div className="navbar">
            <Stack width="90%" marginLeft={2} spacing={4} direction="row">
                <NavbarLink text="Movies" link="/dashboard-movies" />
                <NavbarLink text="TV Shows" link="/dashboard-tvshows" />
                <NavbarLink text="Watchlist" link="/watchList" />
            </Stack>
            <Box>
                <button onClick={logout}>LOG OUT</button>
            </Box>
        </div>
    )
}

export default Navbar;
