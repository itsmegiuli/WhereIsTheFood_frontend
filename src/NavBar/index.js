import React from "react";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();


    return (
        <nav id="nav" role="navigation" className="primary-navigation">
            <ul>
                <li><a className="menuVisible" href="#">menu</a>
                    <ul className="dropdown">
                        <li><a href="/">home</a></li>
                        <li><a href="/quiz">take the quiz</a></li>
                        <li><a href="/random">get random result</a></li>
                        <li><a href="/sign-in">sign in</a></li>
                        <li><a href="/sign-up">sign up</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;