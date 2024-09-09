// import React, { useState } from 'react';
// import { Navbar, Nav, NavDropdown, Dropdown,Row, } from 'react-bootstrap';
// import { Link, useLocation } from 'react-router-dom';
// import jobData from '../Data/Jobdata.json';
// import Carousel from "react-bootstrap/Carousel";

// const NavbarComponent = () => {
//   const config = jobData.user[0];
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [dropdown_1, setDropdown_1] = useState(false);
//   const [dropdown_2, setDropdown_2] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path || (path === "/index" && location.pathname === "/");

//   if (!config) {
//     return null;
//   }

//   return (
//     <div className='container-xxl'>
//       <Navbar bg="white" variant="dark" expand="lg" className="sticky-top shadow mx-auto">
//         <Navbar.Brand as={Link} to="/index" className="text-white">
//           <h1 className="m-0 pl-10 !text-customgreen font-inter font-40xl font-bold">
//             {config.brand || "Brand Name"}
//           </h1>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="ms-auto py-0">
//             {/* Mapping Link 1 */}
//             {config.link_1 && config.link_1.map((link, index) => (
//               <Nav.Link
//                 key={index}
//                 as={Link}
//                 to={link.to}
//                 className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-bold hover:bg-white hover:!text-customgreen ${
//                   isActive(link.to) ? "active" : ""
//                 }`}
//               >
//                 {link.label}
//               </Nav.Link>
//             ))}

//             {/* Dropdown 1 - Jobs */}
//             {config.dropdown_1 && (
//               <NavDropdown
//                 onMouseEnter={() => setDropdown_1(true)}
//                 onMouseLeave={() => setDropdown_1(false)}
//                 show={dropdown_1}
//                 title={config.dropdown_1.title_1}
//                 id="navbarScrollingDropdown1"
//               >
//                 {config.dropdown_1.items && config.dropdown_1.items.map((item, index) => (
//                   <NavDropdown.Item
//                     key={index}
//                     as={Link}
//                     to={item.to}
//                     className={`font-hebbo font-15xl font-normal   ${
//                       isActive(item.to) ? "active" : ""
//                     }`}
//                   >
//                     {item.label}
//                   </NavDropdown.Item>
//                 ))}
//               </NavDropdown>
//             )}

//             {/* Dropdown 2 - Pages */}
//             {config.dropdown_2 && (
//               <NavDropdown
//                 onMouseEnter={() => setDropdown_2(true)}
//                 onMouseLeave={() => setDropdown_2(false)}
//                 show={dropdown_2}
//                 title={config.dropdown_2.title_2}
//                 id="navbarScrollingDropdown2"
//               >
//                 {config.dropdown_2.items && config.dropdown_2.items.map((item, index) => (
//                   <NavDropdown.Item
//                     key={index}
//                     as={Link}
//                     to={item.to}
//                     className={`font-hebbo font-15xl font-normal   ${
//                       isActive(item.to) ? "active" : ""
//                     }`}
//                   >
//                     {item.label}
//                   </NavDropdown.Item>
//                 ))}
//               </NavDropdown>
//             )}

//             {/* Mapping Link 2 */}
//             {config.link_2 && config.link_2.map((link, index) => (
//               <Nav.Link
//                 key={index}
//                 as={Link}
//                 to={link.to}
//                 className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-normal hover:bg-white hover:!text-customgreen ${
//                   isActive(link.to) ? "active" : ""
//                 }`}
//               >
//                 {link.label}
//               </Nav.Link>
//             ))}

//             {/* Single Button with Dropdown */}
//             {config.button && (
//               <Dropdown
//                 onMouseEnter={() => setShowDropdown(true)}
//                 onMouseLeave={() => setShowDropdown(false)}
//                 show={showDropdown}
//               >
//                 <Dropdown.Toggle
//                   as={Nav.Link}
//                   to={config.button.link}
//                   className="text-white uppercase ms-3 !bg-customgreen rounded-0 py-4 px-lg-5 d-lg-block font-inter font-40xl font-bold"
//                 >
//                   {config.button.label || "Post a Job"}{" "}
//                   <i className="bi bi-arrow-right font-hebbo font-15xl font-normal"></i>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   {config.sign_dropdown_button && config.sign_dropdown_button.map((btn, index) => (
//                     <Dropdown.Item key={index} as={Link} to={btn.to}>
//                       {btn.label}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// };
// const CarouselFadeExample = () => {
//   return (
//     <div>
//       <Carousel fade interval={5000} controls={true} indicators={false}>
//         {Object.keys(carousel).map((key) => {
//           const item = carousel[key];
//           return (
//             <Carousel.Item key={key}>
//               <img src={item.image} alt={`Slide ${key}`} />
//               <div
//                 className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
//                 style={{ background: "rgba(24, 29, 56, .7)" }}
//               >
//                 <container>
//                   <Row>
//                   {item.icon}
//                   <h3 className="uppercase display-2 text-white">{item.heading}</h3>
//                   <button className="btn btn-primary mt-3">{item.caption}</button>
//                   </Row>
//                 </container>
//               </div>
//             </Carousel.Item>
//           );
//         })}
//       </Carousel>
//       <div className="nextprev">
//         <button
//           className="prev prev-white border"
//           type="button"
//           data-bs-target="#carouselFadeExample"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             style={{ width: "22px", height: "22px" }}
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="next next-white border"
//           type="button"
//           data-bs-target="#carouselFadeExample"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             style={{ width: "22px", height: "22px" }}
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };


// export default NavbarComponent;
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json'; // Ensure this is the correct path
import Carousel from "react-bootstrap/Carousel";
import carousel_1 from '../Data/img/carousel-1.jpg';
import carousel_2 from '../Data/img/carousel-2.jpg';
// import jobData from '../Data/Jobdata.json'; // Ensure this is the correct path
// import carousel_1 from '../Data/img/carousel-1.jpg';
// import carousel_2 from '../Data/img/carousel-2.jpg';

const NavbarComponent = () => {
  const config = jobData.user[0];
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdown_1, setDropdown_1] = useState(false);
  const [dropdown_2, setDropdown_2] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || (path === "/index" && location.pathname === "/");

  if (!config) {
    return null;
  }

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
            {/* Mapping Link 1 */}
            {config.link_1 && config.link_1.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-bold hover:bg-white hover:!text-customgreen ${
                  isActive(link.to) ? "active" : ""
                }`}
              >
                {link.label}
              </Nav.Link>
            ))}

            {/* Dropdown 1 - Jobs */}
            {config.dropdown_1 && (
              <NavDropdown
                onMouseEnter={() => setDropdown_1(true)}
                onMouseLeave={() => setDropdown_1(false)}
                show={dropdown_1}
                title={config.dropdown_1.title_1}
                id="navbarScrollingDropdown1"
              >
                {config.dropdown_1.items && config.dropdown_1.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal   ${
                      isActive(item.to) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {/* Dropdown 2 - Pages */}
            {config.dropdown_2 && (
              <NavDropdown
                onMouseEnter={() => setDropdown_2(true)}
                onMouseLeave={() => setDropdown_2(false)}
                show={dropdown_2}
                title={config.dropdown_2.title_2}
                id="navbarScrollingDropdown2"
              >
                {config.dropdown_2.items && config.dropdown_2.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal   ${
                      isActive(item.to) ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {/* Mapping Link 2 */}
            {config.link_2 && config.link_2.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.to}
                className={`nav-item nav-link !text-customblack font-hebbo font-15xl font-normal hover:bg-white hover:!text-customgreen ${
                  isActive(link.to) ? "active" : ""
                }`}
              >
                {link.label}
              </Nav.Link>
            ))}

            {/* Single Button with Dropdown */}
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
                  {config.button.label || "Post a Job"}{" "}
                  <i className="bi bi-arrow-right font-hebbo font-15xl font-normal"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {config.sign_dropdown_button && config.sign_dropdown_button.map((btn, index) => (
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
    </div>  );
};

const imageMap = {
  "carousel_1": carousel_1,
  "carousel_2": carousel_2
};

const CarouselFadeExample = () => {
  const carouselData = jobData.carousel;

  return (
    <div className='container-xxl'>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carouselData).map((key) => {
          const item = carouselData[key];
          return (
            <Carousel.Item key={key}>
              {/* Use the mapped images */}
              <img src={imageMap[item.image]} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <div className="container">
                  <Row>
                    <h3 className="uppercase display-2 text-white">{item.heading}</h3>
                    <div className="mt-3">
                      {/* Map over buttons array */}
                      {item.buttons && item.buttons.map((btn, index) => (
                        <a key={index} href={btn.link} className={`btn ${index === 0 ? 'btn-primary' : 'btn-secondary'} me-3`}>
                          {btn.label}
                        </a>
                      ))}
                    </div>
                  </Row>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
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
