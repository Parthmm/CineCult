import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavbarLink(props) {
    const {text, link} = props;
    return (
        <Link className="navbar-element" to={link}>
            {text}
        </Link>
    );
}

export default NavbarLink;