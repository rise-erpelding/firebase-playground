import React, { useRef } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";

export const LoginForm = ({ onLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = { email: emailRef.current.value, password: passwordRef.current.value };
    onLogin(loginInfo);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title><h2 className="text-center mb-4">Log In</h2></Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit" className="w-100">Log In</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <p>Need an account? Sign up (this will link to sign up component eventually)</p>
      </div>
    </>
  )
}
