import React from 'react';
import Logo from ".././media/Hive Logo.png"
import BounceLoader from "react-spinners/BounceLoader"
//import "../styles/Loading.css";

function Loading() {
    return (
        <div className="container-loader">
            <img src={Logo} className="center" alt="Hive Logo" />
            <div className="loader">
                <h1>Should only BEE a second</h1>
                <div className="animation-loader">
                    <BounceLoader 
                        size={50}
                        color="orange"
                    />
                    <BounceLoader 
                        size={50}
                        color="orange"
                    />
                    <BounceLoader 
                        size={50}
                        color="orange"
                    />
                    <BounceLoader 
                        size={50}
                        color="orange"
                    />
                    <BounceLoader 
                        size={50}
                        color="orange"
                    />
                </div>
            </div>
        </div>
    );
}
export default Loading;