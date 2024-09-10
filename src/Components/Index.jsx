import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json'; // Ensure this is the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Dropdown, Container, Button } from 'react-bootstrap';
import '../App.css'; // Ensure the path to your CSS file is correct


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
      {/* Full-screen container */}
      <Navbar bg="white" expand="lg" className="shadow sticky-top p-0 w-100 navbar-padding">
        {/* Brand Section */}
        <Navbar.Brand as={Link} to="/index" className="d-flex align-items-center text-center py-0 px-lg-5 px-3">
          <h1 className="m-0 !text-customgreen font-inter font-40xl font-bold">
            {config.brand || "Brand Name"}
          </h1>
        </Navbar.Brand>

        {/* Navbar Toggle for smaller screens */}
        <Navbar.Toggle aria-controls="navbarScroll" className="me-6" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Primary Links */}
            {config.link_1 && config.link_1.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item !text-customblack font-hebbo font-15xl font-bold hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
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
                    className={`font-hebbo font-15xl ${isActive(item.to) ? "active" : ""}`}
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
                    className={`font-hebbo font-15xl ${isActive(item.to) ? "active" : ""}`}
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
                className={`nav-item !text-customblack font-hebbo font-15xl hover:bg-white hover:!text-customgreen ${isActive(link.to) ? "active" : ""}`}
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
              className="text-white !bg-customgreen rounded-0 py-4 px-lg-5 font-inter font-40xl font-bold custom-button custom-dropdown-toggle"
              style={{ height: "auto" }}
            >
              {config.button.label || "Post a Job"}
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
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

const MainComponent = () => {
  return (
    <>
      <NavbarComponent />
      {/* Additional components can be added here */}
    </>
  );
};

export default MainComponent;
