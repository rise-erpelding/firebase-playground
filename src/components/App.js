import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { LoginForm } from './LoginForm';
import { InlineButton } from './InlineButton';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogin = (loginInfo) => {
    const { email, password } = loginInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setUserName(user.email);
        console.log(`you are logged in as ${user.email}`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
      })
  };

  const handleLogButtonClick = () => {
    console.log('handling button click');
  }

  const loginStatusMessage = `LOGIN STATUS: You are currently ${!isLoggedIn ? 'not' : ''} logged in ${isLoggedIn ? `as ${userName}` : ''}. `;
  // const logButton = isLoggedIn ? <InlineButton buttonText="Log out?" /> : <InlineButton buttonText="Log in?" />

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <div className="w-100 text-center text-info">
        <p>
          {loginStatusMessage}
          <InlineButton buttonText={isLoggedIn ? "Log out?" : "Log in?"} handleClick={handleLogButtonClick} />
        </p>
      </div>
        {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
      </div>
    </Container>
  );
}

export default App;
