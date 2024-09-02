import React from 'react';
import './App.css';
// import Navbar from './Components/Navbar';
import Index from './Components/Index';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Index/>
      </div>
    </Router>
  );
}

export default App;
