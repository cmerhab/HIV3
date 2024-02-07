import React from "react"; 
import homebutton from ".././media/homebutton.png";
import logo from ".././media/Hive Logo.png";
import pfp from ".././media/user-pfp.png";
import ".././styles/Home.css";
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
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
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
                <div class ="Manage_Camera">
                    <p1>Manage Cameras</p1>
                </div>
                <div class ="Modify_Perms">
                    <p1>Modify Permissions</p1>
                </div>
                <div class ="Live_View">
                    <p1>Live View</p1>
                </div>
                <div class ="View_Data">
                    <p1>View Data</p1>
                </div>
            </div>

            </div>


    );

};
export default Home;