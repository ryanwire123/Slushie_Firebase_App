// src/components/GuestCheckoutPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './OrderPage.css';

const GuestOrderPage = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    if (!name || !email || !address) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!selectedBranch) {
      alert('Please select a branch.');
      return;
    }

    if (selectedFlavors.length === 0) {
      alert('Please select at least one flavor.');
      return;
    }

    const flavorMap = {
      Vanilla: 'f1av1',
      Chocolate: 'f1av2',
      Strawberry: 'f1av3',
      Blueberry: 'f1av4',
      Raspberry: 'f1av5',
    };

    const order = {
      customerID: 'guest',  
      price: 10,
      deliveryAddress: address,
      branchID: selectedBranch,
      flavor1ID: selectedFlavors[0] ? flavorMap[selectedFlavors[0]] : null,
      flavor2ID: selectedFlavors[1] ? flavorMap[selectedFlavors[1]] : null,
      flavor3ID: selectedFlavors[2] ? flavorMap[selectedFlavors[2]] : null,
      status: 'pending',
      timestamp: new Date(),
      customerName: name,
      customerEmail: email,
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      console.log('Order placed successfully:', docRef.id);
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
        return prevFlavors.filter((f) => f !== flavor);
      } else if (prevFlavors.length < 3) {
        return [...prevFlavors, flavor];
      } else {
        alert('You can only select up to 3 flavors.');
        return prevFlavors;
      }
    });
  };

  return (
    <div className="order-page">
      <h2>Order Slushie (Guest)</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
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

export default GuestOrderPage;

