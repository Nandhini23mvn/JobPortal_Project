import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {   faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faFacebookF, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button ,  Row, Col , Form,Breadcrumb} from 'react-bootstrap';
import { FaAngleRight } from 'react-icons/fa'; // Import the icon
import { FaMapMarkerAlt, FaEnvelopeOpen, FaPhoneAlt } from 'react-icons/fa';


import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import jobData from '../Data/Jobdata.json';
import carouselImage from '../Data/img/carousel-1.jpg';




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
    <Container fluid className=" sticky-top container-xxl  p-0">
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
      className="py-5 page-header container-xxl  position-relative"
      style={{
        backgroundImage: `linear-gradient(rgba(43, 57, 64, 0.5), rgba(43, 57, 64, 0.5)), url(${carouselImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="box my-5 pt-5 pb-4">
        <h1 className="text-white mb-3 animated slideInDown custom-heading">
          {title || "Contact"}
        </h1>
        <Breadcrumb className="text-uppercase" aria-label="breadcrumb">
          <Breadcrumb.Item className="custom-green" href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="custom-green" href="#">
            Pages
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white" aria-current="page">
            Contact
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </Container>
  );
};

// {Jobs Start}

const ContactSection = () => {
  const title = "Contact For Any Query";
  const mapEmbedURL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd";
  const buttonText = "Send Message";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`Changing ${name} to ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch("http://localhost:5500/api/message/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${errorDetails}`);
      }

      const result = await response.json();
      console.log("Request submitted successfully:", result);
      alert("Your request has been submitted successfully!");

      // Clear the form data after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(`Error submitting your request: ${error.message}`);
    }
  }; 

  return (
    <Container fluid className="py-5 container-xxl">
      <Container>
      <div className="text-center mb-5 font-inter text-[40px] font-bold">{title}</div>
      <Row className="g-4">
          <Col xs={12}>
            <Row className="gy-4">
              <Col md={4}>
                <div className="d-flex align-items-center bg-light rounded p-4">
                  <div
                    className="bg-white border rounded d-flex align-items-center justify-content-center me-3"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <FaMapMarkerAlt className="text-customgreen" />
                  </div>
                  <span>123 Street, New York, USA</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center bg-light rounded p-4">
                  <div
                    className="bg-white border rounded d-flex align-items-center justify-content-center me-3"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <FaEnvelopeOpen className="text-customgreen" />
                  </div>
                  <span>info@example.com</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center bg-light rounded p-4">
                  <div
                    className="bg-white border rounded d-flex align-items-center justify-content-center me-3"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <FaPhoneAlt className="text-customgreen" />
                  </div>
                  <span>+012 345 6789</span>
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <iframe
              title="Map showing New York, USA"
              className="position-relative rounded w-100 h-100"
              src={mapEmbedURL}
              frameBorder="0"
              style={{ minHeight: "400px", border: "0" }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            />
          </Col>

          <Col md={6}>
            <p className="mb-4">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax & PHP in a few minutes. Just copy
              and paste the files, add a little code and you're done.{" "}
              <a href="https://htmlcodex.com/contact-form" className="text-customgreen">
                Download Now
              </a>
              
            </p>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Floating>
                      <Form.Control
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label>Your Name</label>
                    </Form.Floating>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Floating>
                      <Form.Control
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label>Your Email</label>
                    </Form.Floating>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="subject">
                    <Form.Floating>
                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <label>Subject</label>
                    </Form.Floating>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="message">
                    <Form.Floating>
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a message here"
                        style={{ height: "150px" }}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                      <label>Message</label>
                    </Form.Floating>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Button
                    className="w-100 py-3 !bg-customgreen hover:bg-customgreen !border-customgreen text-white"
                    type="submit"
                  >
                    {buttonText}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
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
    <>
    <div className="main-container">
         <NavbarComponent />
         <About/>
         <ContactSection/>
         <Footer/>
    </div>
     
    </>
  );
};

export default MainComponent;