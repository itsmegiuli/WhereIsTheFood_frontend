import React from "react";
import {Box, Card, Container, Typography} from "@mui/material";

const About = () => {
    // if token is not set, redirect to sign-in
   // if (!localStorage.getItem("token")) {
     //   return <Navigate to="/sign-in" replace />;
   // }

    return (
        <Container >
            <Card sx={{display: "flex", margin: "2"}}>
                <Typography sx={{padding: 3}}>
                    <p>Hungry? But don´t know for what? But don´t know for what?</p>
                    <p><b>WTF</b> aka <i>Where´s the food </i>can and will help you with that. We provide the answer to your question. </p>
                    <p>Simply take our food quiz (...like buzzfeed but you actually get something out o fit...) and we will tell you
                    what you want (what you really, really want). <b>Sounds good, right?</b></p>
                    <p>We respect your time! That´s why our quiz is kept short and sweet (or savoury). In addition, we´ll
                    provide you with restaurant recommendations as well so you don´t have to look for places to eat
                    yourself.</p>
                    <p>Did you enjoy your recommendation? Then save it in your favourites and come back for more when you feel like it. </p>
                    <p>Only one thing left to say: <b>Bon Appétit!</b></p>
                </Typography>

            </Card>
        </Container>
    )
}

export default About;