import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const AdminProtected = ({children}) => {
    const {user} = UserAuth();
    const current_user = user.uid;
    console.log(current_user);

    const adminIDExists = roles.members.some(member=>member.userid == current_user);
    console.log(adminIDExists);

    if(!adminIDExists)
    {
        return <Navigate to ='/' />
    }
        
    return children
};

export default AdminProtected;