"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CommentsModal from "../CommentsModal/CommentsModal";
import { CreateSavedPost } from "../CreateSavedPost/CreateSavedPost";

export default function Post({ post, reloadData }) {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPictureOpen, setIsPictureOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${post.group}`
      );

      if (!res.ok) {
        setErr(true);
      }

      const data = await res.json();

      setData(data);
      setIsLoading(false);
    };
    getData();
  }, [post]);

  async function deletePost() {
    try {
      await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      reloadData();
    } catch (error) {
      console.log(err);
    }
  }

  async function savePost() {
    try {
      CreateSavedPost(session, post._id);
    } catch (error) {
      console.log(error);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function zoomImage() {
    setIsPictureOpen(true);
  }

  return (
    <div className="relative w-full mt-5 border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-100 transition duration-300 ease-in-out">
      {session?.data?.user?.email === post.email ? (
        <div
          onClick={deletePost}
          className="absolute top-0 right-0 text-3xl mr-4 mt-2 hover:scale-150 transition duration-500 ease-in-out cursor-pointer"
        >
          x
        </div>
      ) : (
        ""
      )}
      <div className="justify-between py-3 px-4 pl-[5%] sm:flex sm:pl-0 sm:justify-start">
        <div className="flex justify-start w-full gap-2 sm:flex-col sm:w-auto sm:px-[2%]">
          <div className="w-[60px] aspect-square rounded-full overflow-hidden">
            <Link href={`/profile/${post.email}`}>
              <Image
                className="w-full mx-auto"
                src={post.userimage}
                width={50}
                height={50}
                alt=""
              ></Image>
            </Link>
          </div>
          <div className="w-[60px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden">
            <Link href={`/groups/${data[0]?.name.common.toLowerCase()}`}>
              <img
                className="w-full aspect-square mx-auto rounded-lg object-cover"
                src={data[0]?.flags.svg}
                alt=""
              ></img>
            </Link>
          </div>
        </div>
        <div className="w-[90%] mt-3 sm:mt-0 sm:w-[70%] z-9">
          <p className="text-xl font-semibold _text-color">{post.title}</p>
          <p className="_text-color font-medium">{post.content}</p>
          {post.img !== "" ? (
            <div className="w-full mt-2">
              <Image
                onClick={zoomImage}
                src={post.img}
                width={400}
                height={400}
                className="rounded-lg max-h-[300px] w-auto h-auto cursor-pointer hover:scale-105 ease-linear duration-200 transition-all"
                alt=""
              ></Image>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="ml-[5%] mb-4 sm:ml-[calc(60px+4%)] z-1 flex w-full gap-2">
        <button
          onClick={openModal}
          className="relative inline-flex items-center justify-start px-5 py-2 overflow-hidden font-medium transition-all _accent-color-bg rounded-lg hover:bg-white group"
        >
          <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-lg"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-orange-600 ">
            Comments
          </span>
        </button>
        <div
          onClick={savePost}
          className="flex justify-center group items-center text-red-700 hover:text-white color-transition duration-300 hover:bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 cursor-pointer"
        >
          <svg
            width="35"
            height="22"
            viewBox="0 0 120 98"
            className="fill-orange-600 group-hover:fill-white"
            strokeWidth="1px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M53.7604 59.8542L84.5 29.25L76.7812 21.5313L53.7604 44.5521L42.25 33.0417L34.6667 40.625L53.7604 59.8542ZM0 97.5V86.6667H119.167V97.5H0ZM16.25 81.25C13.2708 81.25 10.7196 80.1884 8.59625 78.065C6.47292 75.9417 5.41306 73.3922 5.41667 70.4167V10.8333C5.41667 7.85418 6.47833 5.30293 8.60167 3.17959C10.725 1.05626 13.2744 -0.00360191 16.25 9.19638e-06H102.917C105.896 9.19638e-06 108.447 1.06168 110.57 3.18501C112.694 5.30834 113.754 7.85779 113.75 10.8333V70.4167C113.75 73.3959 112.688 75.9471 110.565 78.0704C108.442 80.1938 105.892 81.2536 102.917 81.25H16.25ZM16.25 70.4167H102.917V10.8333H16.25V70.4167Z" />
          </svg>
        </div>
      </div>
      {isModalOpen ? (
        <CommentsModal
          setIsModalOpen={setIsModalOpen}
          id={post._id}
          session={session}
        />
      ) : (
        ""
      )}
      {isPictureOpen ? (
        <div
          onClick={() => setIsPictureOpen(false)}
          className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 flex justify-center items-center z-10"
        >
          <Image
            onClick={zoomImage}
            src={post.img}
            width={1500}
            height={1500}
            className="rounded-lg w-[90%] sm:w-[60%] max-w-[600px] ease-in-out duration-300 transition-all"
            alt=""
          ></Image>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
