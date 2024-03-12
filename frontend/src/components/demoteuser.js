import React, {useState, useEffect} from 'react';
import {UserAuth} from '../context/AuthContext';
import ReactSearchBox from "react-search-box";
import DemoteAdmin from '../components/demoteadmin';
const DemoteUser = () => {
    const [guestdata, setGuestData] = useState([]);
    const [guestselect, setGuestSelect] = useState();
    const [guestbutton, setGuestbutton] = useState(false);

    const {user} = UserAuth();
    const current_user = user.email;
    const [isuserowner, setIsUserOwner] = useState(false);
    
    const fetchGuestEmails = async () => {
        try {
            const response = await fetch('http://localhost:4000/fetchrole?roleName=Guest');
            const [guestRole] = await response.json();

            if(guestRole)
            {
                let guestEmails =[];
                console.log(guestRole);
                guestRole.Roles.forEach(member => {
                    for(let i = 0; i< member.Emails.length; i++) {
                        const email = member.Emails[i];
                        const userid = member.Userid[i]; 
                        guestEmails.push ({
                            key: userid,
                            value: email,
                        });
                    }
                });
                    
                setGuestData(guestEmails);
                console.log(guestEmails);
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

    const checkMembersInRole = (role, userEmail)  => {
       return fetch(`http://localhost:4000/findmember?role=${encodeURIComponent(role)}&current_user=${encodeURIComponent(userEmail)}`)
            .then(response => response.json())
            .then(data=> {
                console.log(data.message);
                return data.message.includes("Member exists in role");
            })
            .catch(error => {
                console.error('Error', error);
                return false;
            });
    }

    const fetchOwnerRole = async () => {
        
        try {
            const isOwner = await checkMembersInRole('Owner', current_user);
            if(isOwner) {
                console.log("The user is a member of owner")
                setIsUserOwner(true);
            }
            else {
                console.log("The user is not any role yet")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }



    useEffect(() => {
        fetchGuestEmails();
        fetchOwnerRole();
    })

   
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
            {isuserowner && (
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