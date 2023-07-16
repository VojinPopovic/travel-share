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
  const menu = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    if (width >= 890) {
      closeHamburger.current.style.display = "none";
      openHamburger.current.style.display = "none";
      menu.current.style.display = "none";
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
            <svg
              width="60"
              height="60"
              viewBox="0 0 69 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M57.6667 49.6667C59 47.3333 60 44.6667 60 41.6667C60 33.3333 53.3333 26.6667 45 26.6667C36.6667 26.6667 30 33.3333 30 41.6667C30 50 36.6667 56.6667 45 56.6667C48 56.6667 50.6667 55.6667 53 54.3333L63.6667 65L68.3333 60.3333L57.6667 49.6667ZM45 50C40.3333 50 36.6667 46.3333 36.6667 41.6667C36.6667 37 40.3333 33.3333 45 33.3333C49.6667 33.3333 53.3333 37 53.3333 41.6667C53.3333 46.3333 49.6667 50 45 50ZM33.3333 60V66.6667C14.9333 66.6667 0 51.7333 0 33.3333C0 14.9333 14.9333 0 33.3333 0C49.4667 0 62.9 11.4667 66 26.6667H59.1C58.0604 22.6395 56.0931 18.9113 53.3554 15.78C50.6178 12.6488 47.1857 10.2014 43.3333 8.63333V10C43.3333 13.6667 40.3333 16.6667 36.6667 16.6667H30V23.3333C30 25.1667 28.5 26.6667 26.6667 26.6667H20V33.3333H26.6667V43.3333H23.3333L7.36667 27.3667C6.93333 29.3 6.66667 31.2667 6.66667 33.3333C6.66667 48.0333 18.6333 60 33.3333 60Z"
                fill="#CF3200"
                fill-opacity="0.76"
                className={`${
                  openHamburger.current.style.display === "flex"
                    ? "inline-block"
                    : "hidden sm:inline-block"
                }`}
              />
            </svg>
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
        <div
          ref={menu}
          className="bg-orange-600 absolute w-full sm:w-1/2 h-screen flex flex-col justify-center items-center sm:items-end sm:pr-[15%] gap-10 z-[9] content-center top-0 right-0 text-4xl text-black"
        >
          {unorderedList}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
