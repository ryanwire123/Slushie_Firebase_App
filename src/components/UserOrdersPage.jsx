import React, { useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { UserContext } from '../context/UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './UserOrdersPage.css'; 

const UserOrdersPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
        if (!user) return;
        try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const userOrders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(userOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    fetchOrders();
}, [user]);

if (!user) {
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
              <p><strong>Branch:</strong> {order.selectedBranch}</p>
              <p><strong>Flavors:</strong> {order.selectedFlavors.join(', ')}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrdersPage;
