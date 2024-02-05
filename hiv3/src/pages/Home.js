import React from "react"; 
import homebutton from ".././media/homebutton.png";
import logo from ".././media/Hive Logo.png";
import pfp from ".././media/user-pfp.png";
import ".././pages/Home.css";
//import {useGoogleLogin} from "@react-oauth/google";

const Home = () => {
/*    const googSignIn=useGoogleLogin({
        onSuccess:(res)=>{
            console.log("res",res);
            alert("Login Successful");
        },
    });*/
    return (
        <div class="homepage">
            <div class = "topbar-container">
                <img src={homebutton} className="homebutton" alt="homebutton" />
                <img src={logo} className="center" alt="Hive Logo" />
                <img src={pfp} className="right" alt ="pfp" />
            </div>
            <div class="bar"></div>
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name:</p1>
                    <p1>Local Time:</p1>
                    <p1>Local Temperature:</p1>
                </div>
            </div>
        </div>


    );

};
export default Home;