"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Post from "@/components/Post/Post";
import CreatePost from "@/components/CreatePost/CreatePost";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation/Navigation";
import { useContext } from "react";
import { GroupsContext } from "@/context/FollowedGroupsContext";

export default function Group({ params }) {
  const [renderPost, setRenderPost] = useState(false);
  const id = decodeURI(params.id);
  const { setSelectedGroup, groups, unfollowHandler, followHandler } =
    useContext(GroupsContext);

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
  
  useEffect(() => {
    if (renderPost) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [renderPost]);

  function reloadData() {
    mutate();
  }

  function openModal() {
    setRenderPost(true);
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
          <div className="absolute bottom-0 left-0 w-full flex justify-start items-center mb-4">
            <div className="h-[80px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mx-2">
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
        <section className="w-full px-[3%] pb-20">
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
          {posts?.length < 1 ? (
            <p className="mt-5 _text-color">There are no posts in this group, be the first to make one!</p>
          ) : (
            posts?.map((post) => {
              return (
                <Post post={post} key={post._id} reloadData={reloadData}></Post>
              );
            })
          )}
        </section>
        {renderPost === true ? (
          <CreatePost setRenderPost={setRenderPost} group={params.id} reloadData={reloadData} />
        ) : (
          ""
        )}
        <Navigation previousPage="/groups"></Navigation>
      </MainDiv>
    );
  }
}
