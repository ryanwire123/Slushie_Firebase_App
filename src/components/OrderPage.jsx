import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import './OrderPage.css';

const OrderPage = ({ customer }) => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    // Ensure at least one flavor is selected, with the first being required
    if (selectedFlavors.length === 0) {
      alert('Please select at least one flavor');
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

    // Order object structure to match Seeder file
    const order = {
      customerID: customer && customer.customerID ? customer.customerID : 'guest',
      price: 10, // Example price, could be dynamic
      deliveryAddress: customer && customer.customerAddress ? customer.customerAddress : 'Unknown',
      branchID: selectedBranch, // Branch ID, e.g., 'b1' or 'b2'
      flavor1ID: selectedFlavors[0] ? flavorMap[selectedFlavors[0]] : null, // First flavor ID
      flavor2ID: selectedFlavors[1] ? flavorMap[selectedFlavors[1]] : null, // Second flavor ID
      flavor3ID: selectedFlavors[2] ? flavorMap[selectedFlavors[2]] : null, // Third flavor ID
      status: 'pending', // Status is set to 'pending' (aligns with your Seeder structure)
      timestamp: new Date(), // Timestamp for when the order is placed
    };

    try {
      // Saving the order to Firestore under 'orders' collection
      const docRef = await addDoc(collection(db, 'orders'), order);
      
      // Once the order is created, pass the orderId and customerId to the next page
      navigate('/mock-payment', {
        state: { orderId: docRef.id, customerId: order.customerID }
      });
    } catch (error) {
      console.error('Error placing order: ', error.message); // Log error if any
    }
  };

  const handleFlavorChange = (flavor) => {
    setSelectedFlavors((prevFlavors) => {
      if (prevFlavors.includes(flavor)) {
        return prevFlavors.filter((f) => f !== flavor);
      } else {
        return [...prevFlavors, flavor];
      }
    });
  };

  return (
    <div>
      <h2>Order Drink</h2>
      <div>
        <label>Select Branch:</label>
        <select onChange={(e) => setSelectedBranch(e.target.value)} value={selectedBranch}>
          <option value="">Select a branch</option>
          <option value="b1">Branch 1 (123 Monmouth Street)</option>
          <option value="b2">Branch 2 (234 Monmouth Street)</option>
        </select>
      </div>
      <div>
        <label>Select Flavors (at least one flavor is required):</label>
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
