import React, { useEffect, useState } from "react";
import { Button, Col, Container,  Table, Modal,Row,Card } from "react-bootstrap";
import { Navbar, Nav, Image,  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faUserPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt,faAngleDown } from '@fortawesome/free-solid-svg-icons'; // Ensure this import is present
import myImage from '../Data/img/com-logo-1.jpg'; // Adjust the path as necessary

const cardData = [
  {
    variant: 'Primary',
    title: 'Primary Card Title',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonVariant: 'danger',
  },
  {
    variant: 'Success',
    title: 'Success Card Title',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonVariant: 'primary',
  },
  {
    variant: 'Warning',
    title: 'Warning Card Title',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonVariant: 'success',
  },
  {
    variant: 'Info',
    title: 'Info Card Title',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonVariant: 'warning',
  },
];

const AdminPanel = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "Male",
    email: "",
    phoneno: "",
    city: "",
    avatar: null,
    password: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); // To hold user data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchText, setSearchText] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // For viewing user details
  const [viewUser, setViewUser] = useState(null); // To hold user details for viewing


  

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setIsEditing(false);
    setInitialData(null);
    setError(null); // Reset error state when switching tabs
    setIsExpanded(false); // Close menu on selection, if desired

  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatarPreview(URL.createObjectURL(file));
      setFileInputKey((prevKey) => prevKey + 1);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5500/api/users", {
        method: "POST",
        body: formDataToSubmit,
      });
      if (!response.ok) throw new Error("Failed to add user");
      const user = await response.json();
      console.log("User added:", user);
      // Reset form
      setFormData({
        fname: "",
        lname: "",
        dob: "",
        gender: "Male",
        email: "",
        phoneno: "",
        city: "",
        avatar: null,
        password: "",
        confirmPassword: "",
      });
      setAvatarPreview(null);
      setFileInputKey((prevKey) => prevKey + 1);
      setError(null); // Reset error state after successful submission
    } catch (error) {
      setError(error.message);
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5500/api/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        fname: initialData.fname,
        lname: initialData.lname,
        dob: initialData.dob,
        gender: initialData.gender,
        email: initialData.email,
        phoneno: initialData.phoneno,
        city: initialData.city,
        avatar: initialData.avatar,
        password: "",
        confirmPassword: "",
      });
      setAvatarPreview(initialData.avatar ? `http://localhost:5500/${initialData.avatar}` : null);
    }
  }, [initialData, isEditing]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    for (const userId of selectedUsers) {
      await onDeleteUser(userId);
    }
    setSelectedUsers([]);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const filterUsers = () => {
    let filteredUsers = [...users];

    // Text search filter
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    // Date range filter
    // if (startDate && endDate) {
    //   const start = new Date(startDate);
    //   const end = new Date(endDate);
    //   filteredUsers = filteredUsers.filter((user) => {
    //     const userDate = new Date(user.createdAt);
    //     return userDate >= start && userDate <= end;
    //   });
    // }

    // Sort filtered users by createdAt in descending order
    return filteredUsers.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const filteredAndSortedUsers = filterUsers();
  // const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const onDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5500/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log("User deleted:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewUser(null);
  };


  
  return (
    <Container fluid className="p-0">
    <Navbar bg="white" expand="lg" style={{ height: '60px' }} className="sticky shadow p-0 w-100">
    <Navbar.Brand >
        <h2 className="p-3" style={{ color: '#00B074', fontFamily: 'Inter, sans-serif'  ,fontSize:'32px', fontWeight:'bold'}}>Administration </h2>
        </Navbar.Brand>
      
        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
        <Nav.Link href="#profile" className="d-flex align-items-center">
            <Image
                src="https://www.ecomdeveloper.com/demo/image/cache/profile-45x45.png"
                roundedCircle
                width="30"
                alt="Demo User"
            />
            <span className="ms-2" style={{ color: '#00B074' }}>Demo User</span>
        </Nav.Link>
            <Nav.Link href="http://localhost:3000/login">
            <button className="me-2 pt-1 btn btn-success">
             <span className="d-none d-lg-inline">Logout</span>
            </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>

    <Row>  
    <Col md={2} className="bg-dark sidebar" style={{ height: "100vh" }}>
      <Button
        variant={activeButton === "dashboard" }
        onClick={() => handleButtonClick("dashboard")}
        className="p-2 text-white w-100"
        style={{
          backgroundColor: '#19222E',
          borderRadius: '0px',
          justifyContent: 'flex-start',
          textAlign: 'left'
        }}
      >
        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
        Dashboard
      </Button>

      
          
    {/* {activeButton === "dashboard" && <h3>Dashboard Content</h3>}
<>
      {[
        'Primary',          
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-4 mt-3"
        >
        <Card.Img variant="top" src={myImage} />
         <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>{variant} Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="danger">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </> */}


          <Col >
    <div className="sidenav-item w-100">
    <button
      className="sidenav-link ripple-surface-primary d-flex justify-content-start align-items-center"
      onClick={toggleExpand}
      style={{
        backgroundColor: '#19222E',
        color: 'white',
        width: '100%',
        cursor: 'pointer',
        padding: '0.75rem',
        borderRadius: '0px',
      }}
    >
      <FontAwesomeIcon icon={faUser} className="me-2" />
      User Management
      <FontAwesomeIcon
        icon={faAngleDown}
        className={`ml-auto rotate-icon ${isExpanded ? 'rotate-180' : ''}`}
        style={{
          transition: 'transform 0.3s',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      />
    </button>

      {isExpanded && (
        <ul className="sidenav-collapse" style={{ listStyleType: 'none', padding: 0, margin: '0.5rem 0' }}>
          <li className="sidenav-item">
            <button
              onClick={() => handleButtonClick("addUser")}
              className={`sidenav-link ripple-surface ${activeButton === "addUser" ? 'active' : ''}`}
              style={{
                backgroundColor: '#171b21',
                color: 'white',
                display: 'flex',
                // alignItems: 'center',
                padding: '0.5rem 1rem ',
                cursor: 'pointer',
                borderRadius: '0px',
                width: '100%',
                // textAlign: 'left' // Ensure text is left-aligned


              }}
            >
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Add User
            </button>
          </li>
          <li className="sidenav-item">
            <button
              onClick={() => handleButtonClick("manageUser")}
              className={`sidenav-link ripple-surface ${activeButton === "manageUser" ? 'active' : ''}`}
              style={{
                backgroundColor: '#171b21',
                color: 'white',
                display: 'flex',
                width: '100%',
                // alignItems: 'center',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                // borderRadius: '5px'
              }}
            >
              <FontAwesomeIcon icon={faUsersCog} className="me-2" />
              Manage Users
            </button>
          </li>
        </ul>
      )}
    </div>
</Col>
</Col>
 
        <Col md={6} className="dashboard-content">
        {/* Render Dashboard Content Conditionally */}
        {activeButton === "dashboard" && (
          <div className="mt-1 p-3 ">
            <h3>Dashboard Content</h3>
            <p>Here you can manage your tasks and view statistics.</p>
            {/* Grid for Cards */}
            <Row>
              {cardData.map((card) => (
                <Col md={3} key={card.variant} className="mb-5"> {/* Adjust the width as needed */}
                  <Card
                    bg={card.variant.toLowerCase()}
                    text={card.variant.toLowerCase() === 'light' ? 'dark' : 'white'} style={{ width: '10rem' }}
                    className="h-100" // Ensure cards take the full height of the column
                  >
                    <Card.Img variant="top" src={myImage} />
                    <Card.Header>{card.variant} Header</Card.Header>
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.text}</Card.Text>
                      <Button variant={card.buttonVariant}>Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
     

    
        
          {activeButton === "addUser" && (
            <form onSubmit={handleSubmit}>
              <h3>Add User</h3>
              {error && <p className="text-danger">{error}</p>}
              <div className="mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Avatar</label>
                <input
                  key={fileInputKey}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-control"
                />
                {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="mt-2" style={{ width: "100px", height: "100px" }} />}
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <Button type="submit" variant="primary">Add User</Button>
            </form>
          )}

          {activeButton === "manageUser" && (
            <>
              <h3>Manage Users</h3>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="form-control mb-2"
                />
                <Button variant="primary" onClick={handleSearch}>Search</Button>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedUsers.length === users.length}
                      />
                    </th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                        />
                      </td>
                      <td>
                        {user.avatar && <img src={`http://localhost:5500/${user.avatar}`} alt="User Avatar" style={{ width: "50px", height: "50px" }} />}
                      </td>
                      <td>{`${user.fname} ${user.lname}`}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button variant="info" onClick={() => handleViewUser(user)}>View</Button>
                        <Button variant="danger" onClick={() => onDeleteUser(user._id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="danger" onClick={handleDeleteSelected} disabled={selectedUsers.length === 0}>Delete Selected</Button>
            </>
          )}
        </Col>
        </Row>

      {/* Modal for viewing user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser && (
            <>
              <img src={`http://localhost:5500/${viewUser.avatar}`} alt="User Avatar" style={{ width: "100px", height: "100px" }} />
              <p><strong>First Name:</strong> {viewUser.fname}</p>
              <p><strong>Last Name:</strong> {viewUser.lname}</p>
              <p><strong>Date of Birth:</strong> {viewUser.dob}</p>
              <p><strong>Gender:</strong> {viewUser.gender}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Phone Number:</strong> {viewUser.phoneno}</p>
              <p><strong>City:</strong> {viewUser.city}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
