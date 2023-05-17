import React, { useState } from 'react';
import firebase from '../firebase';
import firestore from '../firebase'
import { auth } from '../firebase';
import {useNavigate} from 'react-router-dom'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import './Forms.css'

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    navigate('/login');// Navigate to the registration page
  };

  const handleRegister = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
  
      const docRef = await addDoc(collection(db, "Users"), {
        email: user.email,
        password: user.password,
        role: '',
      });
  
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.log('Signup error:', error.code, error.message);
    }
  };
  return (
    <div className='container'>
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <div>{error}</div>}
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Register</button>
      <button type="button" onClick={handleLogin}>Login</button>
    </form>
    </div>
  );
};

export default RegisterForm;
