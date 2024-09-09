// import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import data from '../Data/Jobdata.json';

// const AppNavbar = () => {
//   const { link_1, dropdown_1, dropdown_2, link_2, button, sign_dropdown_button } = data.user[0];

//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href={link_1[0].to}>{data.user[0].brand}</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           {link_1.map((link, index) => (
//             <Nav.Link key={index} href={link.to}>{link.label}</Nav.Link>
//           ))}
//           <NavDropdown title={dropdown_1.title_1} id="basic-nav-dropdown">
//             {dropdown_1.items.map((item, index) => (
//               <NavDropdown.Item key={index} href={item.to}>{item.label}</NavDropdown.Item>
//             ))}
//           </NavDropdown>
//           <NavDropdown title={dropdown_2.title_2} id="basic-nav-dropdown">
//             {dropdown_2.items.map((item, index) => (
//               <NavDropdown.Item key={index} href={item.to}>{item.label}</NavDropdown.Item>
//             ))}
//           </NavDropdown>
//           {link_2.map((link, index) => (
//             <Nav.Link key={index} href={link.to}>{link.label}</Nav.Link>
//           ))}
//         </Nav>
//         <Nav>
//           <Nav.Link href={button.link} className="btn btn-primary">{button.label}</Nav.Link>
//           <NavDropdown title="Sign In" id="basic-nav-dropdown">
//             {sign_dropdown_button.map((item, index) => (
//               <NavDropdown.Item key={index} href={item.to}>{item.label}</NavDropdown.Item>
//             ))}
//           </NavDropdown>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default AppNavbar;
