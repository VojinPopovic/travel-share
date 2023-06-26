"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Post from "@/components/Post/Post";
import CreatePost from "@/components/CreatePost/CreatePost";
import { useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Profile({ params }) {
  const [renderPost, setRenderPost] = useState(false);
  const email = decodeURI(params.id).replaceAll("%40", "@");
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR(
    `/api/posts/email?email=${email}`,
    fetcher
  );

  function reloadData(){
    mutate()
  }

  if (isLoading || session.status === "loading") {
    <Loading />;
  } else {
    return (
      <MainDiv>
        <div className="relative w-full h-[200px] border-b-2 border-[rgba(0,0,0,0.68)]">
          <div className="w-full h-[70px] absolute bottom-0 flex justify-between items-center mb-4">
            <div className="w-1/2 flex justify-start items-center ml-4">
              <div className="relative w-[70px] min-w-[50px] max-h-[70px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mr-2">
                <Image
                  className="w-full h-full mx-auto rounded-lg object-cover"
                  src={data[0]?.userimage}
                  width={100}
                  height={100}
                  alt=""
                ></Image>
              </div>
              <p className="text-md _text-color font-semibold whitespace-nowrap">
                {email}
              </p>
            </div>
            {session?.data?.user?.email === data[0]?.email ? (
              <button
                className="_button _card-gradient min-w-[100px] bottom-0 mr-4"
                onClick={signOut}
              >
                Log out
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <section className="w-full px-[3%] pb-4">
          <div className="mt-5 flex gap-2">
            <p className="_text-color text-2xl font-semibold">
               Posts
            </p>
          </div>
          {data?.map((post) => {
            return <Post post={post} key={post._id} reloadData={reloadData}></Post>;
          })}
          <div className="mt-5 flex gap-2">
            <p className="_text-color text-2xl font-semibold">
              Followed groups
            </p>
          </div>
        </section>
        <Navigation previousPage="/home"></Navigation>
      </MainDiv>
    );
  }
}
