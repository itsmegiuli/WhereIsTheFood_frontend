import React from 'react'
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./AboutUs";
import Quiz from "./Quiz";
import StartMenu from "./StartMenu";
import Layout from "./Layout";
import Results from "./Results";
import Favorites from "./Favorites";
import Random from "./Random";
import About from "./AboutUs";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<StartMenu/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/quiz" element={<Quiz/>}/>
                    <Route path="/results" element={<Results/>}/>
                    <Route path="/random" element={<Random/>}/>
                    <Route path="/favorites" element={<Favorites />}/>
                    <Route path="/about-us" element={<About />}/>

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
