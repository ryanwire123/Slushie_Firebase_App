import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebaseConfig';

// Create a Context to store customer data
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes (user login/logout)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCustomer(user);  // Update the customer state based on authentication status
    });
    
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
