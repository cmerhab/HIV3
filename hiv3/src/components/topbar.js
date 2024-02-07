import React from "react"; 
import Home from ".././media/homebutton.png"
import Logo from ".././media/Hive Logo.png"
import Pfp from ".././media/user-pfp.png"
import ".././styles/Topbar.css";
const Topbar = () => {
    return (
    <div>
    <div class = "topbar-container">
                <img src={Home} className="homebutton" alt="homebutton" />
                <img src={Logo} className="center" alt="Hive Logo" />
                <img src={Pfp} className="right" alt ="pfp" />
    </div>
    <div class="bar"></div>
    </div>
    );
};

export default Topbar;