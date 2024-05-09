import React, {useEffect,useState}  from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Currentcount from "../components/currentcount.js";
import ".././styles/pastdatapage.css";
import ImageGallery from"../components/imagegallery.js"
import PieChart from "../components/piechart.js";
//import {useGoogleLogin} from "@react-oauth/google";

const ViewData = () => {
    const [mlresults, setMlResults] = useState([]);

    const MLResults = async () => {
        fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/ml_info')
            .then(response => response.json())
            .then(data => setMlResults(data))
            .then(error => console.error('Error Fetching Data:', error));
        }
    useEffect(() => {
        MLResults()
    }, [])

    let content;

    if(mlresults === null) {
        content = <p>Loading...</p>;
    }
    else if(mlresults.length === 0)
    {
        content = <p>No data avaliable.</p>;
    }
    else
    {
        const last = mlresults[mlresults.length - 1]
        content = <PieChart beeIn={last.bee_in} beeOut={last.bee_out} />;
    }
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
                        {content}
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