import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { auth } from '../firebase/firebaseConfig';
import './Navbar.css'; 

const Navbar = () => {
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/user-orders">My Orders</Link>
        </>
      )}
      <Link to="/order">Order</Link>
    </nav>
  );
};

export default Navbar;
