import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { FaArrowRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const MyComponent = () => {
  return (
    <div className="container-xxl bg-white p-0">
      {/* Spinner Start */}
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {/* Spinner End */}

      {/* Navbar Start */}
      <Navbar bg="white" expand="lg" className="shadow sticky-top p-0">
        <Container>
          <Navbar.Brand href="index.html" className="d-flex align-items-center text-center py-0 px-4 px-lg-5">
            <h1 className="m-0 text-primary">JobEntry</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="ms-auto p-4 p-lg-0">
              <Nav.Link href="index.html">Home</Nav.Link>
              <Nav.Link href="about.html" className="active">About</Nav.Link>
              <NavDropdown title="Jobs" id="jobs-dropdown">
                <NavDropdown.Item href="job-list.html">Job List</NavDropdown.Item>
                <NavDropdown.Item href="job-detail.html">Job Detail</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pages" id="pages-dropdown">
                <NavDropdown.Item href="category.html">Job Category</NavDropdown.Item>
                <NavDropdown.Item href="testimonial.html">Testimonial</NavDropdown.Item>
                <NavDropdown.Item href="404.html">404</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="contact.html">Contact</Nav.Link>
            </Nav>
            <Button variant="primary" className="rounded-0 py-4 px-lg-5 d-none d-lg-block">
              Post A Job <FaArrowRight className="ms-3" />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Navbar End */}

      {/* Header End */}
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <Container className="my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item"><button href="#">Home</button></li>
              <li className="breadcrumb-item"><button href="#">Pages</button></li>
              <li className="breadcrumb-item text-white active" aria-current="page">About</li>
            </ol>
          </nav>
        </Container>
      </div>
      {/* Header End */}

      {/* About Start */}
      <Container className="py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="row g-0 about-bg rounded overflow-hidden">
              <div className="col-6 text-start">
                <img className="img-fluid w-100" src="img/about-1.jpg" alt="About" />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid" src="img/about-2.jpg" style={{ width: '85%', marginTop: '15%' }} alt="About" />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid" src="img/about-3.jpg" style={{ width: '85%' }} alt="About" />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid w-100" src="img/about-4.jpg" alt="About" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">We Help To Get The Best Job And Find A Talent</h1>
            <p className="mb-4">Tempor erat elitr rebum at clita...</p>
            <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
            <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
            <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
            <Button variant="primary" className="py-3 px-5 mt-3">Read More</Button>
          </div>
        </div>
      </Container>
      {/* About End */}

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <Container className="py-5">
          <div className="row g-5">
            {/* Footer sections here */}
          </div>
        </Container>
        <Container>
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <button className="border-bottom" href="#">Your Site Name</button>, All Right Reserved. 
              Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <button>Home</button> 
                <button>Cookies</button>
                <button>Help</button>
                <button>FAQs</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* Footer End */}

      {/* Back to Top */}
      <button className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></button>
    </div>
  );
};

export default MyComponent;
