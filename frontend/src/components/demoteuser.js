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

    /*This will need to be replaced with functon I have in home.js*/
    const {user} = UserAuth();
    const current_user = user.email;
    const ownerRole = roles.Roles.find(role => role.Role === "Owner"); //Have to find the owner role
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user); //Once owner role is found, find members in role
    
    const fetchGuestEmails = async () => {
        try {
            const response = await fetch('http://localhost:4000/fetchrole?roleName=Guest');
            const [guestRole] = await response.json();

            if(guestRole)
            {
                const guestEmails = guestRole.Roles.map(member => ({
                    key: member.Userid,
                    value: member.Emails, //double check if this is fine with multiple in a list
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
       const userIdobject = guestselect.item.key;
        const Emailobject = guestselect.item.value;

        const userEmail = Emailobject[0];
        const userId = userIdobject[0];
        

        try {
            const response = await fetch('http://localhost:4000/banuser', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userEmail }),
            });

            const data = await response.json();
            console.log(data.message);

        } catch (error) {
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


/*    try {
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
        }*/