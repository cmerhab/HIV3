import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Currentcount from "../components/currentcount.js";
import ".././styles/pastdatapage.css";
import ImageGallery from"../components/imagegallery.js"
//import {useGoogleLogin} from "@react-oauth/google";

const ViewData = () => {
/*    const googSignIn=useGoogleLogin({
        onSuccess:(res)=>{
            console.log("res",res);
            alert("Login Successful");
        },
    });*/
    return (
        <div class="ViewData">
            <Topbar />
            <div class="items">
                <div class="left-box">
                    <div class="camera-info">
                        <p1>Camera Name: </p1> 
                        <Clocktime />
                    </div>
                </div>
                <div class="image-container">
                    <ImageGallery/>
                </div>
                <div class = "data-container">
                    <div class="past-contain">
                        <h1> Past Container</h1>
                    </div>
                    <div class="count-contain">
                        <Currentcount/>
                    </div>
                </div>
            </div>
        </div>


    );

};
export default ViewData;