import Image from "next/image";
import Logo from "../../../public/travelShareLogo.svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative mx-[3%]">
      <div className="relative w-full max-w-[900px] h-[71px] sm:h-[120px] _text-color flex items-center justify-between z-10 mx-auto">
        <Link href="/">
          <Image src={Logo} height={50} width={50} alt=""></Image>
        </Link>
        <div className="w-1/2 max-w-[300px] justify-between font-semibold hidden md:flex">
          <Link href="/about">About</Link>
          <Link href="/new">New</Link>
          <Link href="/feedback">Feedback</Link>
        </div>
      </div>
    </div>
  );
}
