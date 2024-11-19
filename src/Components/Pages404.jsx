import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {  faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaAngleRight } from 'react-icons/fa'; // Import the icon
import {  FaPhoneAlt } from 'react-icons/fa';
import { faTwitter, faFacebookF, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button ,  Row, Col , Form,Breadcrumb} from 'react-bootstrap';
import { BsExclamationTriangle } from 'react-icons/bs';


import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import jobData from '../Data/Jobdata.json';
import carouselImage from '../Data/img/carousel-1.jpg';
import '../App.css'; 



const NavbarComponent = () => {
  const config = jobData.user[0];
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdown_1, setDropdown_1] = useState(false);
  const [dropdown_2, setDropdown_2] = useState(false);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null); // Track active item


  const isActive = (path) => location.pathname === path || (path === "/index" && location.pathname === "/");
  const handleClick = (item) => {
    setActiveItem(item);
  };

  if (!config) return null;

  return (
  
    <Container fluid className=" sticky-top container-xxl   p-0">
    {/* <Navbar bg="white" expand="lg" className="shadow sticky-top p-0  w-100 align-items-center navbar-custom-padding"> */}
    <Navbar 
        bg="white" 
        expand="lg" 
        className=" shadow  p-0 w-100 align-items-center navbar-custom navbar-custom-padding"
        >

      <Navbar.Brand as={Link} to="/index" className="d-flex align-items-center text-center py-0 px-lg-5 px-3">
        <h1 className="m-0 !text-customgreen font-inter font-40xl font-bold">
          {config.brand || "Brand Name"}
        </h1>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" className="me-6"    />

      <Navbar.Collapse id="navbarScroll">
   

        <Nav className="ms-auto ms-auto p-4 p-lg-4 gap-2 ">
          {config.link_1 && config.link_1.map((link, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={link.to}
              className={`nav-item !text-dark !text-15xl font-hebbo !font-normal hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Nav.Link>
            ))}

            {/* Dropdown 1 */}
            {config.dropdown_1 && (
              <NavDropdown
                onMouseEnter={() => setDropdown_1(true)}
                onMouseLeave={() => setDropdown_1(false)}
                show={dropdown_1}
                title={config.dropdown_1.title_1}
                id="navbarScrollingDropdown1"
                className="dropdown-custom"

              >
                {config.dropdown_1.items.map((item, index) => (
                <NavDropdown.Item
                  key={index}
                  as={Link}
                  to={item.to}
                  onClick={() => handleClick(item.to)}
                  className={`!text-15xl font-hebbo font-bold ${activeItem === item.to ? "active" : ""}`}
                >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {/* Dropdown 2 */}
            {config.dropdown_2 && (
              <NavDropdown
                onMouseEnter={() => setDropdown_2(true)}
                onMouseLeave={() => setDropdown_2(false)}
                show={dropdown_2}
                title={config.dropdown_2.title_2}
                id="navbarScrollingDropdown2" 
                className="dropdown-custom"

              >
                {config.dropdown_2.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`!text-15xl font-hebbo font-bold ${isActive(item.to) ? "active" : ""}`}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {/* Secondary Links */}
            {config.link_2 && config.link_2.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item !text-dark !text-15xl font-hebbo !font-normal hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        {/* Post a Job Button with Hover Dropdown */}
        <Dropdown
          show={showDropdown}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className="d-none d-lg-block dropdown-custom"
        >
          <Dropdown.Toggle
            as={Button}
            to={config.button.link}
            className="text-white !bg-customgreen rounded-0 py-4 px-lg-5 !font-inter font-16xl !font-bold custom-button custom-dropdown-toggle navbar-custom-button"
            style={{ height: "100%", border: "none" }}
          >
            {config.button.label || "Post a Job"}
            <FontAwesomeIcon icon={faArrowRight} className="ms-1" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-custom">
            {config.sign_dropdown_button.map((btn, index) => (
              <Dropdown.Item
                key={index}
                as={Link}
                to={btn.to}
                className="dropdown-item-custom"
              >
                {btn.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    
      
    </Container>
    
  );
};
// Navbar-Ended



const About = ({ jobData = {} }) => {
  const { title } = jobData;

  return (
    <Container
      className="py-5 container-xxl page-header pb-4 position-relative "
      style={{
        backgroundImage: `linear-gradient(rgba(43, 57, 64, 0.5), rgba(43, 57, 64, 0.5)), url(${carouselImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="box my-5 pt-5 pb-4">
        <h1 className="text-white mb-3 animated slideInDown custom-heading">
          {title || "404 Error"}
        </h1>
        <Breadcrumb className="text-uppercase" aria-label="breadcrumb">
          <Breadcrumb.Item className="custom-green" href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="custom-green" href="#">
            Pages
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white" aria-current="page">
            404 Error
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </Container>
  );
};

// {Jobs Start}

const NotFoundPage = () => {
    return (
        <Container className="container-xxl pt-5 text-center">
        <Row className="justify-content-center pb-5 mb-5">
          <Col lg={6}>
          <div className="d-flex justify-content-center p-3">
            <BsExclamationTriangle className="display-1 text-customgreen" />
          </div>
            <h1 className="display-1 bold">404</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">
              We’re sorry, the page you have looked for does not exist on our website!
              Maybe go to our home page or try to use a search?
            </p>
            <Button className="py-3 px-5 text-white" href="/" style={{ backgroundColor: '#00b074', border: 'none' }}>
              Go Back To Home
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };
  

// Footer---start



const Footer = () => {
  return (
        <div className="container-xxl  bg-dark text-white-50 footer  mt-5">

<Row className="g-5 ">
      {/* Company Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Company</h5>
        <Row>
        <Col>
  <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
  <FaAngleRight className="me-2" /> About Us
</Button>
  </Col>
</Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Contact Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Our Services</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Privacy Policy</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Terms & Condition</Button>
        </Col>
      </Row>
      </Col>
      
      {/* Quick Links Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Quick Links</h5>
        <Row className="d-flex align-items-center">
  <Col>
  <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
  <FaAngleRight className="me-2" /> About Us
</Button>
  </Col>
</Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Contact Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Our Services</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Privacy Policy</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button variant="link" className="text-white-50 text-decoration-none d-flex align-items-center" href="/about-us">
        <FaAngleRight className="me-2" />Terms & Condition</Button>
        </Col>
      </Row>
      </Col>
      
      {/* Contact Section */}
      <Col lg={3} md={6}>
            <h5 className="text-white mb-4">Contact</h5>
            <p className="mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3" />
              123 Street, New York, USA
            </p>
            <p className="mb-2 d-inline-flex align-items-center">
              <FaPhoneAlt className="me-3" />
              +012 345 67890
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="me-3" />
              info@example.com
            </p>
            <div className="d-flex pt-2">
              <Button variant="outline-light" className="btn-social" href="https://twitter.com">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
              <Button variant="outline-light" className="btn-social" href="https://facebook.com">
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button variant="outline-light" className="btn-social" href="https://youtube.com">
                <FontAwesomeIcon icon={faYoutube} />
              </Button>
              <Button variant="outline-light" className="btn-social" href="https://linkedin.com">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Button>
            </div>
          </Col>
      {/* Newsletter Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Newsletter</h5>
        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
        <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
          <Form.Control className="bg-transparent w-100 py-3 ps-4 pe-5" type="email" placeholder="Your email" />
          <Button type="button" className="btn btn-customgreen  py-2 position-absolute top-0 end-0 mt-2 me-2" 
          style={{ backgroundColor: '#00b074', borderColor: '#00b074' }}>
            SignUp
          </Button>
        </div>
      </Col>
    </Row>



     <Container className="bg-dark text-white-50 py-4">
     <div className="copyright">
       <Row>
         <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
           &copy; <button className="border-bottom text-white no-underline" href="#">Your Site Name</button>, All Rights Reserv
           Designed By <a className="border-bottom text-white no-underline" href="https://htmlcodex.com">HTML Codex</a>
         </Col>
         <Col md={6} className="text-center text-md-end">
           <div className="footer-menu">
           <button className="text-white me-3 no-underline">Home</button>
<button className="text-white me-3 no-underline">Cookies</button>
<button className="text-white me-3 no-underline">Help</button>
<button className="text-white no-underline">FAQs</button>
           </div>
         </Col>
       </Row>
     </div>
   </Container>
   </div>
  );
};

const MainComponent = () => {
  return (
    <div className="main-container">
      <NavbarComponent />
      <About />
      <NotFoundPage />
      <Footer />
    </div>
  );
};

export default MainComponent;