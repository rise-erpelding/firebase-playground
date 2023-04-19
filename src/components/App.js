import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { LoginForm } from './LoginForm';
import { InlineButton } from './InlineButton';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
        // pls note this is the wrong way to get the user, you should use onAuthStateChanged or auth.currentUser but... we're trying to get it done right now
        setUserName(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
      })
  };

  const createNewAccount = (accountInfo) => {
    const { email, password } = accountInfo;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        setUserName(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
      })
  }

  const handleLogButtonClick = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      setUserName('');
    }).catch((error) => {
      console.log(error);
    })
  }

  const loginStatusMessage = `LOGIN STATUS: You are currently ${!isLoggedIn ? 'not' : ''} logged in${isLoggedIn ? ` as ${userName}` : ''}. `;
  const logButton = isLoggedIn ? <InlineButton buttonText="Log out?" handleClick={handleLogButtonClick} /> : "Log in?";

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <div className="w-100 text-center text-info">
        <p>
          {loginStatusMessage}
          {logButton}
        </p>
      </div>
        {!isLoggedIn && <LoginForm onLogin={handleLogin} onCreateAccount={createNewAccount} />}
      </div>
    </Container>
  );
}

export default App;
