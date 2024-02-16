import React from "react"; 
import ".././styles/Home.css";
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeed.js"
import Pastdata from "../components/pastdata.js"
import CurrentCount from "../components/currentcount.js"
import { Link } from "react-router-dom";
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
            <Livefeed/>
            <CurrentCount />
            <Pastdata />
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
                <div class ="Manage_Camera">
                    <button class="Sidebar_Button">
                    <Link to='/ManageCamera' className="titles">Manage Camera</Link>
                    </button>
                </div>
                <div class ="Modify_Perms">
                    <button class="Sidebar_Button">
                    <Link to='/ModifyPerms' className="titles">Modify Permissions</Link>
                    </button>
                </div>
                <div class ="Live_View">
                    <button class="Sidebar_Button">
                        <Link to='/LiveView' className="titles">LiveView</Link>
                    </button>
                </div>
                <div class ="View_Data">
                    <button class="Sidebar_Button">
                    <Link to='/ViewData' className="titles">View Data</Link>
                    </button>
                </div>
    
            </div>
   

        </div>


    );

};
export default Home;