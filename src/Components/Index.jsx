import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button ,Carousel,  Row, Col , Form, } from 'react-bootstrap';
import { faMailBulk, faHeadset, faUserTie, faTasks, faChartLine, faHandsHelping, faBookReader, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';



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
    <Container fluid className="container-xxl p-0">
    {/* <Navbar bg="white" expand="lg" className="shadow sticky-top p-0  w-100 align-items-center navbar-custom-padding"> */}
    <Navbar 
        bg="white" 
        expand="lg" 
        className="sticky-top shadow  p-0 w-100 align-items-center navbar-custom navbar-custom-padding"
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
    <Container className="container-xxl p-0 header-carousel">
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
                  <Container className='container-xxl p-5 p-0'>
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
 


{/* /* carousel start */}


{/* Search Bar after Carousel */}
       
     <Container className='container p-4  bg-customgreen'>
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
    <Container fluid className=" container-xxl py-5 shadow">
      <Container>
        <h1 className="text-center mb-5">Explore By Category</h1>
        <Row className="g-4">
          {categories.map((category, index) => (
            <Col lg={3} sm={6} key={index} className="wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
              <div className="cat-item rounded shadow p-4">
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

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />
      <CarouselFadeExample />
      <JobCategories />
    </>
  );
};

export default MainComponent;