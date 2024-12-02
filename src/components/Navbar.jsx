// src/components/Navbar.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomerContext } from '../context/UserContext'; 
import { auth } from '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import './Navbar.css'; 

const Navbar = () => {
  const { customer } = useContext(CustomerContext);  
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    if (customer) {
      const fetchCustomerName = async () => {
        try {
          const customerDoc = await db.collection('customers').doc(customer.customerID).get(); 
          if (customerDoc.exists) {
            setCustomerName(customerDoc.data().name); 
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
      {customer && <div className="welcome-message">Welcome, {customer.customerName}</div>}
  
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
           <Link to={customer ? "/order" : "/guest-checkout"} className="cta-button">
            Order
          </Link>
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


