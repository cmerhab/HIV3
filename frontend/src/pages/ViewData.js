import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import PastData from "../components/pastdatapage.js";
import Currentcount from "../components/currentcount.js";
import ImageGallery from "../components/imagegallery.js"

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
            <PastData/>
            <Currentcount/>
            <Topbar />
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name: </p1> 
                     <ImageGallery />
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
            </div>
        </div>


    );

};
export default ViewData;