import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table, Modal } from "react-bootstrap";
import { Navbar, Nav, NavDropdown, Image,  } from 'react-bootstrap';
import { FaBars, FaCaretDown, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const AdminPanel = () => {
  const [activeButton, setActiveButton] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState(null);
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
    <Container fluid>
      <Navbar bg="white" expand="lg" style={{ height: '60px' }} className="container-fluid px-1">
      <Container fluid>
        <Navbar.Brand >
         <h2>AdminPanel</h2>
        </Navbar.Brand>
      
        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <span>
                  <Image
                    src="https://www.ecomdeveloper.com/demo/image/cache/profile-45x45.png"
                    roundedCircle
                    width="30"
                    alt="Demo User"
                  />
                  Demo User 
                </span>
              }
              id="user-dropdown"
              align="end"
            >
              
              
            </NavDropdown>
            
            <Nav.Link href="http://localhost:3000/login">
              <FaSignOutAlt className="me-1" /> <span className="d-none d-lg-inline">Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Row>
        <Col md={2} className="bg-dark sidebar " style={{ height: "100vh" }}>
        
        <Button
            variant={activeButton === "dashboard" ? "primary" : "secondary"}
            onClick={() => handleButtonClick("dashboard")}
            className="w-100 mb-3"
          >
            Dashboard
          </Button>
          <Button
            variant={activeButton === "addUser" ? "primary" : "secondary"}
            onClick={() => handleButtonClick("addUser")}
            className="w-100 mb-2"
          >
            Add User
          </Button>
          <Button
            variant={activeButton === "manageUser" ? "primary" : "secondary"}
            onClick={() => handleButtonClick("manageUser")}
            className="w-100"
          >
            Manage Users
          </Button>
        </Col>

        <Col md={9}>
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
