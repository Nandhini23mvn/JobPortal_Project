import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here, such as sending data to an API
  };

  return (
    <Container className="container-custom">
      <Row className="form-container">
        <Col md={6} className="mx-auto d-flex flex-column justify-content-center">
          <h1 className="headertitle text-center">Login to Furni.</h1>
          <p className="text-muted text-center">If you have an account, please login</p>

          <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                {...register('email', { required: 'Email is required' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is required' })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="forgot-password-link text-end mt-2">
              <a href="#" className="text-muted">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="submit-button w-100 mt-4"
              variant="primary"
            >
              Log In
            </Button>
          </Form>

          <div className="or-divider text-center my-4">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <div className="sign-up-button text-center">
            <p className="mb-0 text-muted">If you don't have an account...</p>
            <Button
              variant="link"
              onClick={() => navigate('/Signup')}
            >
              Sign up
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
