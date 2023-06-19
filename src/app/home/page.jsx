"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import MainDiv from "@/components/MainDiv/MainDiv";
import BackgroundImage from "../../../public/homeBackgroundImage.jpg";
import FriendsIcon from "../../../public/friendsIcon.svg";
import GroupsIcon from "../../../public/groupsIcon.svg";
import SavedIcon from "../../../public/savedIcon.svg";
import Post from "@/components/Post/Post";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log(session.status);

  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: postsData, isLoading: isPostsLoading } = useSWR(
    "/api/posts",
    fetcher
  );

  if (session.status === "loading" || isPostsLoading) {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      router?.push("/");
    });
  }
  if (session.status === "authenticated") {
    return (
      <MainDiv maxWidth="900px">
        <div className="relative w-full h-[393.75px]">
          <div className="absolute w-full h-[300px] top-0 left-0 -z-[10]">
            <Image
              className="object-cover"
              src={BackgroundImage}
              priority={true}
              fill={true}
              alt=""
            ></Image>
          </div>
          <div className="absolute w-full bottom-0 flex justify-between px-[3%]">
            <Link href="/friends">
              <div className="w-[250px] aspect-[4/3] _card-gradient rounded-[20px] flex items-center justify-center flex-col hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-1/2 h-1/3">
                  <Image
                    className="w-3/5 mx-auto max-h-[100px]"
                    src={FriendsIcon}
                    alt=""
                  ></Image>
                </div>
                <p className="text-[30px] font-semibold _text-color">Friends</p>
              </div>
            </Link>
            <Link href="/groups">
              <div className="w-[250px] aspect-[4/3] max-w-[250px] _card-gradient rounded-[20px] flex items-center justify-center flex-col hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-1/2 h-1/3">
                  <Image
                    className="w-3/5 mx-auto"
                    src={GroupsIcon}
                    alt=""
                  ></Image>
                </div>
                <p className="text-[30px] font-semibold _text-color">Groups</p>
              </div>
            </Link>
            <Link href="/saved">
              <div className="w-[250px]  aspect-[4/3] max-w-[250px] _card-gradient rounded-[20px] flex items-center justify-center flex-col hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-1/2 h-1/3">
                  <Image
                    className="w-3/5 mx-auto max-h-[50px]"
                    src={SavedIcon}
                    alt=""
                  ></Image>
                </div>
                <p className="text-[30px] font-semibold _text-color">Saved</p>
              </div>
            </Link>
          </div>
        </div>
        <button className="bg-green-400 absolute top-0" onClick={signOut}>
          Sign Out
        </button>
        <section className="w-full px-[3%]">
          <p className="_text-color text-3xl font-semibold mt-5">Featured</p>
          {postsData?.map((post) => {
            return <Post post={post} key={post._id}></Post>;
          })}
        </section>
      </MainDiv>
    );
  }
}
