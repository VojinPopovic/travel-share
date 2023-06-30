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
    <div className="relative w-full _post-border rounded-lg mt-5">
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
      <div className="flex justify-between py-3 px-4">
        <div className="flex flex-col justify-start w-[10%] pr-4 gap-2">
          <div className="w-full rounded-full overflow-hidden">
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
          <div className="w-full aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden">
            <Link href={`/groups/${data[0]?.name.common.toLowerCase()}`}>
              <img
                className="w-full h-full mx-auto rounded-lg object-cover"
                src={data[0]?.flags.svg}
                alt=""
              ></img>
            </Link>
          </div>
        </div>
        <div className="w-[90%]">
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
      <div className="ml-[calc(10%+13px)] mb-4">
        <button onClick={openModal} className="_button _card-gradient">
          Comments
        </button>
      </div>
      {isModalOpen ? <CommentsModal setIsModalOpen={setIsModalOpen} id={post._id} session={session} /> : ""}
    </div>
  );
}
