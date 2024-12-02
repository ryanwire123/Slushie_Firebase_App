// src/components/HomePage.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from '../context/UserContext';  
import './HomePage.css'; 

const HomePage = () => {
  const navigate = useNavigate();
  const { customer } = useContext(CustomerContext); 

  const handleOrderClick = () => {
    if (customer) {
      navigate('/order');
    } else {
      navigate('/guest-checkout');
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Welcome to Slushie Ahoy!</h1>
      <p className="description">
        Your one-stop shop for refreshing slushies made just the way you like them. 
        Pick your favorite flavors, mix and match, and enjoy the chill!
      </p>
      <button className="cta-button" onClick={handleOrderClick}>
        Start Your Order
      </button>
    </div>
  );
};

export default HomePage;
