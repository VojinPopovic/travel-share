"use client";

import Image from "next/image";
import BackgroundImage from "../../public/backgroundImage.svg";
import planeImage from "../../public/planeGraphic.svg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Loading from "./loading";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    setTimeout(() => {
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
          <Image className="w-full h-full" src={BackgroundImage} alt=""></Image>
        </div>
        <main className={`w-[100%] max-w-[1400px] h-screen mx-auto relative`}>
          <Navbar></Navbar>
          <div className="absolute w-[94%] max-w-[1000px] h-2/5 m-auto left-0 right-0 top-0 bottom-0">
            <div className="absolute w-[50%] h-full flex flex-col justify-center items-start gap-[4%] text-left">
              <div className="relative _transparent-gradient rounded-[20px] py-[8%]">
                <Image
                  className="absolute w-[35%] aspect-square top-[-100px] right-[-60px]"
                  src={planeImage}
                  alt=""
                ></Image>
                <p className="text-4xl _text-color font-bold">
                  Learn about
                  <span className="_accent-color"> new </span>
                  and interesting destinations!
                </p>
                <p className="_text-color mt-[4%]">
                  Share the expiriences with people all around the world about
                  your favorite destinations to visit
                </p>
              </div>
              <div className="flex gap-[10%]">
                <button
                  onClick={() => signIn("google")}
                  className="_button min-w-[100px] _accent-color-bg text-white"
                >
                  Sign up!
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="_button min-w-[100px] _second-accent-color-bg _text-color"
                >
                  Log in
                </button>
              </div>
            </div>
            <div className="absolute right-0 w-[70%] h-full -z-[2]">
              <Image
                className="rounded-[20px]"
                src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fill={true}
                alt=""
              ></Image>
            </div>
          </div>
        </main>
      </>
    );
  }
}
