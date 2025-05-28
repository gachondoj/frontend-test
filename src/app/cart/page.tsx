"use client";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Game } from "@/utils/endpoint";
import { CartContext } from "@/context/cartContext";
import BackLink from "@/components/BackLink";
import CartList from "@/components/CartList";

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
    if (cart.length === 0) {
      redirect("/");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart(cart);
  }, [cart]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 md:py-12 md:px-32">
      <BackLink href="/" content="Back to Catalog" />

      <div className="flex flex-col gap-3 w-full items-start justify-start ">
        <div className="font-bold text-gray-600 text-4xl">Your Cart</div>
        <div className="text-gray-600 text-2xl font-normal">
          {cart.length} {cart.length > 1 ? "items" : "item"}
        </div>
      </div>
      <div className="w-full flex gap-20 flex-col md:flex-row">
        <CartList cart={cart} setCart={setCart} />
        <div className="w-full">
          <CartSummary cart={cart} />
        </div>
      </div>
    </main>
  );
}
