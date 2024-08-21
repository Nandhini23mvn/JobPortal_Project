import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <div className='container-xxl'>
    <Navbar bg="white" expand="lg" className="border-b border ">
      <Container  >
        <Navbar.Brand href="#home" className="!text-customgreen">JobEntry</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="!text-customgreen hover:text-green-700">HOME</Nav.Link>
            <Nav.Link href="#about" className="text-green-500 hover:text-green-700">ABOUT</Nav.Link>
            <NavDropdown title="JOBS" id="basic-nav-dropdown" className="text-green-500">
              <NavDropdown.Item href="#job-list" className="text-green-500 hover:text-green-700">Job List</NavDropdown.Item>
              <NavDropdown.Item href="#job-detail" className="text-green-500 hover:text-green-700">Job Detail</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="PAGES" id="basic-nav-dropdown" className="text-green-500">
              <NavDropdown.Item href="#job-category" className="text-green-500 hover:text-green-700">Job Category</NavDropdown.Item>
              <NavDropdown.Item href="#testimonial" className="text-green-500 hover:text-green-700">Testimonial</NavDropdown.Item>
              <NavDropdown.Item href="#404" className="text-green-500 hover:text-green-700">404</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#contact" className="text-green-500 hover:text-green-700">CONTACT</Nav.Link>
          </Nav>
          <Button variant="outline-success" className="ms-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white">
            Post a Job
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  );
};

export default NavigationBar;
