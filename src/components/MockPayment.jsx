import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MockPayment.css'; 
const MockPayment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment Successful!");
    navigate('/thank-you');
  };

  return (
    <div>
      <h2>Mock Payment</h2>
      <p>Proceeding with mock payment...</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default MockPayment;
