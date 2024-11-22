import { useState } from 'react';  
import { useNavigate } from 'react-router-dom';

const GuestCheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleGuestOrder = () => {
    navigate('/order');
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
