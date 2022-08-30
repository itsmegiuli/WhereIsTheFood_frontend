import React from "react";
//import {Navigate} from "react-router-dom";
import {Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from "@mui/material";

const Quiz = () => {
    // if token is not set, redirect to sign-in
   // if (!localStorage.getItem("token")) {
     //   return <Navigate to="/sign-in" replace />;
 //   }

    return (
        <div>
            <Typography>This the QUIZ page</Typography>
        </div>
    );
}

export default Quiz;