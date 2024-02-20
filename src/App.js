import React, {useEffect} from 'react';
import './App.css';
//import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import LiveView from './pages/LiveView.js';
import ViewData from './pages/ViewData.js';
import ManageCamera from './pages/ManageCamera.js';
import SignIn from './components/signin.js';
import Profile from './pages/Profile.js';
import { AuthContextProvider } from './context/AuthContext.js';
import Protected from './components/protected.js';
/*
import Profile from './pages/Profile.js';
import ModifyPermissions from './pages/ModifyPermissions.js';


*/


function App() {

  useEffect(() => {
    document.title = 'Hiv3';
  }, []);


  return (
    <div>
    <AuthContextProvider>
      <Routes>  
        <Route exact path='/' element={<Protected><Home /></Protected>} />
        <Route exact path = '/SignIn' element={<SignIn />} />
        <Route exact path = '/Profile' element={<Protected><Profile /></Protected>} />
        <Route exact path='/LiveView' element={<Protected><LiveView/></Protected>}/>
        <Route exact path='/ViewData' element={<Protected><ViewData/></Protected>}/>
        <Route exact path='/ManageCamera' element={<Protected><ManageCamera/></Protected>}/>
      </Routes>
    </AuthContextProvider>  
    </div>
  );
}

export default App;