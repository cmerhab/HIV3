import React, {useEffect} from 'react';
import './App.css';
//import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
/*import Profile from './pages/Profile.js';
import ManageCamera from './pages/ManageCamera.js';'
import ModifyPermissions from './pages/ModifyPermissions.js';
import LiveViewfrom './pages/LiveView.js';
import ViewData from './pages/data.js';
*/
function App() {

  useEffect(() => {
    document.title = 'Hiv3';
  }, []);


  return (
    <Router>
    <Routes>
        <Route exact path='/' element={<Home />} />
    </Routes>
    </Router>
  );
}

export default App;