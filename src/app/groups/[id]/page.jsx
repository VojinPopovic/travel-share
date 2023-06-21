"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Post from "@/components/Post/Post";
import CreatePost from "@/components/CreatePost/CreatePost";
import { useState } from "react";

export default function page({ params }) {
  const [renderPost, setRenderPost] = useState(false)

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: groupPostsData, isLoading: isGroupPostsLoading } = useSWR(
    `/api/posts/group?group=${params.id}`,
    fetcher
  );

  const idToUpper = params.id.charAt(0).toUpperCase() + params.id.slice(1);
  const { data: imageData, isLoading: isImageLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${idToUpper}`,
    fetcher
  );

  function openModal() {
    setRenderPost(true)
  }

  if (isGroupPostsLoading || isImageLoading) {
    <Loading />;
  } else {
    return (
      <MainDiv>
        <div className="relative w-full h-[400px] border-b-2 border-[rgba(0,0,0,0.68)]">
          <div className="absolute bottom-0 left-0 w-1/3 max-w-[200px] flex justify-start items-center mb-4 ml-4">
            <div className="h-[70px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mr-2">
              <Image
                className="w-full h-full mx-auto rounded-lg object-cover"
                src={imageData[0]?.flags.svg}
                width={40}
                height={40}
                alt=""
              ></Image>
            </div>
            <p className="text-2xl _text-color font-semibold">{idToUpper}</p>
          </div>
        </div>
        <section className="w-full px-[3%] pb-4">
          <div className="mt-5 flex gap-2">
            <p className="_text-color text-2xl font-semibold">Group posts</p>
            <button className="_button _card-gradient" onClick={openModal}>
              Create a post
            </button>
            <button className="_button _card-gradient">Follow group</button>
          </div>
          {groupPostsData?.map((post) => {
            return <Post post={post} key={post._id}></Post>;
          })}
        </section>
        {renderPost === true ? <CreatePost setRenderPost={setRenderPost}/> : ""}
      </MainDiv>
    );
  }
}
