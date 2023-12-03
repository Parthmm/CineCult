import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isReviewer');
    // Navigate to the login page or any other appropriate page
    navigate("/");
  };

  const changePassword = () => {
    navigate("/changePassword");
  }

  const viewStatistics = () => {
    navigate(`/userStatistics/${localStorage.getItem("username")} `);
  }

  const viewCinecultStatistics = () => {
    navigate(`/cinecultStatistics/${localStorage.getItem("username")} `);
  }

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        SETTINGS
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={changePassword}>Change Password</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={viewStatistics}>View User Statistics</MenuItem>

        {localStorage.getItem("isReviewer") == 1 && (
          <MenuItem onClick={viewCinecultStatistics}>View Cinecult Statistics</MenuItem>
        )}

      </Menu>
    </div>
  );
}

export default Settings;