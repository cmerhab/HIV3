import React from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const Protected = ({children}) => {
    const {user, logOut} = UserAuth();
        
    if(!user) {
        return <Navigate to ='/signin' />;
    } 
    const current_user = user.email;
    const bannedRole = roles.Roles.find(role => role.Role === "Banned");
    const bannedRoleExists = bannedRole.members.some(member =>member.aemail === current_user);
    if(bannedRoleExists)
    {
        return [ 
            <Navigate to='/signin' />,
            logOut()
        ];
    }

    return children;
};

export default Protected; 

/*
import roles from '../context/roles.json'
const current_user = user.email;




    const ownerRole = roles.Roles.find(role => role.Role === "Owner"); //Have to find the owner role
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user); //Once owner role is found, find members in role

    const adminRole = roles.Roles.find(role => role.Role === "Admin");
    const adminEmailExists = adminRole.members.some(member => member.aemail === current_user);

    const guestRole = roles.Roles.find(role => role.Role === "Guest");
    const guestRoleExists = guestRole.members.some(member =>member.aemail === current_user);

    const bannedRole = roles.Roles.find(role => role.Role === "Banned");
    const bannedRoleExists = bannedRole.members.some(member =>member.aemail === current_user);




if(user && !(ownerEmailExists || adminEmailExists || guestRoleExists || bannedRoleExists)) //if user exists, but no role has been given
    {
        let newGuest = {
            "aemail": user.email,
            "userid": user.uid
        };
        for(let role of roles.Roles)
        {
            if(role.Role === "Guest")
            {
                role.members.push(newGuest);
                break;
            }
        }
    }
*/







