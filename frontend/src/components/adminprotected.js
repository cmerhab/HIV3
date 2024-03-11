import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const AdminProtected = ({children}) => {
    const {user} = UserAuth();
    const current_user = user.email;
    
    //Testing user for every role
    const adminRole = roles.Roles.find(role => role.Role === "Admin");
    const adminEmailExists = adminRole.members.some(member => member.aemail === current_user);
    
    const ownerRole = roles.Roles.find(role => role.Role === "Owner"); //Have to find the owner role
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user); //Once owner role is found, find members in role

    console.log(adminEmailExists);

    if(!(adminEmailExists || ownerEmailExists))
    {
        return <Navigate to ='/' />
    }
    return children
};

export default AdminProtected;