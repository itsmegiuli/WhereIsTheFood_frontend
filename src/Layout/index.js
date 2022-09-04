import React from "react";
import {Box, Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import NavBar from "../NavBar";

const hideNavBarLocations = ["/sign-in", "/sign-up", "/"];

const Layout = () => {
    const location = window.location.pathname;

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <img src="/wtf_small_blackbackground.png" alt="Logo of Where's the food" id="logo"/>
                {!hideNavBarLocations.includes(location) && <NavBar />}
            </Box>
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
}

export default Layout;