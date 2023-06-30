"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Comment({ post, profileEmail, reloadData, route }) {
  const session = useSession();

  async function deleteComment() {
    try {
      await fetch(`/api/comments/${route}/${post._id}`, { method: "DELETE" });
      reloadData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      key={post._id}
      className="relative w-full border-2 border-b-4 border-gray-200 hover:bg-gray-50 rounded-lg mt-5"
    >
    <p className="_accent-color-bg w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">{post.commentmaker}</p>

      {session?.data?.user?.email === post.commentmaker ||
      session?.data?.user?.email === profileEmail ? (
        <div
          onClick={deleteComment}
          className="absolute top-0 right-0 text-3xl mr-4 mt-2 hover:scale-150 transition duration-500 ease-in-out cursor-pointer"
        >
          x
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between py-3 px-4">
        <div className="flex flex-col justify-start w-full pr-4 gap-2">
          <div className="w-[50px] rounded-full overflow-hidden">
            <Link href={`/profile/${post.commentmaker}`}>
              <Image
                className="w-full mx-auto"
                src={post.userimage}
                width={50}
                height={50}
                alt=""
              ></Image>
            </Link>
          </div>
          <p className="w-full">{post.comment}</p>
        </div>
      </div>
    </div>
  );
}
