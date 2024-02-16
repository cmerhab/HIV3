import React, {useEffect} from 'react';
import './App.css';
//import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import LiveView from './pages/LiveView.js';
import ViewData from './pages/ViewData.js';
import ManageCamera from './pages/ManageCamera.js';
/*
import Profile from './pages/Profile.js';
import ModifyPermissions from './pages/ModifyPermissions.js';


*/


function App() {

  useEffect(() => {
    document.title = 'Hiv3';
  }, []);


  return (
   <Router>
    <Routes>  
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/LiveView' element={<LiveView/>}/>
        <Route exact path='/ViewData' element={<ViewData/>}/>
        <Route exact path='/ManageCamera' element={<ManageCamera/>}/>
    </Routes>
    </Router>
  );
}

export default App;