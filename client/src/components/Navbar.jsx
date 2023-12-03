import { Stack } from "@mui/material";
import "../css/Navbar.css"
import NavbarLink from "./NavbarLink";
import Settings from "./Settings";

function Navbar() {

    return (
        <div className="navbar">
            <Stack width="90%" marginLeft={2} spacing={4} direction="row">
                <NavbarLink text="Movies" link="/dashboard-movies" />
                <NavbarLink text="TV Shows" link="/dashboard-tvshows" />
            </Stack>
            <Settings />
        </div>
    )
}

export default Navbar;
