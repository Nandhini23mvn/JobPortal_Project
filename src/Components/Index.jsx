import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json'; // Make sure the JSON file is in the correct path
import Carousel from "react-bootstrap/Carousel";
import carousel_1 from '../Data/img/carousel-1.jpg';
import carousel_2 from '../Data/img/carousel-2.jpg';

// Map images from the jobData JSON file
const imageMap = {
  "carousel_1": carousel_1,
  "carousel_2": carousel_2,
};

const NavbarComponent = () => {
  const config = jobData.user[0];
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdown_1, setDropdown_1] = useState(false);
  const [dropdown_2, setDropdown_2] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || (path === "/index" && location.pathname === "/");

  if (!config) return null;

  return (
    <div className='container-xxl'>
      <Navbar bg="white" variant="dark" expand="lg" className="sticky-top shadow mx-auto">
        <Navbar.Brand as={Link} to="/index" className="text-white">
          <h1 className="m-0 pl-10 !text-customgreen font-inter font-40xl font-bold">
            {config.brand || "Brand Name"}
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto py-0">
            {config.link_1.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-bold hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
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
              >
                {config.dropdown_1.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal ${isActive(item.to) ? "active" : ""}`}
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
              >
                {config.dropdown_2.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal ${isActive(item.to) ? "active" : ""}`}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {config.link_2.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-normal hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Nav.Link>
            ))}

            {/* Button with Dropdown */}
            {config.button && (
              <Dropdown
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                show={showDropdown}
              >
                <Dropdown.Toggle
                  as={Nav.Link}
                  to={config.button.link}
                  className="text-white uppercase ms-3 !bg-customgreen rounded-0 py-4 px-lg-5 d-lg-block font-inter font-40xl font-bold"
                >
                  {config.button.label || "Post a Job"}
                  <i className="bi bi-arrow-right font-hebbo font-15xl font-normal"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {config.sign_dropdown_button.map((btn, index) => (
                    <Dropdown.Item key={index} as={Link} to={btn.to}>
                      {btn.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
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
    <div className='container-xxl'>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carouselData).map((key) => {
          const item = carouselData[key];
          return (
            <Carousel.Item key={key}>
              <img src={imageMap[item.image]} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <Container>
                  <Row className="justify-content-start">
                    <Col xs={10} lg={8}>
                      <h1 className="display-3 text-white animated slideInDown mb-4">
                        {item.heading}
                      </h1>
                      <div className="mt-3">
                        {item.buttons.map((btn, index) => (
                          <a
                            key={index}
                            href={btn.link}
                            className={`btn ${index === 0 ? 'btn-primary' : 'btn-secondary'} py-md-3 px-md-5 me-3 animated ${index === 0 ? 'slideInLeft' : 'slideInRight'}`}
                          >
                            {btn.label}
                          </a>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>

      {/* Search Bar after Carousel */}
      <Container className='container-xxl p-4 bg-customgreen'>
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
    </div>
  );
};

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />
      <CarouselFadeExample />
    </>
  );
};

export default MainComponent;
