import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'

const AdminProtected = ({children}) => {
    const {user} = UserAuth();
    const current_user = user.email;
    const [userisadmin, setUserIsAdmin] = useState(false);
    const [userisowner, setUserIsOwner] = useState(false);
    
    //Testing user for every role
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
     const fetchUpperRoles = async () => { 
        try {
            const isOwner = await checkMembersInRole('Owner', current_user);
            const isAdmin = await checkMembersInRole('Admin', current_user);
            if(isOwner) {
                console.log("The user is a owner")
                setUserIsOwner(true);
            } else if(isAdmin) {
                console.log("The user is a admin")
                setUserIsAdmin(true);
            }
            else {
                console.log("The user is not upper role")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }
    useEffect(() => {
        fetchUpperRoles();
    })

    if(!(userisadmin || userisowner))
    {
        return <Navigate to ='/' />
    }
    return children
};

export default AdminProtected;