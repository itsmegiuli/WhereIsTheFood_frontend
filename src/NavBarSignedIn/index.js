import React from "react";
import {useNavigate} from "react-router-dom";

const WhenSignedIn = () => {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/sign-in");
        window.location.reload(true);
    };

    return (
    <nav id="nav" role="navigation" className="navBar">
        <ul>
            <li><a className="menuVisible" href="#">menu</a>
                <ul className="dropdown">
                    <li><a href="/">home</a></li>
                    <li><a href="/quiz">take the quiz</a></li>
                    <li><a href="/random">get random result</a></li>
                    <li><a href="/favorites">see your favorites</a></li>
                    <li><a href="/about-us">about us</a></li>
                    <li><a onClick={logout}>sign out</a></li>

                </ul>
            </li>
        </ul>
    </nav>

    );
};

export default WhenSignedIn;