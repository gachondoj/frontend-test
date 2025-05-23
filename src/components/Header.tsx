"use client";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

const Header = () => {
  const { cart } = useCart();

  return (
    <div className="w-full flex bg-gray-100 h-16 justify-between items-center px-5 sm:px-32">
      <Link href="/" className="font-bold text-gray-400 text-2xl">
        GamerShop
      </Link>
      <Link href="/cart">Cart: {cart.length}</Link>
    </div>
  );
};

export default Header;
