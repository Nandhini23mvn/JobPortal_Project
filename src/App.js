// import React from 'react';
// import './App.css';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignInPage from './Components/SignIn'; // Import the Sign In page
// import Index from './Components/Index';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* <Navbar /> */}
//         <Index/>
//         {/* <Jobportal/> */}
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './Components/SignIn'; // Import the Sign In page
import Index from './Components/Index'; // Import the Index/Home page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the routes for your app */}
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* <Route path="/signup" element={<SignUpPage />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
