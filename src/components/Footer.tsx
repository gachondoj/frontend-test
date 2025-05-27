import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Link
      href="/"
      className="w-full h-[172.09px] bg-gray-500 text-white items-center flex justify-center"
    >
      <Image src="/applyDigitalLogo.png" alt="Logo" width={200} height={100} />
    </Link>
  );
};

export default Footer;
