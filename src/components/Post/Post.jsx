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

  return (
    <div className="relative w-full mt-5 border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
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
        <div className="w-[90%] mt-3 sm:mt-0 sm:w-[70%]">
          <p className="text-xl font-semibold _text-color">{post.title}</p>
          <p className="_text-color font-medium">{post.content}</p>
          {post.img !== "" ? (
            <Image
              src={post.img}
              width={300}
              height={300}
              className="rounded-lg max-h-[300px] w-auto h-auto"
              alt=""
            ></Image>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="ml-[5%] mb-4 sm:ml-[calc(60px+4%)]">
        <button
          onClick={openModal}
          className="_button _accent-color-bg text-white"
        >
          Comments
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
    </div>
  );
}
