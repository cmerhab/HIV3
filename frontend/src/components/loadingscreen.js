import React, {useState, useEffect} from 'react';
import Logo from ".././media/Hive Logo.png"
import BounceLoader from "react-spinners/BounceLoader"
import "../styles/Loading.css";

function Loading() {
    const [text, setText] = useState("");

    useEffect(() => {
        let load_message = new Array();
        load_message[0] = "Should only BEE a second";
        load_message[1] =  "Bees are flying to fetch your request";
        load_message[2] = "Hiving together the best experience";
        load_message[3] = "Everything is going to BEE alright";
        load_message[4] = "BEElieve us, it's worth the wait";
        load_message[5] = "Building the hive, one byte at a time";

        var i = Math.floor(load_message.length * Math.random());
        setText(load_message[i])
    }, [])
    return (
        <div className="container-loader">
            <img src={Logo} className="center" alt="Hive Logo" />
            <div className="loader">
                <h1>{text}</h1>
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