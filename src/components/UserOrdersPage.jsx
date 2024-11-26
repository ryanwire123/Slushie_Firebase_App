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

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer) return;  // Only fetch orders if customer is logged in

      setLoading(true); // Start loading

      try {
        const ordersRef = collection(db, 'orders');
        // Assuming the customer ID in orders is the Firebase user's UID
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
  }, [customer]);  // Dependency on customer context

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
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Branch:</strong> {order.branchID}</p>  {/* Assuming branchID exists */}
              <p><strong>Flavors:</strong> 
                {order.flavor1ID && `Flavor 1: ${order.flavor1ID}`}
                {order.flavor2ID && `, Flavor 2: ${order.flavor2ID}`}
                {order.flavor3ID && `, Flavor 3: ${order.flavor3ID}`}
              </p>
              <p><strong>Status:</strong> {order.status || 'Pending'}</p> {/* Assuming 'status' might be in the order */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrdersPage;

