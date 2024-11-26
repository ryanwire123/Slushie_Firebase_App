// src/components/LoginPage.jsx

import React, { useState, useContext } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CustomerContext } from '../context/UserContext';  // Import CustomerContext
import './LoginPage.css';

const LoginPage = () => {
  const { setCustomer } = useContext(CustomerContext);  // Access setCustomer from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // After login, set customer info in the context
      setCustomer({
        uid: user.uid,
        email: user.email,
        // You can add other user details here as well (e.g., display name)
      });

      navigate('/order');  // Navigate to order page after successful login
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

