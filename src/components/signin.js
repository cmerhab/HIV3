import React, {useEffect} from "react"; 
import { GoogleButton } from 'react-google-button';
import {UserAuth} from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import ".././styles/SignIn.css"
import Logo from ".././media/Hive Logo.png"

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
    <div className = 'signinposition'>
        <div className='leftside'>
            <div classname ="alltext">
                <h1 className = 'headertext'>Welcome To The HIV3!</h1>
                <p className = 'bodytext'>Description of Project</p>
            </div>
        </div>

        <div className='rightside'>
            <div className='signinbox'>
                <img src={Logo} className="HiveLogo" alt="Hive Logo" /> 
             
                <div className="logintext">
                <h1>HIV3 Monitor</h1>
                <br />
                <div className='googlebutton'>
                    <GoogleButton onClick={handleGoogleSignIn} />
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SignIn;


           
