"use client";

import Post from "../Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SavedPosts({ data, posts, email }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  let savedPosts = [];

  data.forEach((item) => {
    posts.forEach((post) => {
      if (item.postid === post._id) {
        post.savedid = item._id;
        savedPosts.push(post);
      }
    });
  });

  savedPosts.forEach((item) => item);
  let content = savedPosts.map((item) => {
    return <Post key={item._id} post={item} saved={true} />;
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
              Saved posts
            </p>
          </div>
        </div>
      </div>
      <div className="px-[3%] pb-20 pt-5">
        {content.length === 0 ? <p>No saved posts</p> : content}
      </div>
    </>
  );
}
