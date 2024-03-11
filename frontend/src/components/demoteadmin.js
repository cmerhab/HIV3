import React, {useState, useEffect} from 'react'
import roles from '../context/roles.json'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";
const DemoteAdmin = () => {
    const [admindata, setAdminData] = useState([]);
    const [adminbutton, setAdminButton] = useState(false);
    const [adminselect, setAdminSelect] = useState();

    const fetchAdminEmails = async () => {
        try {
            const response = await fetch('http://localhost:3001/Roles?Role=Admin');
            const [adminRole] = await response.json();

            if(adminRole && adminRole.members)
            {
                const adminEmails = adminRole.members.map(member => ({
                    key: member.userid,
                    value: member.aemail,
                }));
                setAdminData(adminEmails);
            }
        } catch (error) {
            console.error('Failed to fetch admin list', error);
        }
    };

    const handleSelect = (record) => {
        console.log(record);
        setAdminSelect(record);
        setAdminButton(true);
    }

    const handleAdminUser = async (flag) => {
        if(!adminselect)
            return;
        const userId = adminselect.item.key;
        const userEmail = adminselect.item.value;
        try {
            if(flag==1)
            {
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
            }
            else if(flag == 0 )
            {
                const responseGuest = await fetch('http://localhost:3001/Roles?Role=Guest');
                const [guestRole] = await responseGuest.json();
                const updatedGuestMembers = [...guestRole.members, { "aemail": userEmail, "userid": userId}]; 
            
                //Adding new Member to Guest Role
                await fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedGuestMembers }),
                });
            }
            //Fetching filtered admin list(without the one moved to banned)
            const responseAdmin = await fetch('http://localhost:3001/Roles?Role=Admin');
            const [adminRole] = await responseAdmin.json();
            const filteredAdminMembers = adminRole.members.filter(member => member.userid !== userId);

            await fetch(`http://localhost:3001/Roles/${adminRole.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: filteredAdminMembers }),
            });
            console.log(`${userEmail} Banned.`)
        } catch (error)
        {
            console.error('Failed to ban user', error);
        }
        setAdminButton(false);
    }

    useEffect(() => {
        fetchAdminEmails();
    })
    return (
        <div>
            <br />
            <p>Admin Users</p>
            <ReactSearchBox
                placeholder='Demote User'
                value = "Doe"
                data = {admindata}
                onSelect = {handleSelect}

            />
             {adminselect && adminbutton && (
                <div>
                    <div>
                        <p>Admin to Guest</p>
                        <button onClick={()=>handleAdminUser(0)}>Demote User</button>
                        <button onClick={()=>setAdminButton(false)}>No</button>
                    </div>
                    <div>
                        <p>Admin to Banned</p>
                        <button onClick={()=>handleAdminUser(1)}>Ban User</button>
                        <button onClick={()=>setAdminButton(false)}>No</button>
                    </div>

                 </div>
             )}
        </div>
    )
};
export default DemoteAdmin;


           /* {
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
            } */