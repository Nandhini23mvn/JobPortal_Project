import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {   faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faFacebookF, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button ,  Row, Col , Form,Breadcrumb} from 'react-bootstrap';
import {  FaPhoneAlt } from 'react-icons/fa';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {   Image } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaMoneyBillAlt, FaAngleRight } from 'react-icons/fa';
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


const Job = ({ jobData = {} }) => {
  const { title } = jobData;

  return (
    <Container
      className="py-5 page-header mb-5 position-relative"
      style={{
        backgroundImage: `linear-gradient(rgba(43, 57, 64, 0.5), rgba(43, 57, 64, 0.5)), url(${carouselImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="box my-5 pt-5 pb-4">
        <h1 className="text-white mb-3 animated slideInDown custom-heading">
          {title || " Job Detail"}
        </h1>
        <Breadcrumb className="text-uppercase" aria-label="breadcrumb">
          <Breadcrumb.Item className="custom-green" href="#">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="custom-green" href="#">
            Pages
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-white" aria-current="page">
            Job Detail
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
    </Container>
  );
};

// {Jobs Start}

const JobDetail = () => {
    return (
        <Container className='container-xxl'>
                <Row className="gy-5 gx-4">
        <Col lg={8}>
          <div className="d-flex align-items-center mb-5">
            <Image 
 src={require('../Data/img/com-logo-2.jpg')}           
      alt="Company Logo" 
              className="flex-shrink-0 border rounded" 
              style={{ width: '80px', height: '80px' }} 
              fluid 
            />
           <div className="text-start ps-4">
            <h3 className="mb-3">Marketing Manager</h3>
            <div className="d-flex align-items-center flex-wrap">
                <span className="text-truncate me-3 d-flex align-items-center">
                <FaMapMarkerAlt className="text-customgreen me-2" />New York, USA
                </span>
                <span className="text-truncate me-3 d-flex align-items-center">
                <FaClock className="text-customgreen me-2" />Full Time
                </span>
                <span className="text-truncate me-0 d-flex align-items-center">
                <FaMoneyBillAlt className="text-customgreen me-2" />$123 - $456
                </span>
            </div>
            </div>

          </div>
  
          <div className="mb-5">
            <h4 className="mb-3">Job Description</h4>
            <p>
            The pain was just a matter of time for the two of them. Elitr the pain, however, was covered with hard work. Kasd, but the very elitr clita rebum so as to be diam for a time. Sadipscing nonumy, indeed, they envy the pain, but in the same way pain will be settled with some kind of pain. In fact, he was just standing there. It's really fun but the internet is great. Rebum, indeed, pains, pains, pains, pains, indeed, great pains, the sea sadipscing stood and. It is voluptuous and holy, but he was truly holy, but, but, amet two no diam clita rebum two, I will accuse time takimata clita stet nonumy rebum is envious stet, pain.
            </p>
            <h4 className="mb-3">Responsibility</h4>
            <p>
            A large and elite diam but the world. He was standing for a long time. Accused but the lore of the stet volupta be at the stet consetetur, takimata at diam kasd gubergren elitr pain
            </p>
            <div className='pb-3'>
            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>I will accuse him of pain just for the time being</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>Elitr the pain, however, was covered with hard work</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>  Rebum, however, pains pains elitr</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>It is a pleasure and a saint, but he was a saint</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>He was standing for a long time</span>
            </ListGroup.Item>
            </div>
            
            
              
           
            <h4 className="mb-3">Qualifications</h4>
            <p>
            A large and elite diam but the world. He was standing for a long time. Accused but the lore of the stet volupta be at the stet consetetur, takimata at diam kasd gubergren elitr pain
            </p>
            <div className='pb-3'>
            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>I will accuse him of pain just for the time being</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>Elitr the pain, however, was covered with hard work</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>  Rebum, however, pains pains elitr</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>It is a pleasure and a saint, but he was a saint</span>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex align-items-center">
            <FaAngleRight className="text-customgreen me-2" />
            <span>He was standing for a long time</span>
            </ListGroup.Item>
            </div>
            
          </div>
  
          <div className='pb-5 mb-5'>
            <h4 className="mb-4">Apply For The Job</h4>
            <Form>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Form.Control type="text" placeholder="Your Name" />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control type="email" placeholder="Your Email" />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control type="text" placeholder="Portfolio Website" />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control type="file" className="bg-white" />
                </Col>
                <Col xs={12}>
                  <Form.Control as="textarea" rows={5} placeholder="Cover Letter" />
                </Col>
                <Col xs={12}>
                <Button
  className="w-100 !bg-customgreen border-2 !border-customgreen hover:bg-customgreen hover:border-customgreen text-white"
  type="submit"
>               Apply Now
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
  
        <Col lg={4}>
          <div className="bg-light rounded p-5 mb-4">
            <h4 className="mb-4">Job Summary</h4>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Published On: 01 Jan, 2045
            </span>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Vacancy: 123 Position
            </span>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Job Nature: Full Time
            </span>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Salary: $123 - $456
            </span>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Location: New York, USA
            </span>
            <span className="text-truncate me-3 p-2 d-flex align-items-center">
                <FaAngleRight className="text-customgreen me-2" />Deadline: 01 Jan, 2045
            </span>
            
          </div>
          <div className="bg-light rounded p-5">
            <h4 className="mb-4">Company Detail</h4>
            <p className="m-0">I will accuse him of the pain itself, and the pains of the diam, but the rebum sadipscing elitr the pains. I am sorry for the pain of elitr just and no gubergren sadipscing, him and takimata some and the rebum is the very lorem diam. And the world is so great, and holy, and blessed with labor.</p>
          </div>
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
    <>
    <div className='main-container'>
    <NavbarComponent />
      <Job/>
      <JobDetail/>
      <Footer/>
   
    </div>
    </>
  );
};

export default MainComponent;