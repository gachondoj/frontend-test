"use client";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Game } from "@/utils/endpoint";
import { CartContext } from "@/context/cartContext";

export default function Cart() {
  const { setCart: updateCart } = useContext(CartContext);

  const [cart, setCart] = useState<Game[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (cart.length === 0) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart(cart);
  }, [cart]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 sm:py-12 sm:px-32">
      <div className="w-full flex items-start gap-2">
        <Link href="/">/-</Link>
        <div>Back to Catalog</div>
      </div>
      <div className="flex flex-col gap-3 w-full items-start justify-start ">
        <div className="font-bold text-gray-600 text-4xl">Your Cart</div>
        <div className="text-gray-600 text-2xl font-normal">
          {cart.length} {cart.length > 1 ? "items" : "item"}
        </div>
      </div>
      <div className="w-full flex gap-20">
        <div className="w-full flex flex-col gap-0">
          {cart.map((game, index) => (
            <CartItem
              key={game.id}
              game={game}
              isLast={index + 1 === cart.length}
              disabled={cart.length === 1}
              removeFromCart={(game) => {
                setCart(cart.filter((_game) => game.id !== _game.id));
              }}
            />
          ))}
        </div>
        <div className="w-full">
          <CartSummary cart={cart} />
        </div>
      </div>
    </main>
  );
}
