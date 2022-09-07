import React from "react";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
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
                        <li><a href="/about-us">about us</a></li>

                        {/* show "Sign In" and "Sign Up" options when NOT signed in */}
                        {!sessionStorage.getItem("token") && <li><a href="/sign-in">sign in</a></li> }
                        {!sessionStorage.getItem("token") &&<li><a href="/sign-up">sign up</a></li> }

                        {/* show "See favorites" and "Sign out" options when signed in */}
                        {sessionStorage.getItem("token") && <li><a href="/favorites">see your favorites</a></li>}
                        {sessionStorage.getItem("token") && <li><a onClick={logout}>sign out</a></li> }
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;