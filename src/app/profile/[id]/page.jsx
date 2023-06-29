"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Post from "@/components/Post/Post";
import Navigation from "@/components/Navigation/Navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import GroupRenderer from "@/components/GroupRenderer/GroupRenderer";
import { CreateComment } from "@/components/CreateComment/CreateComment";
import Comment from "@/components/Comment/Comment";
import { useRouter } from "next/navigation";

export default function Profile({ params }) {
  const email = decodeURI(params.id).replaceAll("%40", "@");
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: postData,
    isLoading: isPostLoading,
    mutate,
  } = useSWR(`/api/posts/email?email=${email}`, fetcher);
  const posts = postData?.slice().reverse();

  const { data: userData, isLoading: isUserLoading } = useSWR(
    `/api/users?email=${email}`,
    fetcher
  );

  const { data: groupData } = useSWR(
    `/api/groups/email?email=${email}`,
    fetcher
  );

  const { data: commentData, mutate: commentsMutate } = useSWR(
    `/api/comments/profile?email=${email}`,
    fetcher
  );

  function reloadData() {
    mutate()
  }
  function reloadComments() {
    setTimeout(() => commentsMutate(), "1000");
  }

  function postCommentHandler(e) {
    e.preventDefault();
    const profileEmail = email;
    const comment = e.target[0].value;
    CreateComment(comment, profileEmail, session);
    e.target[0].value = "";
  }

  if (isUserLoading) {
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
                  src={userData[0]?.img}
                  width={100}
                  height={100}
                  alt=""
                ></Image>
              </div>
              <p className="text-md _text-color font-semibold whitespace-nowrap text-2xl">
                {isUserLoading ? "" : userData[0]?.username}
              </p>
            </div>
            {session?.data?.user?.email === userData[0]?.email ? (
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
        <section className="w-full px-[3%] pb-20">
          <div className="mt-5 flex gap-2">
            <p className="_text-color text-2xl font-semibold">Posts</p>
          </div>
          {posts?.length < 1 ? (
            <p>Hasn&apos;t made any posts yet</p>
          ) : (
            posts?.map((post) => {
              return (
                <Post post={post} key={post._id} reloadData={reloadData}></Post>
              );
            })
          )}
          <div className="mt-5 flex">
            <p className="_text-color text-2xl font-semibold mb-4">
              Followed groups
            </p>
          </div>
          {groupData?.length < 1 ? (
            <p>Not following any groups</p>
          ) : (
            groupData?.map((group) => {
              return <GroupRenderer key={group._id} group={group} />;
            })
          )}
          <div className="mt-5 flex">
            <p className="_text-color text-2xl font-semibold mb-4">Comments</p>
          </div>
          <form
            onSubmit={(e) => {
              postCommentHandler(e), reloadComments();
            }}
          >
            <div className="flex flex-col">
              <label className="leading-loose _text-color">Post Comment</label>
              <textarea
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Title"
              />
            </div>
            <button
              className="_accent-color-bg justify-center items-center w-max-[200px] text-white px-4 py-3 mt-3 rounded-md focus:outline-none"
              type="submit"
            >
              Create
            </button>
          </form>
          <div className="mt-4">
            {commentData?.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  post={comment}
                  profileEmail={email}
                  reloadData={reloadComments}
                />
              );
            })}
          </div>
        </section>
        <Navigation previousPage="/home"></Navigation>
      </MainDiv>
    );
  }
}
