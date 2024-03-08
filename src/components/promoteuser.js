import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";

const PromoteUser = () => {
    const [banneddata, setBannedData] = useState([]);
    const [bannedselect, setBannedSelect] = useState();
    const [bannedbutton, setBannedButton] = useState(false);

    const fetchBannedEmails = async () => {
        try {
            const response = await fetch('http://localhost:3001/Roles?Role=Banned');
            const [bannedRole] = await response.json();

            if(bannedRole && bannedRole.members)
            {
                const bannedEmails = bannedRole.members.map(member => ({
                    key: member.userid,
                    value: member.aemail,
                }));
                setBannedData(bannedEmails);
            }
        } catch (error) {
            console.error('Failed to fetch ban list', error);
        }
    }

    const handleUnbannedUser = async () => {
        if(!bannedselect)
            return;
        const userId = bannedselect.item.key;
        const userEmail = bannedselect.item.value;

        try {
            //Fetching the Guest Role
            const responseGuest = await fetch('http://localhost:3001/Roles?Role=Guest');
            const [guestRole] = await responseGuest.json();
            const updatedGuestMembers = [...guestRole.members, { "aemail": userEmail, "userid": userId}]; 

             //Adding new Member to Guest Role
             await fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedGuestMembers }),
            });

            //Fetching filtered banned list(without the one moved to banned)
            const responseBanned = await fetch('http://localhost:3001/Roles?Role=Banned');
            const [bannedRole] = await responseBanned.json();
            const filteredBannedMembers = bannedRole.members.filter(member => member.userid !== userId);

            //replacing old banned list with new banned list
            await fetch(`http://localhost:3001/Roles/${bannedRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: filteredBannedMembers }),
            });
            console.log(`${userEmail} Unbanned.`)
        } catch (error) {
            console.error('Failed to unban user', error);
        }

        setBannedButton(false);
    }

    const handleSelect = (record) => {
        console.log(record);
        setBannedSelect(record);
        setBannedButton(true);
    }

    useEffect(() => {
        fetchBannedEmails();
    }, [])

    return(
        <div>
            <br />
            <p>Banned Users</p>
            <ReactSearchBox
                placeholder='Promote User'
                value = "Doe"
                data = {banneddata}
                onSelect={handleSelect}
            />
            {bannedselect && bannedbutton && (
                <div className="promote">
                    <p>Unban {bannedselect.item.value}?</p> 
                    <button onClick={handleUnbannedUser}>Unban User</button>
                    <button onClick={()=>setBannedButton(false)}>No</button>
                </div>
            )}
        </div>
    )
};

export default PromoteUser;