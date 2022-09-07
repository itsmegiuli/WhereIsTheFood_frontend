import React from "react";
import {Link} from "@mui/material";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';


const CustomButton = styled(ButtonUnstyled)`
  font-size: 1.5rem;
  background-color: white;
  padding: 0.5em;
  width: 30em;
  border-radius: 30em;
  color: black;
  transition: all 150ms ease;
  border: none;
  display: inline-block;
  text-decoration: none;
  
 
  &:hover {
    background-color: #f5c20f;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
  }

  &.${buttonUnstyledClasses.active} {
    text-decoration: none;
    background-color: #f5c20f;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    text-decoration: none;
    box-shadow: 0 4px 20px 5px #f5c20f;
    outline: none;
  }`;

const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload(true);
};

const StartMenu = () => {
    return (
            <Stack container spacing={2} direction={"column"} align={"center"} padding={5} marginTop={2} >
                <Link href={'/quiz'}><CustomButton className="startMenu">take the quiz</CustomButton></Link>
                <Link href={'/random'}><CustomButton className="startMenu">get random result</CustomButton></Link>
                <Link href={'/about-us'}><CustomButton className="startMenu">about us</CustomButton></Link>

                {/* "different" menus depending if you're signed in or not */}

                {/*if signed in (token), see your favorites and log out visible*/}
                {sessionStorage.getItem("token") && <Link href={'/favorites'}><CustomButton className="startMenu">see your favorites</CustomButton></Link>}
                {sessionStorage.getItem("token") && <Link><CustomButton onClick={logout} className="startMenu">log out</CustomButton></Link>}


                {/* if NOT signed in (!token), sign in /up option */}
                {!sessionStorage.getItem("token") && <Link href={'/sign-in'}><CustomButton className="startMenu">sign in</CustomButton></Link>}
                {!sessionStorage.getItem("token") && <Link href={'/sign-up'}><CustomButton className="startMenu">sign up</CustomButton></Link>}

            </Stack>
    );
}

export default StartMenu;
