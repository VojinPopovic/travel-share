"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Comment({ post }) {
  const session = useSession();

  async function deleteComment() {
    try {
      await fetch(`/api/comments/${post._id}`, { method: "DELETE" });
      reloadData();
    } catch (error) {
      console.log(err);
    }
  }

  return (
    <div className="relative w-full _post-border rounded-lg mt-5">
      {session?.data?.user?.email === post.email ? (
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
        </div>
      </div>
    </div>
  );
}
