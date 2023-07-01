"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CommentsModal from "../CommentsModal/CommentsModal";

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
        `https://restcountries.com/v3.1/name/${post.group}`,
        {
          cache: "no-store",
        }
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
            <div className="w-full">
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
      <div className="ml-[5%] mb-4 sm:ml-[calc(60px+4%)] z-1">
        <button
          onClick={openModal}
          className="relative inline-flex items-center justify-start px-5 py-2 overflow-hidden font-medium transition-all _accent-color-bg rounded-lg hover:bg-white group"
        >
          <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-lg"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-orange-500 ">
            Comments
          </span>
        </button>
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
          className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12 z-10"
        >
          <Image
            onClick={zoomImage}
            src={post.img}
            width={1500}
            height={1500}
            className="rounded-lg w-[90%] sm:w-[60%] max-w-[600px] ease-in-out duration-300 transition-all mx-auto"
            alt=""
          ></Image>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
