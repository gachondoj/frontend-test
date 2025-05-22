import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex bg-gray-100 h-[64px] justify-between items-center px-[20px] sm:px-[128px]">
      <Link href="/" className="font-[700] text-gray-300 text-[24px]">
        GamerShop
      </Link>
      <Link href="/cart">Cart</Link>
    </div>
  );
};

export default Header;
