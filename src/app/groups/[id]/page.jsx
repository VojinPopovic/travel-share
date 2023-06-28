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
import { useContext } from "react";
import { GroupsContext } from "@/context/FollowedGroupsContext";

export default function Group({ params }) {
  const [renderPost, setRenderPost] = useState(false);
  const id = decodeURI(params.id);
  const session = useSession();
  const { setSelectedGroup, groups, unfollowHandler } = useContext(GroupsContext);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: groupPostsData,
    isLoading: isGroupPostsLoading,
    mutate,
  } = useSWR(`/api/posts/group?group=${id}`, fetcher);
  const posts = groupPostsData?.slice().reverse();

  const idToUpper = id.charAt(0).toUpperCase() + id.slice(1);
  const { data: imageData, isLoading: isImageLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${idToUpper}`,
    fetcher
  );

  function reloadData() {
    mutate();
  }

  function openModal() {
    setRenderPost(true);
  }

  async function followHandler() {
    try {
      await fetch(`/api/groups/email`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email,
          groupname: idToUpper,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (isGroupPostsLoading || isImageLoading) {
    <Loading />;
  } else {
    setTimeout(() => {
      function updateGroups() {
        setSelectedGroup(idToUpper);
      }
      updateGroups();
    });
    return (
      <MainDiv>
        <div className="relative w-full h-[200px] border-b-2 border-[rgba(0,0,0,0.68)]">
          <div className="absolute bottom-0 left-0 w-full flex justify-start items-center mb-4 ml-4">
            <div className="h-[80px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mr-2">
              <Image
                className="w-full h-full mx-auto rounded-lg object-cover"
                src={imageData[0]?.flags.svg}
                width={100}
                height={100}
                alt=""
              ></Image>
            </div>
            <p className="text-2xl _text-color font-semibold whitespace-nowrap">
              {idToUpper}
            </p>
          </div>
        </div>
        <section className="w-full px-[3%] pb-4">
          <div className="mt-5 flex gap-2">
            <p className="_text-color text-2xl font-semibold">Group posts</p>
            <button className="_button _card-gradient" onClick={openModal}>
              Create a post
            </button>
            {groups ? (
              <button
                onClick={unfollowHandler}
                className="_button _card-gradient"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={followHandler}
                className="_button _card-gradient"
              >
               Follow the group 
              </button>
            )}
          </div>
          {posts?.map((post) => {
            return (
              <Post post={post} key={post._id} reloadData={reloadData}></Post>
            );
          })}
        </section>
        {renderPost === true ? (
          <CreatePost setRenderPost={setRenderPost} group={params.id} />
        ) : (
          ""
        )}
        <Navigation previousPage="/groups"></Navigation>
      </MainDiv>
    );
  }
}
