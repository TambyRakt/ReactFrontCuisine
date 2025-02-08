// src/context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { PlatData } from "../../app/index";

type CartContextType = {
  cart: PlatData[];
  addToCart: (item: PlatData) => void;
  removeFromCart: (index: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<PlatData[]>([]);

  const addToCart = (item: PlatData) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
