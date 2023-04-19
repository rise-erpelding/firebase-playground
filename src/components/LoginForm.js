import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from "react-bootstrap";
import { InlineButton } from './InlineButton';

export const LoginForm = ({ onLogin, onCreateAccount }) => {
  const [needsNewAccount, setNeedsNewAccount] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginInfo = { email: emailRef.current.value, password: passwordRef.current.value };
    onLogin(loginInfo);
  };

  const handleCreateNewAccount = (e) => {
    e.preventDefault();
    const newAccountInfo = { email: emailRef.current.value, password: passwordRef.current.value };
    onCreateAccount(newAccountInfo);
  }

  const handleNewAccountForm = () => {
    setNeedsNewAccount(true);
  };

  const checkPasswords = (e) => {
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      return setDoPasswordsMatch(true);
    }
    return setDoPasswordsMatch(false);
  };

  const loginCardBody = (
    <Card.Body>
      <Card.Title><h2 className="text-center mb-4">Log In</h2></Card.Title>
      <Form onSubmit={handleLogin}>
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
  );

  const newAccountCardBody = (
    <Card.Body>
      <Card.Title><h2 className="text-center mb-4">Create an account</h2></Card.Title>
      <Form onSubmit={handleCreateNewAccount}>
        <Form.Group id="email" className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} onChange={checkPasswords} required />
        </Form.Group>
        <Form.Group id="confirm-password" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" ref={confirmPasswordRef} onChange={checkPasswords} required />
        </Form.Group>
        {doPasswordsMatch ? <p className="text-success">Passwords are a match!</p> : <p className="text-danger">Passwords do not match</p>}
        <Button type="submit" className="w-100" disabled={!doPasswordsMatch}>Create an account</Button>
      </Form>
    </Card.Body>
  );

  return (
    <>
      <Card>
        {needsNewAccount ? newAccountCardBody : loginCardBody}
      </Card>
      <div className="w-100 text-center mt-2">
        <p><InlineButton buttonText="Need to create an account?" handleClick={handleNewAccountForm} /></p>
      </div>
    </>
  )
}
