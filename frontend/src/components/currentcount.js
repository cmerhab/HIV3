import React, {useEffect,useState}  from "react"; 
import ".././styles/CurrentCount.css";
const Currentcount = () => {
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
        const last = mlresults[mlresults.length - 1]
        content = <p>In: {last.bee_in} Out: {last.bee_out} </p>;
    }

    return (
        <div class ="currentgrouped">
            <div class="currentbox">
                <h1 className="currentp1">{content}</h1>
            </div>
        </div>
    )
}

export default Currentcount