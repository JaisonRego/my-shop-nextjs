"use client";

import React, { createContext, useContext, useState } from "react";

// Create the CartContext
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, itsPrice, qty) => {
    setCart((prevCart) => {
      // Create an array with the specified quantity of [item, itsPrice]
      const newItems = Array(qty).fill([item, itsPrice]);

      // Add the new items to the cart
      return [...prevCart, ...newItems];
    });
  };

  const removeFromCart = (item, itsPrice, qty) => {
    setCart((prevCart) => {
      let count = 0;
      return prevCart.filter((cartItem) => {
        if (cartItem[0] === item && cartItem[1] === itsPrice && count < qty) {
          count++; // Remove up to `qty` matching instances
          return false; // Exclude this item from the new cart
        }
        return true; // Keep other items
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
