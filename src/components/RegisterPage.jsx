import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig'; // Firebase Firestore setup
import { collection, addDoc } from 'firebase/firestore';

import './RegisterPage.css'; 

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added state for customer name
  const [address, setAddress] = useState(''); // Added state for customer address
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const customer = {
        customerID: userCredential.user.uid,
        customerEmail: email,
        customerName: name,
        customerAddress: address,
        customerPassword: password, // Storing password is not recommended, but you can hash it if needed
      };
  
      // Save customer data to Firestore in the 'customers' collection
      await addDoc(collection(db, 'customers'), customer);  // Saving to Firestore
  
      console.log("Customer Created:", customer);
  
      navigate('/order'); // Navigate to the order page after successful registration
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Full Name" 
          required 
        />
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
