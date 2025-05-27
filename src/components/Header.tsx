"use client";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cart.length);
  }, [cart]);

  return (
    <div className="w-full flex bg-gray-100 h-16 justify-between items-center px-5 md:px-32">
      <Link href="/" className="font-bold text-gray-400 text-2xl">
        GamerShop
      </Link>
      <Link href={cart.length === 0 ? {} : "/cart"}>Cart: {count}</Link>
    </div>
  );
};

export default Header;
