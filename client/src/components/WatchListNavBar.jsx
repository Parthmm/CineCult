import { Stack } from "@mui/material";
import "../css/Navbar.css"
import NavbarLink from "./NavbarLink";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const goBack = () => {
        // Navigate to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="navbar">
            <Stack width="90%" marginLeft={2} spacing={4} direction="row">
                <NavbarLink text="HOME" link="/dashboard" />
                <NavbarLink text="WATCHLIST" link="/WatchList" />
            </Stack>
            <Box>
                <button onClick={goBack}>HOME</button>
            </Box>
        </div>
    )
}

export default Navbar;