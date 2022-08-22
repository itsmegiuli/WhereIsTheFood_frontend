import React from "react";

import {Navigate} from "react-router-dom";

const Home = () => {
    // if token is not set, redirect to sign-in
   // if (!localStorage.getItem("token")) {
     //   return <Navigate to="/sign-in" replace />;
   // }

    return <Navigate to="/Quiz" replace />;
}

export default Home;