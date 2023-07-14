"use client"

import MainDiv from "@/components/MainDiv/MainDiv";
import BackgroundImage from "../../../public/backgroundImage.svg";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

export default function Feedback() {
  function submitHandler(e){
    e.target.reset()
  }
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
                    form and let us hear your amazing stories. Or let us know
                    how we can improve your expirience on our website!
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
                  <form onSubmit={submitHandler}
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      name="apikey"
                      value="e0199f24-d53d-4c1a-a455-e0bfb4c1e7c1"
                    ></input>

                    <input
                      className="w-full p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Name"
                      type="text"
                      name="name"
                      required
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        className="w-full p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Email address"
                        type="email"
                        name="email"
                        required
                      />
                      <input
                        className="w-full p-3 text-sm border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Phone Number"
                        type="tel"
                        name="phone"
                      />
                    </div>
                    <textarea
                      className="w-full p-3 text-sm md:h-[150px] border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Message"
                      rows="3"
                      name="message"
                      required
                    ></textarea>
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
