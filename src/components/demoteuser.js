import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";
import roles from '../context/roles.json'
import DemoteAdmin from '../components/demoteadmin';
const DemoteUser = () => {
    const [guestdata, setGuestData] = useState([]);
    const [guestselect, setGuestSelect] = useState();
    const [guestbutton, setGuestbutton] = useState(false);

    const {user} = UserAuth();
    const current_user = user.email;
    const ownerRole = roles.Roles.find(role => role.Role === "Owner"); //Have to find the owner role
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user); //Once owner role is found, find members in role
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
            console.error('Failed to fetch guest list', error);
        }
    };

    const handleSelect = (record) => {
        console.log(record);
        setGuestSelect(record);
        setGuestbutton(true);
    }

    const handleBanUser = async () => {
        if(!guestselect)
            return;
        const userId = guestselect.item.key;
        const userEmail = guestselect.item.value;

        try {
            //Fetching the Banned Role
            const responseBanned = await fetch('http://localhost:3001/Roles?Role=Banned');
            const [bannedRole] = await responseBanned.json();
            const updatedBannedMembers = [...bannedRole.members, { "aemail": userEmail, "userid": userId}]; 
            
            //Adding new Member to Banned Role
            await fetch(`http://localhost:3001/Roles/${bannedRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedBannedMembers }),
            });

            //Fetching filtered guest list(without the one moved to banned)
            const responseGuest = await fetch('http://localhost:3001/Roles?Role=Guest');
            const [guestRole] = await responseGuest.json();
            const filteredGuestMembers = guestRole.members.filter(member => member.userid !== userId);

            await fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: filteredGuestMembers }),
            });
            console.log(`${userEmail} Banned.`)
        } catch (error)
        {
            console.error('Failed to ban user', error);
        }
        setGuestbutton(false);
    }
    useEffect(() => {
        fetchGuestEmails();
    }, [])

   
    return(
        <div>
            <br />
            <p>Guest Users</p>
            <ReactSearchBox
                placeholder='Demote User'
                value = "Doe"
                data = {guestdata}
                onSelect={handleSelect}

            />
            {guestselect && guestbutton && (
                <div className="demote">
                    <p>Ban {guestselect.item.value}?</p> 
                    <button onClick={handleBanUser}>Ban User</button>
                    <button onClick={()=>setGuestbutton(false)}>No</button>
                </div>
            )}
            {ownerEmailExists && (
                  <DemoteAdmin />
            )}         
        </div>
    )
};

export default DemoteUser;