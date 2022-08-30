import React from 'react' //added aug 19th -giuli
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import Quiz from "./Quiz";
import StartMenu from "./GiuliTRYING";
import {Menu} from "@mui/material";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/sign" exact component={SignUp} />
                <Route path="/" element={<StartMenu/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/quiz" element={<Quiz/>}/>

            </Routes>
        </Router>
    );
}

export default App;
