"use client";

import Image from "next/image";
import BackgroundImage from "../../public/backgroundImage.svg";
import planeImage from "../../public/planeGraphic.svg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    setTimeout(async function () {
      router?.push("/home");
    });
  }

  if (session.status === "loading") {
    return <Loading />;
  }
  if (session.status === "unauthenticated") {
    return (
      <>
        <div className="absolute top-0 left-0 w-full h-screen -z-10">
          <Image
            className="w-full h-full"
            src={BackgroundImage}
            width="auto"
            height="auto"
            alt=""
          ></Image>
        </div>
        <main className="w-full max-w-[1400px] h-screen mx-auto relative">
          <Navbar></Navbar>
          <div className="absolute w-full md:w-[94%] max-w-[900px] h-full md:h-[70%] md:max-h-[350px] m-auto left-0 right-0 top-0 bottom-0">
            <div className="h-1/2 absolute w-[80%] md:w-[50%] flex flex-col justify-center items-start gap-[4%] md:text-left md:h-full bottom-0 top-0 left-0 right-0 m-auto md:m-0">
              <div className="md:relative _transparent-gradient rounded-xl md:rounded-[20px] px-3 py-5 md:py-[6%]">
                <Image
                  className="absolute hidden md:block w-[35%] aspect-square top-[-100px] right-[-60px]"
                  src={planeImage}
                  alt=""
                  width="auto"
                  height="auto"
                ></Image>
                <p className="text-2xl sm:text-4xl _text-color font-bold">
                  Learn about
                  <span className="_accent-color"> new </span>
                  and interesting destinations!
                </p>
                <p className="text-base _text-color mt-3 md:mt-[4%]">
                  Share the expiriences with people all around the world about
                  your favorite destinations to visit
                </p>
              </div>
              <button
                onClick={() => signIn("google")}
                className="relative ml-1 px-6 py-3 font-medium text-white rounded-lg group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-[#FF7043] ease opacity-50 group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg"></span>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-[#FF3E00] ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen rounded-lg"></span>
                <span className="relative">Sign In!</span>
              </button>
            </div>
            <div className="absolute top-0 bottom-0 my-auto w-full md:aspect-auto right-0 md:w-[70%] md:h-full -z-[2]">
              <Image
                className="md:rounded-[20px]"
                src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fill={true}
                alt=""
              ></Image>
            </div>
          </div>
          <Footer />
        </main>
      </>
    );
  }
}
