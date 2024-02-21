import React from "react"; 
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import ".././styles/Account.css"
import Topbar from "../components/topbar.js"

const Account = () => {

    const {user, logOut } = UserAuth();

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
                    <h1 className='Profile'>Profile</h1>
                    <br />
                    <br />
                    <img src={user?.photoURL} className="UserPhoto" />
                    <br />
                    <br /> 
                    <div className='UserDetails'>
                        <p>Welcome, {user?.displayName}</p> 
                        <p>Email: {user?.email}</p>
                    </div>
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