import React, {useState, useEffect} from 'react'
import {UserAuth} from '../context/AuthContext'
import ReactSearchBox from "react-search-box";

const PromoteAdmin = () => {
    const [guestdata, setGuestData] = useState([]);
    const [guestselect, setGuestSelect] = useState();
    const [guestbutton, setGuestButton] = useState(false);


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
    }

    const handleGuestUser = async () => {
        if(!guestselect)
            return;
        const userId = guestselect.item.key;
        const userEmail = guestselect.item.value;

        try {
            const response = await fetch('http://localhost:4000/promoteuser', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userEmail }),
            });

            const data = await response.json();
            console.log(data.message);

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