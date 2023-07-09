import MainDiv from "@/components/MainDiv/MainDiv";
import Navbar from "@/components/Navbar/Navbar";
import BackgroundImage from "../../../public/backgroundImage.svg";
import Image from "next/image";
import LogoImage from "../../../public/travelShareLogo.svg";

export default function About() {
  return (
    <>
      <MainDiv>
        <Navbar />
        <div className="relative w-full h-[calc(100vh-120px)] flex justify-center items-center">
          <div className="px-[3%] flex flex-col gap-4 sm:flex-row w-[90%] max-w-[900px] sm:mb-[120px] rounded-xl bg-white p-2 sm:p-8 shadow-lg">
            <div className="relative sm:w-1/3 h-full p-auto right-0 left-0">
              <Image
                src={LogoImage}
                width={30}
                height={30}
                className="relative w-full h-full min-w-[150px] max-w-[200px] m-auto top-0 bottom-0"
                alt=""
              />
            </div>
            <p className="sm:w-2/3 _text-color text-xs sm:text-sm md:text-base">
              Welcome to TravelShare, the ultimate social network for
              globetrotters and adventurers! Our platform is designed
              specifically for travelers like you, who are eager to share their
              experiences and connect with others who share a passion for
              exploring different countries and places. With TravelShare, you
              can join dedicated groups representing each country, creating a
              vibrant tapestry of personal narratives, captivating photographs,
              and immersive videos that encapsulate the essence of each
              destination. Immerse yourself in a world of hidden gems, insider
              tips, and virtual journeys that will ignite your wanderlust and
              expand your horizons. Join our thriving community today and let
              the adventure begin!
            </p>
          </div>
        </div>
      </MainDiv>
      <Image src={BackgroundImage} fill={true} className="-z-10" alt="" />
    </>
  );
}
