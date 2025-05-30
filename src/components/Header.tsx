"use client";
import { RiShoppingCartLine } from "@remixicon/react";
import Link from "./Link";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const { items } = useCart();
  return (
    <div className="w-full flex bg-primary-100 h-16 justify-between items-center px-5 lg:px-32">
      <Link href="/">
        <div className="font-bold text-primary-400 text-2xl">GamerShop</div>
      </Link>
      <Link href="/cart" disabled={items.length === 0}>
        <div className="flex">
          <RiShoppingCartLine />
          <div>{items.length > 0 ? items.length : ""}</div>
        </div>
      </Link>
    </div>
  );
};

export default Header;
