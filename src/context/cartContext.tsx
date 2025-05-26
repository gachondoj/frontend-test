"use client";
import { Game } from "@/utils/endpoint";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<{
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState<Game[]>([]);

  const addToCart = (game: Game) => {
    setCart([...cart, game]);
  };

  const removeFromCart = (game: Game) => {
    setCart(cart.filter((_game) => game.id !== _game.id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
