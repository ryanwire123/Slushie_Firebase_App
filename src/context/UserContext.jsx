// src/context/UserContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { db } from '../firebase/firebaseConfig'; // Add Firestore import
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Create a Context to store customer data
export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const customerDoc = await getDoc(doc(db, 'customers', user.uid)); // Fetching customer data
          if (customerDoc.exists()) {
            const customerData = customerDoc.data();
            console.log('Customer data retrieved from Firestore:', customerData);
  
            setCustomer({
              uid: user.uid, // Firebase user ID
              email: user.email,
              ...customerData, // Merge Firestore data
            });
          } else {
            console.log('No customer document found for the user:', user.uid);
          }
        } catch (error) {
          console.error('Error fetching customer document:', error.message);
        }
      } else {
        setCustomer(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

