import React, { useEffect, useState, } from "react";
import { Button, Col, Container,  Table, Modal,Row,Card } from "react-bootstrap";
import { Navbar, Nav, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faUserPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt,faAngleDown } from '@fortawesome/free-solid-svg-icons'; // Ensure this import is present
import myImage from '../Data/img/com-logo-1.jpg'; // Adjust the path as necessary
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
  const [isExpandedUserManagement, setIsExpandedUserManagement] = useState(false);
  const [isExpandedMessage, setIsExpandedMessage] = useState(false);

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
    setIsExpandedUserManagement(false); // Close menu on selection, if desired

  };
 



  const toggleExpandUserManagement = () => {
    setIsExpandedUserManagement((prevState) => !prevState);
  };

  const toggleExpandMessage = () => {
    setIsExpandedMessage((prevState) => !prevState);
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
  
  const [viewedMessage, setViewedMessage] = useState(null); // State to view selected message
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

 

  // Define the handleMarkAsRead function
  const handleMarkAsRead = (id) => {
    console.log(`Message with ID ${id} marked as read`);
    // Implement your logic for marking the message as read
  };

  // Define the handleDeleteMessage function
  const handleDeleteMessage = (id) => {
    console.log(`Message with ID ${id} deleted`);
    // Implement your logic for deleting the message
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewUser(null);
  };

  // Example fetch function to simulate retrieving messages
  useEffect(() => {
    // Fetch messages (replace with your actual API request)
    const fetchMessages = async () => {
      // For this example, we'll use static data
      

      
    };

    fetchMessages();
  }, []);

  
  
  // Handle closing the modal
  const handleClose = () => {
    setViewedMessage(null);
  };

 // Fetch form data when the component mounts
 useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/messages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data); // Store the fetched messages in state
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  fetchMessages();
}, []);
const [messages, setMessages] = useState([
  { name: 'John Doe', email: 'john@example.com', subject: 'Inquiry', message: 'Hello, I need more information about your services.' },
  { name: 'Jane Smith', email: 'jane@example.com', subject: 'Support', message: 'I have an issue with my account.' },
]);
const [newMessage, setNewMessage] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewMessage((prevMessage) => ({
    ...prevMessage,
    [name]: value,
  }));
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

    <Row >
  {/* Sidebar Column */}
  <Col md={2} className=" sidebar" style={{ height: '130vh',  backgroundColor: '#19222E',
 }}>
    <Button
      variant={activeButton === "dashboard" }
      onClick={() => handleButtonClick("dashboard")}
      className="text-white"
      style={{
        backgroundColor: '#19222E',
        borderRadius: '0px',
        justifyContent: 'flex-start',
        textAlign: 'left',
        width: '100%'
      }}
    >
      <FontAwesomeIcon icon={faTachometerAlt} className="me-4" />
      Dashboard
    </Button>

    {/* User Management Section */}
    <div className="sidenav-item w-100">
      <button
        className="sidenav-link ripple-surface-primary d-flex justify-content-start align-items-center"
        onClick={toggleExpandUserManagement}
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
          className={`ml-auto rotate-icon ${isExpandedUserManagement ? 'rotate-180' : ''}`}
          style={{
            transition: 'transform 0.3s',
            transform: isExpandedUserManagement ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isExpandedUserManagement && (
        <ul className="sidenav-collapse" style={{ listStyleType: 'none', padding: 0, margin: '0.5rem 0' }}>
          <li className="sidenav-item">
            <button
              onClick={() => handleButtonClick("addUser")}
              className={`sidenav-link ripple-surface ${activeButton === "addUser" ? 'active' : ''}`}
              style={{
                backgroundColor: '#171b21',
                color: 'white',
                display: 'flex',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                borderRadius: '0px',
                width: '100%',
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
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <FontAwesomeIcon icon={faUsersCog} className="me-2" />
              Manage Users
            </button>
          </li>
        </ul>
      )}
    </div>

    {/* Message Section */}
    <div className="sidenav-item w-100">
      <button
        className="sidenav-link ripple-surface-primary d-flex justify-content-start align-items-center"
        onClick={toggleExpandMessage}
        style={{
          backgroundColor: '#19222E',
          color: 'white',
          width: '100%',
          cursor: 'pointer',
          padding: '0.75rem',
          borderRadius: '0px',
        }}
      >
        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
        Message
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`ml-auto rotate-icon ${isExpandedMessage ? 'rotate-180' : ''}`}
          style={{
            transition: 'transform 0.3s',
            transform: isExpandedMessage ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isExpandedMessage && (
        <ul className="sidenav-collapse" style={{ listStyleType: 'none', padding: 0, margin: '0.5rem 0' }}>
          <li className="sidenav-item">
            <button
              onClick={() => handleButtonClick("manageMessage")}
              className={`sidenav-link ripple-surface ${activeButton === "manageMessage" ? 'active' : ''}`}
              style={{
                backgroundColor: '#171b21',
                color: 'white',
                display: 'flex',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <FontAwesomeIcon icon={faUsersCog} className="me-2" />
              Manage Message
            </button>
          </li>
        </ul>
      )}
    </div>
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
     

    {/* add user content */}
        
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
          
          {/* manage user content */}

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
         

         {/* manage message content */}

{activeButton === "manageMessage" && (
  <>
    <div>
      <h2>Admin Panel</h2>
      <h3>Form Submissions</h3>

      {/* Message Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={newMessage.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={newMessage.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            name="subject"
            value={newMessage.subject}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            name="message"
            value={newMessage.message}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Message
        </Button>
      </Form>

      {/* Messages Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.subject}</td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
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
      
      <Col>
       {/* Modal for viewing message details */}
       <Modal show={viewedMessage !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewedMessage && (
            <div>
              <p>
                <strong>Name:</strong> {viewedMessage.name}
              </p>
              <p>
                <strong>Email:</strong> {viewedMessage.email}
              </p>
              <p>
                <strong>Subject:</strong> {viewedMessage.subject}
              </p>
              <p>
                <strong>Message:</strong> {viewedMessage.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(viewedMessage.date).toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     
     {/* Modal for managing message details */}
<Modal show={viewedMessage !== null} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Manage Message</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {viewedMessage && (
      <div>
        <p><strong>Name:</strong> {viewedMessage.name}</p>
        <p><strong>Email:</strong> {viewedMessage.email}</p>
        <p><strong>Subject:</strong> {viewedMessage.subject}</p>
        <p><strong>Message:</strong> {viewedMessage.message}</p>
        <p><strong>Date:</strong> {new Date(viewedMessage.date).toLocaleString()}</p>
      </div>
    )}
    {/* You can add form or actions here for managing the message, e.g., mark as read, delete, etc. */}
    <div>
      <Button variant="primary" onClick={() => handleMarkAsRead(viewedMessage.id)}>Mark as Read</Button>
      <Button variant="danger" onClick={() => handleDeleteMessage(viewedMessage.id)}>Delete</Button>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
  </Modal.Footer>
</Modal>

      </Col>
    </Container>

  );
};


export default AdminPanel;
