import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userToken'); // Example: Check login status using a token

  const handleOrderClick = () => {
    if (isLoggedIn) {
      navigate('/order'); // Navigate to Order page
    } else {
      navigate('/guest-checkout'); // Navigate to Guest Checkout page
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Welcome to Frosty Delights!</h1>
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
