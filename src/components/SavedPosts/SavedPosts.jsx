"use client";

import Post from "../Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SavedPosts({ data, posts, email }) {
  const session = useSession();
  const router = useRouter();

  let savedPosts = [];

  data.forEach((item) => {
    savedPosts.push(posts.filter((post) => item.postid === post._id));
  });
  savedPosts.forEach((item) => item);
  let content = savedPosts.map((item) => {
    return <Post key={item[0]._id} post={item[0]} />;
  });

  if (session?.data?.user?.email !== email) {
    setTimeout(() => {
      router.push(`/saved/${session?.data?.user?.email}`);
    });
  }

  return (
    <>
      <div className="relative w-full h-[200px] border-b-2 border-[rgba(0,0,0,0.68)]">
        <div className="w-full h-[70px] absolute bottom-0 flex justify-between items-center mb-4">
          <div className="w-1/2 flex justify-start items-center ml-4">
            <div className="relative w-[70px] min-w-[50px] max-h-[70px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mr-2">
              {session.status === "authenticated" ? (
                <Image
                  className="w-full h-full mx-auto rounded-lg object-cover"
                  src={session?.data?.user?.image}
                  width={100}
                  height={100}
                  alt=""
                ></Image>
              ) : (
                ""
              )}
            </div>
            <p className="text-md _text-color font-semibold whitespace-nowrap text-2xl">
              {session.status === "authenticated"
                ? session?.data?.user?.name
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="px-[3%] pb-20">
        <p className=" _text-color font-semibold whitespace-nowrap text-2xl mt-5">
          Saved Posts
        </p>
        {content}
      </div>
    </>
  );
}
