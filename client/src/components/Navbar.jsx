import { Stack } from "@mui/material";
import "../css/Navbar.css"
import NavbarLink from "./NavbarLink";
import { Box } from "@mui/material";
function Navbar() {
    return (
        <div className="navbar">
            <Stack width="90%" marginLeft={2} spacing={4} direction="row">
                <NavbarLink text="HOME" link="/dashboard" />
            </Stack>
            <Box >
                <NavbarLink text="LOG OUT" link="/" />
            </Box>
        </div>
    )
}

export default Navbar;