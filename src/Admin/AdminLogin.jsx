

import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Authentication logic
    if (username === 'Admin' && password === 'Nani1997') {
      navigate('/admin'); // Redirect to admin panel if credentials are correct
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container 
      fluid 
      className="min-vh-100 d-flex align-items-center justify-content-center bg-cover bg-center bg-registerbg"
      style={{ backgroundColor: '#7efcd1' }}
    >
      <div className="bg-white bg-opacity-30 p-7 rounded-lg shadow-lg backdrop-blur-md" style={{ width: '500px' }}>
        <h2 className="text-center p-4 mb-6 text-2xl font-semibold" style={{ color: '#28a745' }}>
          Admin Login
        </h2>
        
        {error && (
          <div className="text-center text-danger mb-3">
            {error}
          </div>
        )}

        <Form onSubmit={handleLogin}>
          <Row className="mb-3 px-5">
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={{ width: '400px' }}
                className="mx-auto" // Centers the input field horizontally
              />
            </Form.Group>
          </Row>
          
          <Form.Group className="mb-3 px-5">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '400px' }} 
              className="mx-auto" // Centers the input field horizontally
            />
          </Form.Group>

          <div className="text-center">
            <Button 
              type="submit" 
              className="border-0 mb-5 mt-5 text-white" 
              style={{ backgroundColor: '#28a745', color: '#fff', width: '400px' }}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;