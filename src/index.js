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

import Index from "./Components/Index";
import About from "./Components/About";
import Joblist from "./Components/Joblist";
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

        <Route path="/index" element={<Index />}/>
         <Route path="/about" element={<About />}/>
         <Route path="/index/list" element={<Joblist />}/>
         <Route path="/index/detail" element={<Joblist />}/>
         <Route path="/about/list" element={<Joblist />}/>
         <Route path="/about/detail" element={<Joblist />}/>
         <Route path="/category" element={<Joblist />}/>
         <Route path="/contact" element={<Joblist />}/>
         <Route path="/testimonial" element={<Joblist />}/>
         <Route path="/404" element={<Joblist />}/>





      
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
