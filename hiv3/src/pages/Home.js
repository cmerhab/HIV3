import React from "react"; 
import homebutton from ".././media/homebutton.png";
import logo from ".././media/Hive Logo.png";
import pfp from ".././media/user-pfp.png";
import ".././pages/Home.css";
import Topbar from "../components/topbar.js"
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
            <Topbar />
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