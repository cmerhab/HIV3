import React, {useState, useEffect} from 'react'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";

const PromoteAdmin = () => {
    const [guestdata, setGuestData] = useState([]);
    const [guestselect, setGuestSelect] = useState();
    const [guestbutton, setGuestButton] = useState(false);


    const fetchGuestEmails = async () => {
        try {
            const response = await fetch('http://localhost:3001/Roles?Role=Guest');
            const [guestRole] = await response.json();

            if(guestRole && guestRole.members)
            {
                const guestEmails = guestRole.members.map(member => ({
                    key: member.userid,
                    value: member.aemail,
                }));
                setGuestData(guestEmails);
            }
        } catch (error) {
            console.error('Failed to fetch guess list', error);
        }
    }

    const handleSelect = (record) => {
        console.log(record);
        setGuestSelect(record);
        setGuestButton(true);
    }

    useEffect(()=> {
        fetchGuestEmails();
    }, [])
    return (
        <div>
            <br />
            <p>Guest Users</p>
            <ReactSearchBox
                placeholder='Promote User'
                value = "Doe"
                data = {guestdata}
                onSelect ={handleSelect}
            />
             {guestselect && guestbutton && (
                <div className="promote">
                    <p>Promote {guestselect.item.value}?</p> 
                    <button>Promote User</button>
                    <button onClick={()=>setGuestButton(false)}>No</button>
                </div>
            )}
        </div>
    )
}

export default PromoteAdmin;