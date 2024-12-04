// src/components/OrderPage.jsx

import React, { useState, useContext } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { CustomerContext } from '../context/UserContext'; // Import CustomerContext
import './OrderPage.css';

const OrderPage = () => {
  const { customer } = useContext(CustomerContext); // Access customer from context
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    // Debug logs
    console.log('Customer Object:', customer);
    console.log('Customer Address:', customer ? customer.customerAddress : 'No Address');

    // Validation for customer address
    if (!customer || !customer.customerAddress) {
      alert('Customer address is missing! Please update your profile.');
      return;
    }

    // Validation for branch selection
    if (!selectedBranch) {
      alert('Please select a branch.');
      return;
    }

    // Ensure at least one flavor is selected
    if (selectedFlavors.length === 0) {
      alert('Please select at least one flavor.');
      return;
    }

    // Mapping flavors to match the 'flavors' table (e.g., 'f1av1' for Vanilla)
    const flavorMap = {
      Vanilla: 'f1av1',
      Chocolate: 'f1av2',
      Strawberry: 'f1av3',
      Blueberry: 'f1av4',
      Raspberry: 'f1av5',
    };

    // Construct the order object
    const order = {
      customerID: customer && customer.uid ? customer.uid : 'guest', // Set to 'guest' if customer is a guest
      price: 10, // Example price, could be dynamic
      deliveryAddress: customer ? customer.customerAddress : 'Guest Address', // Use customer address from context, default if guest
      branchID: selectedBranch, // Branch ID, e.g., 'b1' or 'b2'
      flavor1ID: selectedFlavors[0] ? flavorMap[selectedFlavors[0]] : null, // First flavor ID
      flavor2ID: selectedFlavors[1] ? flavorMap[selectedFlavors[1]] : null, // Second flavor ID
      flavor3ID: selectedFlavors[2] ? flavorMap[selectedFlavors[2]] : null, // Third flavor ID
      status: 'pending', // Status is set to 'pending'
      timestamp: new Date(), // Timestamp for when the order is placed
    };

    console.log('Order Object:', order); // Log order for debugging

    try {
      // Save the order to Firestore under 'orders' collection
      const docRef = await addDoc(collection(db, 'orders'), order);
      console.log('Order placed successfully:', docRef.id);

      // Navigate to the mock payment page with order ID and customer ID
      navigate('/mock-payment', {
        state: { orderId: docRef.id, customerId: order.customerID },
      });
    } catch (error) {
      console.error('Error placing order:', error.message);
      alert('Failed to place the order. Please try again.');
    }
  };

  const handleFlavorChange = (flavor) => {
    setSelectedFlavors((prevFlavors) => {
      if (prevFlavors.includes(flavor)) {
        // Remove flavor if it's already selected
        return prevFlavors.filter((f) => f !== flavor);
      } else if (prevFlavors.length < 3) {
        // Add flavor if less than 3 flavors are selected
        return [...prevFlavors, flavor];
      } else {
        // Alert or restrict if trying to select more than 3 flavors
        alert('You can only select up to 3 flavors.');
        return prevFlavors;
      }
    });
  };

  return (
    <div className="order-page">
      <h2>Order Slushie</h2>
      <div>
        <label>Select Branch:</label>
        <select onChange={(e) => setSelectedBranch(e.target.value)} value={selectedBranch}>
          <option value="">Select a branch</option>
          <option value="b1">Branch 1 (123 Monmouth Street)</option>
          <option value="b2">Branch 2 (234 Monmouth Street)</option>
        </select>
      </div>
      <div>
        <label>Select up to Three Flavors:</label>
        <div className="flavor-selection">
          {['Vanilla', 'Chocolate', 'Strawberry', 'Blueberry', 'Raspberry'].map((flavor) => (
            <div key={flavor} className="flavor-bar">
              <input
                type="checkbox"
                id={flavor}
                value={flavor}
                checked={selectedFlavors.includes(flavor)}
                onChange={() => handleFlavorChange(flavor)}
              />
              <label htmlFor={flavor}>{flavor}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleOrderSubmit}>Place Order</button>
    </div>
  );
};

export default OrderPage;

