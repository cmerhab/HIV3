import React, {useEffect} from "react"; 
import { GoogleButton } from 'react-google-button';
import {UserAuth} from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const SignIn = () => {

    const {googleSignIn, user} = UserAuth(); //Getting access to googleSignIn func from AuthContext.js
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(()=> { //makes sure user is logged in before naving to home
        if(user != null) {
            navigate('/');
        }
    }, [user]);

   

    return (
        <div>
            <h1>Sign In</h1>
            <div className='googlebutton'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    )
}
export default SignIn;