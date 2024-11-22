import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css'; 

const OrderPage = ({ user }) => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    // Create the order object
    const order = {
      userId: user ? user.uid : 'guest', 
      selectedFlavors,
      selectedBranch,
      status: 'pending', 
      timestamp: new Date(),
    };

    try {
      // Save the order to Firestore
      await db.collection('orders').add(order);
      navigate('/mock-payment'); 
    } catch (error) {
      console.error("Error placing order: ", error.message);
    }
  };

  return (
    <div>
      <h2>Order Drink</h2>
      <div>
        <label>Select Branch:</label>
        <select onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select a branch</option>
          <option value="Branch A">Branch A</option>
          <option value="Branch B">Branch B</option>
        </select>
      </div>
      <div>
        <label>Select Flavors:</label>
        <select
          multiple
          onChange={(e) =>
            setSelectedFlavors(Array.from(e.target.selectedOptions, option => option.value))
          }
        >
          <option value="Vanilla">Vanilla</option>
          <option value="Lemon">Lemon</option>
          <option value="Strawberry">Strawberry</option>
          <option value="Coconut">Coconut</option>
          <option value="Cherry">Cherry</option>
          <option value="Lime">Lime</option>
          <option value="Raspberry">Raspberry</option>
          <option value="Coke">Coke</option>

        </select>
      </div>
      <button onClick={handleOrderSubmit}>Place Order</button>
    </div>
  );
};

export default OrderPage;
