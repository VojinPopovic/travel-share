import MainDiv from "@/components/MainDiv/MainDiv";
import BackgroundImage from "../../../public/backgroundImage.svg";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

export default function Feedback() {
  return (
    <>
      <MainDiv>
        <Navbar />
        <div className="w-full h-[calc(100vh-70px)] sm:h-[calc(100vh-120px)] flex justify-center items-center xs:pb-[120px]">
          <div>
            <div className="mx-auto max-w-screen-xl px-4 py-4 md:py-16 xs:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="lg:col-span-2 lg:py-12">
                  <p className="max-w-xl text-xs xs:text-base md:text-lg">
                    Share your travel adventures with us! Fill out our contact
                    form and let us hear your amazing stories. Or let us know how
                    we can improve your expirience on our website!
                  </p>
                  <div className="mt-3 md:mt-8">
                    <p className="text-base xs:text-lg md:text-2xl font-bold text-orange-600">
                      0151 475 4450
                    </p>
                    <address className="mt-2 not-italic text-xs xs:text-base md:text-lg">
                      282 Kevin Brook, Imogeneborough, CA 58517
                    </address>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-3 md:p-8 shadow-lg lg:col-span-3 lg:p-12">
                  <form action="" className="space-y-4">
                    <div>
                      <label className="sr-only" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="w-full rounded-lg p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Name"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="w-full rounded-lg p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Email address"
                          type="email"
                          id="email"
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="phone">
                          Phone
                        </label>
                        <input
                          className="w-full rounded-lg p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          placeholder="Phone Number"
                          type="tel"
                          id="phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className="w-full rounded-lg p-3 text-sm md:h-[150px] border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Message"
                        rows="3"
                        id="message"
                      ></textarea>
                    </div>
                    <div className="xs:mt-4">
                      <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-orange-600 px-2 py-1 xs:px-5 xs:py-3 font-medium text-white sm:w-auto"
                      >
                        Send Feedback
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainDiv>
      <Image src={BackgroundImage} className="-z-10" fill={true} alt=""></Image>
    </>
  );
}
