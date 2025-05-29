"use client";
import CartSummary from "@/components/CartSummary";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Game } from "@/utils/endpoint";
import { CartContext } from "@/context/cartContext";
import Link from "@/components/Link";
import CartList from "@/components/CartList";
import Button from "@/components/Button";

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

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart(cart);
  }, [cart]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 md:py-12 md:px-32">
      <div className="w-full flex items-start">
        <Link href="/">
          <div className="flex gap-2">
            <i className="ri-arrow-left-line" />
            <div>Back to Catalog</div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-3 w-full items-start justify-start ">
        <div className="font-bold text-gray-600 text-4xl">Your Cart</div>
        <div className="text-gray-600 text-2xl font-normal">
          {cart.length} {cart.length > 1 ? "items" : "item"}
        </div>
      </div>
      <div className="w-full flex gap-20 flex-col md:flex-row">
        <CartList cart={cart} setCart={setCart} />
        <div className="w-full flex flex-col gap-8">
          <CartSummary cart={cart} />
          <Button onClick={() => {}} variant="gray">
            Checkout
          </Button>
        </div>
      </div>
    </main>
  );
}
