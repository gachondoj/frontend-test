"use client";
import { Game } from "@/utils/endpoint";
import { parse } from "path";
import { createContext, useState, useEffect, ReactElement } from "react";

export interface ShoppingCart {
  items: Game[];
  total: number;
}

export const CartContext = createContext<{
  cart: ShoppingCart;
  setCart: (type: "ADD" | "REMOVE", game: Game) => void;
}>({
  cart: { items: [], total: 0 },
  setCart: () => {},
});

const getTotal = (items: Game[]) => {
  return items.reduce((acc, item) => acc + item.price, 0);
};

export const CartProvider = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState<ShoppingCart>({ items: [], total: 0 });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    console.log("getting cart from storage", stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.items.length > 0) {
          setCart(parsed);
          console.log("setting cart", parsed);
        }
      } catch {
        console.error("Carrito inválido en localStorage");
      }
    }
  }, []);

  const updateCart = (type: "ADD" | "REMOVE", game: Game) => {
    let newItems = [];

    if (type === "ADD") {
      newItems = [...cart.items, game];
    } else {
      newItems = cart.items.filter((item) => game.id !== item.id);
    }

    const newCart = {
      items: newItems,
      total: getTotal(newItems),
    };

    console.log("updating cart", {
      items: newItems,
      total: getTotal(newItems),
    });

    setCart(newCart);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(newCart));
      console.log("setting cart to storage", newCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart: updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
