import React, {useEffect,useState}  from "react";  
import ".././styles/PastData.css";
/*import { oldData } data, once we have the data*/
const PastData = () => {
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
        const recentResults = mlresults.slice(-20).reverse();
        content = (
            <ul>
                {recentResults.map((result, index) => (
                    <li key={index}>
                        Bee Count: {result.bee_in - result.bee_out}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className ="pastgrouped">
            <h1 className="pasttitle">Past Data</h1>
            <div className="pastbox">
                {content}
            </div>
        </div>
    )
}

export default PastData