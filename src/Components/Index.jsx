import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json'; // Ensure this is the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button } from 'react-bootstrap';

// Map images from the jobData JSON file
const imageMap = {
  "carousel_1": require('../Data/img/carousel-1.jpg'),
  "carousel_2": require('../Data/img/carousel-2.jpg'),
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
    <Container fluid className="container-xxl p-0">
{/* Navbar ----Start */}

    {/* <Navbar bg="white" expand="lg" className="shadow sticky-top p-0  w-100 align-items-center navbar-custom-padding"> */}
    <Navbar 
        bg="white" 
        expand="lg" 
        className="shadow sticky-top p-0 w-100 align-items-center navbar-custom navbar-custom-padding"
      >

      <Navbar.Brand as={Link} to="/index" className="d-flex align-items-center text-center py-0 px-lg-5 px-3">
        <h1 className="m-0 !text-customgreen font-inter font-40xl font-bold">
          {config.brand || "Brand Name"}
        </h1>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarScroll" className="me-6" />

      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto ms-auto p-4 p-lg-4 ">
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
              >
                {config.dropdown_1.items.map((item, index) => (
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
        {config.button && (
          <Dropdown
            show={showDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="d-none d-lg-block"
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
            <Dropdown.Menu>
              {config.sign_dropdown_button.map((btn, index) => (
                <Dropdown.Item key={index} as={Link} to={btn.to}>
                  {btn.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar>
    </Container>
  );
};
/*Navbar--Ended*/

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />
    </>
  );
};

export default MainComponent;
