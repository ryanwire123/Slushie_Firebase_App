import React from 'react';
import './Header.css'; // Add the CSS styling for the header

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src="your-logo-url.png" alt="App Logo" className="app-logo" />
        <h1 className="app-title">Slushies Ahoy!</h1>
      </div>
    </header>
  );
};

export default Header;
