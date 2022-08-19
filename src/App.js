import React from 'react' //added aug 19th -giuli
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}

export default App
