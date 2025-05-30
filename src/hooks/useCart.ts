"use client";
import { CartContext } from "@/context/cartContext";
import { Game } from "@/utils/endpoint";
import { useContext } from "react";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");

  const { cart, setCart } = context;

  const addItem = (game: Game) => {
    setCart("ADD", game);
  };

  const removeItem = (game: Game) => {
    setCart("REMOVE", game);
  };

  return {
    items: cart.items,
    total: cart.total,
    addItem,
    removeItem,
  };
}
