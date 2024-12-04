// src/components/UserOrdersPage.jsx

import React, { useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { CustomerContext } from '../context/UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './UserOrdersPage.css';

const UserOrdersPage = () => {
  const { customer } = useContext(CustomerContext);  // Accessing customer from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping flavor IDs to names
  const flavorMap = {
    f1av1: 'Vanilla',
    f1av2: 'Chocolate',
    f1av3: 'Strawberry',
    f1av4: 'Blueberry',
    f1av5: 'Raspberry',
  };

  // Mapping branch IDs to names and addresses
  const branchMap = {
    b1: '123 Monmouth Street',
    b2: '234 Monmouth Street',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer) return;  // Only fetch orders if customer is logged in

      setLoading(true); // Start loading

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('customerID', '==', customer.uid));  // Use customer.uid
        const querySnapshot = await getDocs(q);

        // Map the fetched orders
        const customerOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(customerOrders); // Set the orders in state
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Stop loading once fetch is done
      }
    };

    fetchOrders();
  }, [customer]); // Dependency on customer context

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!customer) {
    return <p>Please log in to view your orders.</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-box">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Branch:</strong> {branchMap[order.branchID]}</p>
              <p><strong>Flavors: </strong> 
                {[
                  flavorMap[order.flavor1ID],
                  flavorMap[order.flavor2ID],
                  flavorMap[order.flavor3ID]
                ]
                .filter(Boolean) // Remove null/undefined flavors
                .join(', ') // Join the flavors with commas
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;

