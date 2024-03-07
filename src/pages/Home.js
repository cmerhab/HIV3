import React, {useEffect} from "react"; 
import ".././styles/Home.css";
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeed.js"
import Pastdata from "../components/pastdata.js"
import CurrentCount from "../components/currentcount.js"
import { Link } from "react-router-dom";
import {UserAuth} from '../context/AuthContext'
import roles from '../context/roles.json'



const Home = () => {
    const {user} = UserAuth();
    const current_user = user.email;
    const current_user_id = user.uid;
    const newGuest = {
        "aemail": user.email,
        "userid": user.uid
    };

    /*Finding if user has a role*/
    const ownerRole = roles.Roles.find(role => role.Role === "Owner"); //Have to find the owner role
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user); //Once owner role is found, find members in role

    const adminRole = roles.Roles.find(role => role.Role === "Admin");
    const adminEmailExists = adminRole.members.some(member => member.aemail === current_user);

    const guestRole = roles.Roles.find(role => role.Role === "Guest");
    const guestRoleExists = guestRole.members.some(member =>member.aemail === current_user);

    const bannedRole = roles.Roles.find(role => role.Role === "Banned");
    const bannedRoleExists = bannedRole.members.some(member =>member.aemail === current_user);
    /*End Of Finding if user has a role*/



    /*Patch Request JSON Server*/ 
    const addMembertoGuest = () => { //This needs slight modification rn, just testing to see if it works.
        if(!(ownerEmailExists || adminEmailExists || guestRoleExists || bannedRoleExists))
        fetch('http://localhost:3001/Roles?Role=Guest') 
            //fetch Roles if Role = guest
            .then(response => response.json())
            .then(data => {
                if(data.length > 0) {
                    const guestRole = data[0];
                    const updatedMembers = [...guestRole.members, { "aemail": current_user, "userid": current_user_id}];

                    //Update the guest role with new member
                    fetch(`http://localhost:3001/Roles/${guestRole.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',  
                        },
                        body: JSON.stringify({ members: updatedMembers }),
                    })
                    .then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.error('Error', err))
                }
            })
            .catch(err => console.error('Error fetching Guest role:', err));
    };
    /* End of Patch */

    /*PATCH request runs everytime page is ran*/
    useEffect(() => {
        addMembertoGuest();
    });

    return (
        <div class="homepage">
            <Topbar />
            <Livefeed/>
            <CurrentCount />
            <Pastdata />
            <div className="left-box">
                <div className="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                    <p1>Local Temperature: </p1>
                </div>
                <div className ="Manage_Camera">
                    <button className ="Sidebar_Button">
                    <Link to='/ManageCamera' className="titles">Manage Camera</Link>
                    </button>
                </div>
                <div class ="Modify_Perms">
                    <button className="Sidebar_Button">
                    <Link to='/ModifyPerms' className="titles">Modify Permissions</Link>
                    </button>
                </div>
                <div className ="Live_View">
                    <button className="Sidebar_Button">
                        <Link to='/LiveView' className="titles">LiveView</Link>
                    </button>
                </div>
                <div className ="View_Data">
                    <button className="Sidebar_Button">
                    <Link to='/ViewData' className="titles">View Data</Link>
                    </button>
                </div>
    
            </div>
   

        </div>


    );

};
export default Home;