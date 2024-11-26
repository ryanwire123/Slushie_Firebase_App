// src/components/Navbar.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomerContext } from '../context/UserContext'; // Updated context name
import { auth } from '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig'; // Firebase Firestore setup
import { collection, addDoc } from 'firebase/firestore';

import './Navbar.css'; 

const Navbar = () => {
  const { customer } = useContext(CustomerContext);  // Changed 'user' to 'customer'
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    if (customer) {
      const fetchCustomerName = async () => {
        try {
          const customerDoc = await db.collection('customers').doc(customer.customerID).get(); // Changed from 'users' to 'customers'
          if (customerDoc.exists) {
            setCustomerName(customerDoc.data().name); // Assuming 'name' is in Firestore
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      };
      fetchCustomerName();
    }
  }, [customer]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="navbar-container">
      {/* Welcome message above the navbar */}
      {customer && <div className="welcome-message">Welcome, {customerName || 'Customer'}</div>}
  
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {!customer ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <Link to="/customer-orders">My Orders</Link>
          )}
          <Link to="/order">Order</Link>
        </div>
        {customer && (
          <div className="logout-container">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

