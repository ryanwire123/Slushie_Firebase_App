import { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';  // Import Firestore functions

const GuestCheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  // Function to handle guest order
  const handleGuestOrder = async () => {
    try {
      // Add customer data to Firestore
      const customersRef = collection(db, 'customers');
      const docRef = await addDoc(customersRef, {
        customerName: name,
        customerEmail: email,
        customerAddress: address,
        // Add additional fields as needed
      });

      console.log("Customer added with ID: ", docRef.id);
      // Proceed to order page
      navigate('/order');
    } catch (e) {
      console.error("Error adding customer: ", e);
    }
  };

  return (
    <div>
      <h2>Guest Checkout</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button onClick={handleGuestOrder}>Proceed to Order</button>
    </div>
  );
};

export default GuestCheckoutPage;
