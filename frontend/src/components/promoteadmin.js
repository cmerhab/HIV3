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

    const handleGuestUser = async () => {
        if(!guestselect)
            return;
        const userId = guestselect.item.key;
        const userEmail = guestselect.item.value;

        try {
            //Fetching the Admin Role
            const responseAdmin = await fetch('http://localhost:3001/Roles?Role=Admin');
            const [adminRole] = await responseAdmin.json();
            const updatedAdminMembers = [...adminRole.members, { "aemail": userEmail, "userid": userId}]; 

             //Adding new Member to Admin Role
             await fetch(`http://localhost:3001/Roles/${adminRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedAdminMembers }),
            });

            //Fetching filtered guest list(without the one moved to guest)
            const responseGuest = await fetch('http://localhost:3001/Roles?Role=Guest');
            const [guestRole] = await responseGuest.json();
            const filteredGuestMembers = guestRole.members.filter(member => member.userid !== userId);

            //replacing old guest list with new guest list
            await fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: filteredGuestMembers }),
            });
            console.log(`${userEmail} Promoted.`)
        } catch (error) {
            console.error('Failed to promote user', error);
        }

        setGuestButton(false);
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
                <div>
                <div>
                    <p>Guest to Admin</p>
                    <button onClick={handleGuestUser}>Promote User</button>
                    <button onClick={()=>setGuestButton(false)}>No</button>
                </div>   

             </div>
            )}
        </div>
    )
}

export default PromoteAdmin;