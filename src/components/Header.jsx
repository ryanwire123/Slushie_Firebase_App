// src/components/Header.jsx

import React from 'react';
import './Header.css'; // Add the CSS styling for the header
import logo from '../assets/whiteLogo250PxV2.png';

const Header = () => {
  return (
    <header className="app-header">
    <header className="app-header2"></header>
      <div className="header-content">
        <img src={logo} alt="App Logo" className="app-logo" />
        <h1 className="app-title">Slushies Ahoy</h1>
      </div>
    </header>
  );
};

export default Header;
