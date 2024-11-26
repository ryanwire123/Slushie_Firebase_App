// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomerProvider } from './context/UserContext'; 
import Header from './components/Header';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import OrderPage from './components/OrderPage';
import MockPayment from './components/MockPayment';
import ThankYouPage from './components/ThankYouPage';
import UserOrdersPage from './components/UserOrdersPage';
import GuestCheckoutPage from './components/GuestCheckoutPage';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  return (
    <CustomerProvider> 
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/customer-orders" element={<UserOrdersPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/guest-checkout" element={<GuestCheckoutPage />} />
          <Route path="/mock-payment" element={<MockPayment />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </CustomerProvider> 
  );
}

export default App;

