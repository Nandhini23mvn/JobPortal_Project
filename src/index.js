import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInPage from "./Components/SignIn";
import SignUpPage from "./Components/SignUp";
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';

// import About from "./pages/about";
// import Service from "./pages/Service";
// import Project from "./pages/Project";
// import TheTeam from "./pages/TheTeam"
// import TestimonialHeader from "./pages/Testimonial";
// import Bloggrid from "./pages/BlogGrid";
// import Blogdetail from "./pages/BlogDetail";
// import Contact from "./pages/Contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage/>} />


        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminPanel />} /> 

        {/* <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} /> 
         <Route path="/project" element={<Project />} />
        <Route path="/team" element={<TheTeam />} />
        <Route path="/testimonial" element={<TestimonialHeader />} />
        <Route path="/blog" element={<Bloggrid />} />
        <Route path="/detail" element={<Blogdetail />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
