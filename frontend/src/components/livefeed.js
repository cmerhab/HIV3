import React from "react"; 
import ".././styles/Livefeed.css";
import ImageGallery from './imagegallery'
const LiveFeed = () => {

    return (
        <div className ="grouped">
            <h1 className="title">Live Feed</h1>
                <ImageGallery />
            <div className="box">
            </div>
        </div>
    )
}

export default LiveFeed