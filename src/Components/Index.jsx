// import React, { useState } from 'react';
// import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import jobData from '../Data/Jobdata.json'; 

// const NavbarComponent = () => {
//   const config = jobData.user[0]; 
//   const [showDropdown, setShowDropdown] = useState(false);

//   if (!config) {
//     return null; 
//   }

//   return (
//     <div className='container-xxl'>
//       <Navbar bg="white" variant="dark" expand="lg" className="sticky-top shadow mx-auto ">
//         <Navbar.Brand as={Link} to="/index" className="text-white">
//           <h1 className="m-0 pl-10 !text-customgreen font-inter font-40xl font-bold ">
            
//             {config.brand || "Brand Name"}
//           </h1>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="ms-auto py-0 ">
//             {/* Mapping Link 1 */}
//             {config.link_1 && config.link_1.map((link, index) => (
//               <Nav.Link key={index} as={Link} to={link.to} className="nav-item nav-link !text-customblack font-hebbo font-15xl font-bold hover:bg-white hover:!text-customgreen">
//                 {link.label}
//               </Nav.Link>
//             ))}

//             {/* Dropdown 1 - Jobs */}
//             {config.dropdown_1 && (
//               <NavDropdown title={config.dropdown_1.title_1} id="navbarScrollingDropdown1">
                
//                 {config.dropdown_1.items && config.dropdown_1.items.map((item, index) => (
//                   <NavDropdown.Item key={index} as={Link} to={item.to} className=" font-hebbo font-15xl font-normal hover:!bg-customgreen">
//                     {item.label}
//                   </NavDropdown.Item>
//                 ))}
//               </NavDropdown>
//             )}

//             {/* Dropdown 2 - Pages */}
//             {config.dropdown_2 && (
//               <NavDropdown title={config.dropdown_2.title_2} id="navbarScrollingDropdown2">
//                 {config.dropdown_2.items && config.dropdown_2.items.map((item, index) => (
//                   <NavDropdown.Item key={index} as={Link} to={item.to} className='font-hebbo font-15xl font-normal'>
//                     {item.label}
//                   </NavDropdown.Item>
//                 ))}
//               </NavDropdown>
//             )}

//             {/* Mapping Link 2 */}
//             {config.link_2 && config.link_2.map((link, index) => (
//               <Nav.Link key={index} as={Link} to={link.to} className="nav-item nav-link !text-customblack font-hebbo font-15xl font-normal hover:bg-white hover:!text-customgreen">
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
//                   {config.button.label || "Post a Job"} <i className="bi bi-arrow-right font-hebbo font-15xl font-normal"></i>
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

// export default NavbarComponent;
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import jobData from '../Data/Jobdata.json';

const NavbarComponent = () => {
  const config = jobData.user[0];
  const [showDropdown, setShowDropdown] = useState(true);
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
              <NavDropdown title={config.dropdown_1.title_1} id="navbarScrollingDropdown1">
                {config.dropdown_1.items && config.dropdown_1.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal hover:!bg-customgreen hover:!text-white  ${
                      isActive(item.to) ? "active" : ""
                    }`}>
                   
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
           
            {/* Dropdown 2 - Pages */}
            {config.dropdown_2 && (
              <NavDropdown title={config.dropdown_2.title_2} id="navbarScrollingDropdown2">
                {config.dropdown_2.items && config.dropdown_2.items.map((item, index) => (
                  <NavDropdown.Item
                    key={index}
                    as={Link}
                    to={item.to}
                    className={`font-hebbo font-15xl font-normal hover:!bg-customgreen hover:!text-white${
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
                  {config.button.label || "Post a Job"} <i className="bi bi-arrow-right font-hebbo font-15xl font-normal"></i>
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
    </div>
  );
};

export default NavbarComponent;
