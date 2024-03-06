import React, {useState, useEffect} from 'react'
import ".././styles/AdminPopup.css"
import {Navigate} from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
import currentroles from '../context/roles.json'

const AdminPopup = ({setAdminPopup}) => {
    const roles = currentroles.Roles;

   return (
    <div className ="adminpopup">
        <div className ="popupheader">
            <div className = "addusersec">
                <h1>Add User</h1>
            </div>
            <div className ="existing-role-section">
                <h1>Existing Users</h1>
                <select multiple className="existinglist">
                    {roles.map((rolesObj, index) => (
                        <optgroup label={`Role: ${rolesObj.Role}`} key={index}>
                            {rolesObj.members.map((member, index) => (
                                <option key={index} disabled className="emails">{`Email: ${member.aemail}`}</option>
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