import React, {useState} from "react"; 
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import ".././styles/Account.css"
import Topbar from "../components/topbar.js"
import roles from '../context/roles.json'

const Account = ({setAdminPopup}) => {

    const {user, logOut } = UserAuth();
    const [condition, setCondition] = useState(false);
    const current_user = user.email;

    //Testing for admin-level roles 
    const adminRole = roles.Roles.find(role => role.Role === "Admin");
    const adminEmailExists = adminRole.members.some(member => member.aemail === current_user);

    const ownerRole = roles.Roles.find(role => role.Role === "Owner");
    const ownerEmailExists = ownerRole.members.some(member => member.aemail === current_user);


    const handleSignOut = async () => {
        try {
            await logOut();
        } catch(error) {
            console.log(error)
        }
    }

    return (
   
        <div>
            <Topbar />
            <div className='PositionBox'>
                <div className='OrangeBox'>
                    <h1 className='Profile'>Profile Details</h1>
                    <br />
                    <br />
                    <img src={user?.photoURL} className="UserPhoto" />
                    <br />
                    <br /> 
                    <div className='UserDetails'>
                        <p>Welcome, {user?.displayName}</p> 
                        <p>Email: {user?.email}</p>
                    </div>
                    {(adminEmailExists || ownerEmailExists) && <button onClick={()=>setAdminPopup(true)}>Admin Config</button>} 
                    <button onClick={handleSignOut} className="SignOutButton">Logout</button>
                </div>
            </div>
        </div>
    )
}
export default Account;


/*
  {user?.displayName ? (  //Currently viewing account, you should only be logged in but this is a test before we add in protected pages
                <button onClick={handleSignOut}>Logout</button>
            ) : ( 
                <Link to='/signin'>Sign In</Link>
            )}
*/