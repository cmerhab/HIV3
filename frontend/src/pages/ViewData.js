import React, {useEffect,useState}  from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Currentcount from "../components/currentcount.js";
import ".././styles/pastdatapage.css";
import ImageGallery from"../components/imagegallery.js"
//import {useGoogleLogin} from "@react-oauth/google";

const ViewData = () => {
    const [mlresults, setMlResults] = useState([]);

    const MLResults = async () => {
        fetch('http://localhost:4000/ml_info')
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
        const recentResults = mlresults.slice(-10).reverse();
        content = (
            <ul>
                {recentResults.map((result, index) => (
                    <li key={index}>
                        Bee In: {result.bee_in} Bee Out: {result.bee_out}
                    </li>
                ))}
            </ul>
        );
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