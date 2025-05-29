"use client";
import { CartContext } from "@/context/cartContext";
import { useContext, useEffect, useState } from "react";
import { RiShoppingCartLine } from "@remixicon/react";
import Link from "./Link";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cart.length);
  }, [cart]);

  return (
    <div className="w-full flex bg-gray-100 h-16 justify-between items-center px-5 lg:px-32">
      <Link href="/">
        <div className="font-bold text-gray-400 text-2xl">GamerShop</div>
      </Link>
      <Link href="/cart" disabled={cart.length === 0}>
        <div className="flex">
          <RiShoppingCartLine />
          <div>{cart.length > 0 ? cart.length : ""}</div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
