import React, {useState, useEffect} from 'react'
import ".././styles/AdminPopup.css"
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const AdminPopup = ({setAdminPopup}) => {
   return (
    <div className ="adminpopup">
        <div classname ="popupheader">
            <h1>Add User</h1>
            <button onClick={()=>setAdminPopup(false)}> X </button>
        </div>
    </div>
   )
};

export default AdminPopup;