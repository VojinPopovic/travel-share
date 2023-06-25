import Image from "next/image";
import Logo from "../../../public/travelShareLogo.svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative w-full h-[120px] _text-color flex items-center">
      <Link href="/" className="ml-[3%]">
        <Image src={Logo} height={50} width={50} alt=""></Image>
      </Link>
      <div className="absolute w-1/2 max-w-[400px] flex justify-between mx-auto left-0 right-0 font-semibold">
        <Link href="/about">About</Link>
        <Link href="/popular">Popular</Link>
        <Link href="/new">New</Link>
        <Link href="/feedback">Feedback</Link>
      </div>
    </div>
  );
}
