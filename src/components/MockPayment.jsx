import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import './MockPayment.css';

const MockPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, customerId } = location.state || {}; // Get orderId and customerId from navigation state

  const handlePayment = async () => {
    // Check if orderId and customerId are defined
    if (!orderId || !customerId) {
      alert('Invalid order or customer ID');
      return;
    }

    try {
      // Get reference to the order
      const orderRef = doc(db, 'orders', orderId);
      
      // Check if the order exists before attempting to update it
      const docSnapshot = await getDoc(orderRef);
      if (!docSnapshot.exists()) {
        alert('Order not found!');
        return;
      }

      // Update the order status to 'paid' in Firestore
      await updateDoc(orderRef, {
        status: 'paid', // Update order status to 'paid' after successful payment
        paymentTimestamp: new Date(), // Optional: Save payment timestamp
      });

      alert("Payment Successful!");
      navigate('/thank-you'); // Navigate to the thank-you page after successful payment
    } catch (error) {
      console.error("Error updating payment status: ", error.message);
      alert('Payment failed. Please try again later.');
    }
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
