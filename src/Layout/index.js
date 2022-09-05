import React from "react";
import {Box, Container} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import NavBar from "../NavBar";
import WhenSignedIn from "../NavBarSignedIn";

const hideNavBarLocations = ["/"];

const Layout = () => {
    const location = window.location.pathname;

    return (
        <Container>
            <Box className="header" >
                <a href="/"><img src="/logo.png" alt="Logo of Where's the food" id="logo"/></a>
                {sessionStorage.getItem("token") && !hideNavBarLocations.includes(location) && <WhenSignedIn/>}
                {!sessionStorage.getItem("token") && !hideNavBarLocations.includes(location) &&  <NavBar />}

            </Box>
            <Box sx={{textAlign: "flex", justifyContent: "space-between"}}>

            </Box>
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
}

export default Layout;