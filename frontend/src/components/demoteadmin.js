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
            const response = await fetch('http://localhost:4000/fetchrole?roleName=Admin');
            const [adminRole] = await response.json();

            if(adminRole)
            {
                const adminEmails = adminRole.Roles.map(member => ({
                    key: member.Userid,
                    value: member.Emails, //double check if this is fine with multiple in a list
                }));
                setAdminData(adminEmails);
            }
        } catch (error) {
            console.error('Failed to fetch guest list', error);
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
        const objectId = adminselect.item.key;
        const objectEmail = adminselect.item.value;

        const userId = objectId[0];
        const userEmail = objectEmail[0];
            if(flag==1)
            {
                try {
                    const response = await fetch('http://localhost:4000/banadmin', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, userEmail }),
                    });
        
                    const data = await response.json();
                    console.log(data.message);
        
                } catch (error) {
                    console.error('Failed to ban admin', error);
                }
            }
            else if(flag == 0 )
            {
                try {
                    const response = await fetch('http://localhost:4000/demoteadmin', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId, userEmail }),
                    });
        
                    const data = await response.json();
                    console.log(data.message);
        
                } catch (error) {
                    console.error('Failed to demote admin', error);
                }
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