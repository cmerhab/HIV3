import React, {useState, useEffect} from 'react'
import ".././styles/AdminPopup.css"
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'

const AdminPopup = ({setAdminPopup}) => {
    const organizedData = {};
    const role = roles.Role;

    if(!organizedData[role]){
        organizedData[role] = [];
    }

    roles.members.forEach(member => {
        organizedData[role].push(member.aemail);
    });


   return (
    <div className ="adminpopup">
        <div className ="popupheader">
            <div className = "addusersec">
                <h1>Add User</h1>
            </div>
            <div className ="existing-role-section">
                <h1>Existing Users</h1>
                    <select multiple className="existinglist">
                        {Object.keys(organizedData).map((role, index) => (
                            <optgroup label ={`Role: ${role}`} key={index}> 
                                {organizedData[role].map((email, index) => (
                                    <option key = {index} value ={email} className="emails" disabled >{`Email: ${email}`}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
            </div>
            <div className="exitbutton">
                <button onClick={()=>setAdminPopup(false)}> X </button>
            </div>
        </div>
    </div>
   )
};

export default AdminPopup;