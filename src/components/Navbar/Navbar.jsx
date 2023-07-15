"use client";

import Image from "next/image";
import Logo from "../../../public/travelShareLogo.svg";
import Link from "next/link";
import HamburgerMenu from "../../../public/hamburgerMenuIcon.svg";
import CloseHamburger from "../../../public/closeHamburgerImage.svg";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const openHamburger = useRef();
  const closeHamburger = useRef();
  const [width, setWidth] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (width >= 890) {
      closeHamburger.current.style.display = "none";
      openHamburger.current.style.display = "none";
    } else if (width < 890 && closeHamburger.current.style.display === "none") {
      openHamburger.current.style.display = "flex";
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  function openMenu() {
    openHamburger.current.style.display = "none";
    closeHamburger.current.style.display = "flex";
    setIsOpen(true);
  }

  function closeMenu() {
    closeHamburger.current.style.display = "none";
    openHamburger.current.style.display = "flex";
    setIsOpen(false);
  }
  let unorderedList = (
    <>
      <Link href="/about">About</Link>
      <Link href="/new">New</Link>
      <Link href="/feedback">Feedback</Link>
    </>
  );

  return (
    <>
      <div className="relative mx-[3%]">
        <div className="relative w-full max-w-[900px] h-[71px] sm:h-[120px] _text-color flex items-center justify-between z-10 mx-auto">
          <Link href="/">
            <Image src={Logo} height={50} width={50} alt=""></Image>
          </Link>
          <div className="w-1/2 max-w-[300px] justify-between font-semibold hidden md:flex">
            {unorderedList}
          </div>
          <Image
            ref={openHamburger}
            onClick={openMenu}
            src={HamburgerMenu}
            width={30}
            height={20}
            alt=""
            className="flex md:hidden cursor-pointer z-10"
          ></Image>
          <Image
            ref={closeHamburger}
            onClick={closeMenu}
            src={CloseHamburger}
            width={30}
            height={20}
            alt=""
            className="hidden md:hidden cursor-pointer z-10"
          ></Image>
        </div>
      </div>
      {isOpen ? (
        <div className="bg-orange-600 absolute w-1/2 h-screen flex flex-col justify-center items-end pr-[15%] gap-10 z-[9] top-0 right-0 text-4xl text-black">
          {unorderedList}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
