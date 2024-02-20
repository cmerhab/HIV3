import React from "react"; 
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

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
            <h1 className='Account'>Account</h1>
            <div>
                <p>Welcome, {user?.displayName}</p>
            </div>
                <button onClick={handleSignOut}>Logout</button>
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