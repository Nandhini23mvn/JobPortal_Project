

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Card 
      className="p-4 w-100" 
      style={{ 
        maxWidth: '350px', 
        borderRadius: '8px', 
        border: '1px solid #ddd', 
        boxShadow: '0 0 10px rgba(0,0,0,0.1)' 
      }}
    >
      <Card.Body>
        <Card.Title className="mb-4" style={{ color: '#007bff' }}>Sign In</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: '#007bff' }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderColor: '#007bff' }}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
          >
            Sign In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignInPage;
