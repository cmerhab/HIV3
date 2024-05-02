import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeedpage.js"
import { Component } from "react";


//import {useGoogleLogin} from "@react-oauth/google";

class LiveView extends Component {
    constructor(ops) {
        super(ops);
        this.state ={
            //scrollbar
            LED:0,
            //default resolution for HD is 11, skip 2, 4, 15, 16 drop down
            Res:11,
            //range [-2,2], scrollbar
            Brightness:0,
            //clockcycle [5,15],scrollbar
            ClckCycle:7,
        }  
        this.handleSubmit=this.handleSubmit.bind(this); 
      }
    render(){
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
                    <div class="apis">
                        <input ></input>
                    </div>
                </div>
            </div>


        );
    }
};
export default LiveView;