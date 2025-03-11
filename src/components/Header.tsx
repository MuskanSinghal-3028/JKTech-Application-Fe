import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserName } from "../helper";
import { logout } from "../axiosApis/Apis";

const Header: React.FC = () => {
    const user=getUserName();
  const handleLogout = async() => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };
  return (
    <AppBar 
      position="fixed"
      sx={{ 
        background: "linear-gradient(to right,rgb(128, 139, 151), #00c6ff)",  
        zIndex: 1100  
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/dashboard" sx={{ textDecoration: "none", color: "#fff" }}>
          Dashboard
        </Typography>
        <div>
          {user?.email!=''&&<Typography variant="body1" sx={{ display: "inline", marginRight: 2, color: "#fff" }}>
          { user?.name}
          </Typography>}
          {user?.email!='' &&<Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
