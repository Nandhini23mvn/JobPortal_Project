

import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { navbar } from './assets/navbar'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
  const config = navbar[0]; // Since your array has one item, we take the first one

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top shadow-sm">
      <Navbar.Brand as={Link} to="/index" className="text-white">
        <h1 className="m-0 text-2xl font-bold">
          <FontAwesomeIcon icon={faBuilding} className="text-primary me-2" />
          {config.brand}
        </h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto py-0">
          {config.links.map((link, index) => (
            <Nav.Link key={index} as={Link} to={link.to} className="nav-item nav-link">
              {link.label}
            </Nav.Link>
          ))}

          <NavDropdown title={config.dropdown.title} id="navbarScrollingDropdown">
            {config.dropdown.items.map((item, index) => (
              <NavDropdown.Item key={index} as={Link} to={item.to}>
                {item.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link as={Link} to={config.button.link} className="bg-primary text-white px-5 ms-3 d-none d-lg-block">
            {config.button.label} <i className="bi bi-arrow-right"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
