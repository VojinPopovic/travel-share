"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MainDiv from "@/components/MainDiv/MainDiv";
import BackgroundImage from "../../../public/homeBackgroundImage.jpg";
import FriendsIcon from "../../../public/friendsIcon.svg";
import GroupsIcon from "../../../public/groupsIcon.svg";
import SavedIcon from "../../../public/savedIcon.svg";
import Post from "@/components/Post/Post";
import Link from "next/link";
import Loading from "../loading";
import { CreateUser } from "@/components/CreateUser/CreateUser";
import SearchBar from "@/components/SearchBar/SearchBar";
import Navigation from "@/components/Navigation/Navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: postsData,
    isLoading: isPostsLoading,
    mutate,
  } = useSWR("/api/posts/group", fetcher);
  const posts = postsData?.slice().reverse();

  function reloadData() {
    mutate();
  }

  if (session.status === "unauthenticated") {
    setTimeout(() => {
      router?.push("/");
    });
  }

  if (isPostsLoading) {
    return <Loading />;
  } else if (session.status === "authenticated" && !isPostsLoading) {
    setTimeout(() => {
      CreateUser(session);
    });
    return (
      <MainDiv>
        <div className="relative w-full h-[150px] md:h-[393.75px]">
          <div className="w-full h-full mx-auto pt-4 px-[3%] flex items-center justify-between md:h-auto">
            <div className="w-[60px] aspect-square rounded-full overflow-hidden flex items-center justify-center">
              <Link href={`/profile/${session?.data?.user?.email}`}>
                <Image
                  className="w-full h-full object-cover"
                  src={session?.data?.user?.image}
                  width={100}
                  height={100}
                  alt=""
                ></Image>
              </Link>
            </div>
            <SearchBar />
          </div>
          <div className="absolute w-full h-[150px] top-0 left-0 -z-[10] border-[rgba(0,0,0,0.68)] overflow-hidden md:h-[300px] md:rounded-b-xl md:border-2">
            <Image
              className="object-cover"
              src={BackgroundImage}
              priority={true}
              width={1920}
              height={1080}
              alt=""
            ></Image>
          </div>
          <div className="absolute w-full bottom-0 hidden px-[3%] md:flex md:justify-between">
            <Link href={`/friends/${session?.data.user.email}`}>
              <div className="w-[250px] aspect-[4/3] _card-gradient rounded-[20px] flex items-center justify-center flex-col hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-1/2 h-1/3">
                  <Image
                    className="w-3/5 mx-auto max-h-[100px]"
                    src={FriendsIcon}
                    width={30}
                    height={30}
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
                    width={30}
                    height={30}
                    alt=""
                  ></Image>
                </div>
                <p className="text-[30px] font-semibold _text-color">Groups</p>
              </div>
            </Link>
            <Link href={`/saved/${session?.data.user.email}`}>
              <div className="w-[250px]  aspect-[4/3] max-w-[250px] _card-gradient rounded-[20px] flex items-center justify-center flex-col hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-1/2 h-1/3">
                  <Image
                    className="w-3/5 mx-auto max-h-[50px]"
                    src={SavedIcon}
                    width={30}
                    height={30}
                    alt=""
                  ></Image>
                </div>
                <p className="text-[30px] font-semibold _text-color">Saved</p>
              </div>
            </Link>
          </div>
        </div>
        <section className="w-full px-[3%] pb-20">
          <p className="_text-color text-3xl font-semibold mt-5">Home</p>
          {posts?.map((post) => {
            return (
              <Post post={post} reloadData={reloadData} key={post._id}></Post>
            );
          })}
        </section>
        <Navigation className="md:hidden" previousPage={"/"} />
      </MainDiv>
    );
  }
}
