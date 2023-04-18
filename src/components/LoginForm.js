import React from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"

export const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting form, just kidding not really')
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title><h2 className="text-center mb-4">Log In</h2></Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
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
