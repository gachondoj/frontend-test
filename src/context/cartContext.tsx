"use client";
import { Game } from "@/utils/endpoint";
import { createContext, useState, useEffect, ReactElement } from "react";

export const CartContext = createContext<{
  cart: Game[];
  setCart: (newCart: Game[]) => void;
}>({
  cart: [],
  setCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState<Game[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (newCart: Game[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
