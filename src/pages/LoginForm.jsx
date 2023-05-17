import React, { useState } from 'react';
import firebase from '../firebase';
import firestore from '../firebase';
import { auth } from '../firebase';
import { BrowserRouter as Router, Route, Switch, Redirect, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import './Forms.css'; // Import the CSS file


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // navigate to take to other page 
  const navigate = useNavigate();

// store the email when enter 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

// Navigate to the registration page
  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Retrieve the user document from Firestore
      firestore
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            const userRole = userData.role;

            // Redirect the user based on their role
            if (userRole === 'admin') {
              navigate('/admin');
            } else if (userRole === 'parent') {
              navigate('/parent');
            } else if (userRole === 'medicalStaff') {
              navigate('/medical-staff');
            } else {
              // Handle unknown user role
              console.log('Unknown user role');
            }
          } else {
            // Handle user document not found
            console.log('User document not found');
          }
        })
        .catch((error) => {
          console.log('Error retrieving user document:', error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Login error:', errorCode, errorMessage);
    });
};

return (
    <div className="container">
    <form>
      <h2>Login</h2>
      <label>
        Email:
        <input type="email"  className="input" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password"  className="input" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="button"  className="button" onClick={handleRegister}>Register</button>
      <button type="button" className="button" onClick={handleLogin}>Login</button>
    </form>
    </div>
  );
};

export default LoginForm;
