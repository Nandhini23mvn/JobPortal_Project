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
import Jobdetail from "./Components/Jobdetail";
import Jobcategory from "./Components/Jobcategory";
import Testimonial from "./Components/Testimonial";
import Pages404 from "./Components/Pages404";
import Contact from "./Components/Contact";


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

         <Route path="/joblist" element={<Joblist />}/>
         <Route path="/detail" element={<Jobdetail />}/>


         <Route path="/list" element={<Joblist />}/>

         <Route path="/category" element={<Jobcategory />}/>
         <Route path="/contact" element={<Contact />}/>

         <Route path="/testimonial" element={<Testimonial />}/>
         <Route path="/404" element={<Pages404/>}/>


      
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
