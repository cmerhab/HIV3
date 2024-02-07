import React from "react"; 
import Home from ".././media/homebutton.png"
import Logo from ".././media/Hive Logo.png"
import Pfp from ".././media/user-pfp.png"
import ".././styles/Topbar.css";
import { Navigate } from "react-router-dom";
const Topbar = () => {
    return (
    <div>
    <div class = "topbar-container">
                <button class ="HomeButtonclick">
                    <img src={Home} className="homebutton" alt="homebutton" />
                </button>
                <img src={Logo} className="center" alt="Hive Logo" />
                <img src={Pfp} className="right" alt ="pfp" />
    </div>
    <div class="bar"></div>
    </div>
    );
};

export default Topbar;