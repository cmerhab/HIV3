import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeedpage.js"

//import {useGoogleLogin} from "@react-oauth/google";

const LiveView = () => {
/*    const googSignIn=useGoogleLogin({
        onSuccess:(res)=>{
            console.log("res",res);
            alert("Login Successful");
        },
    });*/
    return (
        <div class="liveview">
            <Topbar />
            <Livefeed/>
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
            </div>
        </div>


    );

};
export default LiveView;