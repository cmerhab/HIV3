import React from "react"; 
import Topbar from "../components/topbar.js"
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
            <div class="contain">
            <div class="addCam">
                <button class="add">
                        <p1>Add Camera</p1>
                </button>
            </div>
            <div class="space-btwn">
            </div>
            <div class ="remCam">
                <button class="rem">
                    <p1>Remove Camera</p1>
                </button>
            </div>
            </div>
        </div>


    );

};
export default ManageCamera;