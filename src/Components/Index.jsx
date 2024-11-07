import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {  faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faFacebookF, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button ,Carousel,  Row, Col , Form} from 'react-bootstrap';
import { faMailBulk, faHeadset, faUserTie, faTasks, faChartLine, faHandsHelping, faBookReader, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { faMapMarkerAlt, faClock, faMoneyBillAlt, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs,  Image } from 'react-bootstrap';
import aboutImg1 from '../Data/img/about-1.jpg';
import aboutImg2 from '../Data/img/about-2.jpg';
import aboutImg3 from '../Data/img/about-3.jpg';
import aboutImg4 from '../Data/img/about-4.jpg';
import jobData from '../Data/Jobdata.json';


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


/* carousel start */

/// Import images
const imageMap = {
  "carousel_1": require('../Data/img/carousel-1.jpg'),
  "carousel_2": require('../Data/img/carousel-2.jpg'),
};

const CarouselFadeExample = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const carouselData = jobData.carousel;
  const categories = jobData.categories;
  const locations = jobData.locations;

  const handleSearch = () => {
    console.log("Keyword:", keyword);
    console.log("Category:", category);
    console.log("Location:", jobLocation);
  };

  return (
    <Container className="container-xxl p-0 header-carousel ">
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carouselData).map((key) => {
          const item = carouselData[key];
          const jobIndex = Number(key) - 1; // Convert key to number
          const job = jobData.jobs[jobIndex];

          return (
            <Carousel.Item key={key}>
              <img
                className="d-block w-100"
                src={imageMap[item.image]} // Ensure imageMap is defined
                alt={`Slide ${key}`}
              />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, 0.7)" }}
              >
                <div className="box"> {/* Apply the box class here */}
                  <Container className='container-xl p-5 p-0'>
                    <Row className="justify-content-start">
                      <Col xs={12} md={10} lg={8}>
                        <div className="text-white">
                          <h1 className="header-3 font-inter font-40xl font-bold font-64px mb-4">
                            {item.heading}
                          </h1>
                          <p className="fs-5 mb-4">
                            {job?.description} {/* Display job description */}
                          </p>
                          <div className="d-flex flex-column flex-md-row">
                            {item.buttons.map((btn, index) => (
                              <a
                                key={index}
                                href={btn.link}
                                className={`btn ${index === 0 ? 'btn-customgreen !bg-customgreen' : 'btn-primary'} text-white !font-inter font-16xl !font-bold py-md-3 px-md-5 mb-2 mb-md-0 me-md-3`} 
                                style={{ borderRadius: "2px" }}
                              >
                                {btn.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
 


{/* /* carousel end */}


{/* Search Bar after Carousel */}
       
     <Container className='container p-4  bg-customgreen '>
        <Row className="g-2">
           <Col md={10}>
            <Row className="g-2">
               <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border-0"
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  className="border-0"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select
                  className="border-0"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                >
                  <option value="">Location</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Button className="btn-dark border-0 w-100" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Container>

    </Container>
  );
};
// {/* Search Bar after Carousel ended */}


// {/* Category--start    */}

const icons = {
  'fa-mail-bulk': faMailBulk,
  'fa-headset': faHeadset,
  'fa-user-tie': faUserTie,
  'fa-tasks': faTasks,
  'fa-chart-line': faChartLine,
  'fa-hands-helping': faHandsHelping,
  'fa-book-reader': faBookReader,
  'fa-drafting-compass': faDraftingCompass
};

const JobCategories = () => {
  // Access the jobcategories array from the imported JSON data
  const categories = jobData.jobcategories;

  return (
    <Container fluid className=" container-xxl py-5  ">
      <Container>
        <h1 className="text-center mb-5 font-inter font-40xl font-bold text-dark">Explore By Category</h1>
        <Row className="g-4">
          {categories.map((category, index) => (
            <Col lg={3} sm={6} key={index} className="wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
              <div className="cat-item  shadow p-4">
                <FontAwesomeIcon icon={icons[category.icon]} size="3x " className="!text-customgreen mb-4 "   />
                <h6 className="mb-3">{category.title}</h6>
                <p className="mb-0">{category.vacancies}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};
// {/* Category--Ended    */}


//{About-section start}

const AboutSection = () => {
  const { title, description, points, button } = jobData;
  const images = [aboutImg1, aboutImg2, aboutImg3, aboutImg4];
 
  return (
    <Container fluid className="py-5 container-xxl ">
      <Container>
        <Row className="g-5 align-items-center ">
          <Col lg={6} className="wow fadeIn">
          <Row className="g-0 about-bg overflow-hidden"> {/* Apply custom class here */}
          {images.map((image, index) => (
                <Col
                  xs={6}
                  className={`text-${index % 2 === 0 ? 'start' : 'end'}`}
                  key={index}
                >
                  <img
                    className={`img-fluid ${index === 1 || index === 2 ? 'w-85' : 'w-100'}`}
                    src={image} // Use imported image
                    alt={`About ${index + 1}`}
                    style={index === 1 ? { marginTop: '15%' } : {}}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={6} className="wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4 font-inter font-40xl font-bold text-dark">{title}</h1>
            <p className="mb-4 font-15xl font-hebbo font-normal text-lightgrey">{description}</p>
            {points.map((point, index) => (
              <p key={index} className="font-15xl font-hebbo font-normal text-lightgrey">
                <FontAwesomeIcon icon={faCheck} className="text-customgreen me-3 " />
                {point }
              </p>
            ))}
            <Button className="!bg-customgreen text-white py-3 px-5 mt-3 !font-inter !font-15xl !font-bold" style={{  border: "none", borderRadious: "0 !importatnt" }} href={button.link}>
              {button.text }
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
// {About End}

// {Jobs Start}

const JobsListing = () => {
  const { featuredJobs, fullTimeJobs, partTimeJobs } = jobData;

  return (
    <Container className=" py-5 container-xxl " fluid >
      <h1 className="text-center mb-5 font-inter font-40xl font-bold text-dark">Job Listing</h1>
      
      <Tabs defaultActiveKey="tab-1" className="justify-content-center mb-5 font-15xl font-hebbo font-bold text-custom-dark !important">
        <Tab eventKey="tab-1" title="Featured">
          {featuredJobs.map((job, index) => (
            <JobItem key={index} {...job} />
          ))}
             <div className="text-center mt-5">
          <Button className="!bg-customgreen text-white py-3 px-5 mt-3 !font-inter !font-15xl !font-bold" style={{  border: "none", borderRadious: "0 !importatnt" }} href="/featured-jobs">
            Browse More Jobs
          </Button>
          </div>
        </Tab>
        <Tab eventKey="tab-2" title="Full Time">
          {fullTimeJobs.map((job, index) => (
            <JobItem key={index} {...job} />
          ))}
          <div className="text-center mt-5">
          <Button className="!bg-customgreen text-white py-3 px-5 mt-3 !font-inter !font-15xl !font-bold" style={{  border: "none", borderRadious: "0 !importatnt" }} href="/featured-jobs">
            Browse More Jobs
          </Button>
          </div>
        </Tab>
        <Tab eventKey="tab-3" title="Part Time">
          {partTimeJobs.map((job, index) => (
            <JobItem key={index} {...job} />
          ))}
          <div className="text-center mt-5">
          <Button className="!bg-customgreen text-white py-3 px-5 mt-3 !font-inter !font-15xl !font-bold" style={{  border: "none", borderRadious: "0 !importatnt" }} href="/featured-jobs">
            Browse More Jobs
          </Button>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

const JobItem = ({ title, company, location, type, salary, deadline, img }) => (
  <Row className="g-4 job-item p-4 mb-4">
    <Col sm={12} md={8} className="d-flex align-items-center">
      <Image
        src={img}
        alt={`Company logo for ${company}`}
        className="flex-shrink-0 img-fluid border rounded"
        style={{ width: '80px', height: '80px' }}
      />
      <div className="text-start ps-4">
        <h5 className="mb-3">{title}</h5>
        <span className="text-truncate me-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-customgreen me-2" />
          {location}
        </span>
        <span className="text-truncate me-3">
          <FontAwesomeIcon icon={faClock} className="text-customgreen me-2" />
          {type}
        </span>
        <span className="text-truncate me-0">
          <FontAwesomeIcon icon={faMoneyBillAlt} className="text-customgreen me-2" />
          {salary}
        </span>
      </div>
    </Col>
    <Col sm={12} md={4} className="d-flex flex-column align-items-start align-items-md-end justify-content-center">
      <div className="d-flex mb-3">
        <Button variant="light" className="btn-square me-3" aria-label="Save job">
          <FontAwesomeIcon icon={faHeart} className="text-customgreen" />
        </Button>
        <Button className="!bg-customgreen text-white" style={{  border: "none" ,borderRadius:"none !important"}}variant="primary" aria-label="Apply for job">
          Apply Now
        </Button>
      </div>
      <small className="text-truncate">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-customgreen me-2" />
        Date Line: {deadline}
      </small>
    </Col>
  </Row>
);
// {job---ended}



const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setTestimonials(jobData.testimonial);
  }, []);

  return (
    <div className="container-xxl py-5 bg-colour ">
      <div className="container">
        <h1 className="text-center mb-5">Our Clients Say!!!</h1>
        <Carousel className="testimonial-carousel" indicators>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index} className="testimonial-item d-flex flex-column bg-light rounded p-4">
              <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
              <p className="">{testimonial.quote}</p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded"
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="ps-3">
                  <h5 className="mb-1">{testimonial.name}</h5>
                  <small>{testimonial.profession}</small>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};


// Footer---start


const Footer = () => {
  return (
        <div className="container-xxl  bg-dark text-white-50 footer  pt-5 ">

<Row className="g-5 ">
      {/* Company Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Company</h5>
        <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/about-us"> About Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/contact-us">Contact Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/our-services">Our Services</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/privacy-policy">Privacy Policy</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/terms">Terms & Condition</Button>
        </Col>
      </Row>
      </Col>
      
      {/* Quick Links Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Quick Links</h5>
        <Row>
        <Col>
          <Button variant="link" className="text-white-50 " href="/about-us">About Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/contact-us">Contact Us</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/our-services">Our Services</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/privacy-policy">Privacy Policy</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" className="text-white-50" href="/terms">Terms & Condition</Button>
        </Col>
      </Row>
      </Col>
      
      {/* Contact Section */}
      <Col lg={3} md={6}>
        <h5 className="text-white mb-4">Contact</h5>
        <p className="mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="me-3" />123 Street, New York, USA</p>
        <p className="mb-2"><FontAwesomeIcon icon={faPhoneAlt} className="me-3" />+012 345 67890</p>
        <p className="mb-2"><FontAwesomeIcon icon={faEnvelope} className="me-3" />info@example.com</p>
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
      <NavbarComponent />
      <CarouselFadeExample />
      <JobCategories />
      <AboutSection/>
      <JobsListing/>
      <TestimonialCarousel/>
      <Footer/>
    </>
  );
};

export default MainComponent;