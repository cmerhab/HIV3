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

    /*Finding if user has a role*/
    /*End Of Finding if user has a role*/
    const checkMembersInRole = (role, userEmail)  => {
        //console.log(role);
        //console.log(userEmail);
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

    const fetchOwnerRole = async () => {
        try {
            const isOwner = await checkMembersInRole('Owner', current_user);
            const isAdmin = await checkMembersInRole('Admin', current_user);
            const isGuest = await checkMembersInRole('Guest', current_user);
            const isBanned = await checkMembersInRole('Banned', current_user);
            if(isOwner) {
                console.log("The user is a member of owner")
            }
            else if(isAdmin){
                console.log("The user is a member of admin")
            }
            else if(isGuest) {
                console.log("The user is a member of guest")
            }
            else if(isBanned) {
                console.log("The user is a member of banned")
            }
             else {
                console.log("The user is not any role yet")
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }
    useEffect(() => {
        if(current_user) {
            fetchOwnerRole();
    }

}, [current_user]);



    /*Patch Request JSON Server*/ 
   /* const addMembertoGuest = () => { //This needs slight modification rn, just testing to see if it works.
        if((ownerEmailExists || adminEmailExists || guestRoleExists || bannedRoleExists))
        {
            console.log('Already a user');
            return;
        }
        else
        {
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
        }
    }; */
    /* End of Patch */

    /*PATCH request runs everytime page is ran*/
   /* useEffect(() => {
        addMembertoGuest();
    });*/

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