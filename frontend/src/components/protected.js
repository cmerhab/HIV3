import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const Protected = ({children}) => {
    const {user, logOut} = UserAuth();
        
    if(!user) {
        return <Navigate to ='/signin' />;
    } 
        return children;
   
};

export default Protected; 