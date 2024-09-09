import React from 'react';
import './App.css';
// import Navbar from './Components/Navbar';
import Index from './Components/Index';
import { BrowserRouter as Router } from 'react-router-dom';
// import Jobportal from './Components/Jobportal'
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Index/>
        {/* <Jobportal/> */}
      </div>
    </Router>
  );
}

export default App;
