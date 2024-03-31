import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import ".././styles/ManageCamera.css";

//import {useGoogleLogin} from "@react-oauth/google";

const ManageCamera = () => {
/*    const googSignIn=useGoogleLogin({
        onSuccess:(res)=>{
            console.log("res",res);
            alert("Login Successful");
        },
    });*/
    return (
        <div class="ManageCamera">
            <Topbar />
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
            </div>
            <div class="addCam">
                <button class="add">
                    <p1>Add Camera</p1>
                </button>
            </div>
            <div class ="remCam">
                <button class="rem">
                    <p1>Remove Camera</p1>
                </button>
            </div>
            <div class="modCam">
                <button className="mod">
                    <p1>Modify Camera</p1>
                </button>
            </div>
        </div>


    );

};
export default ManageCamera;