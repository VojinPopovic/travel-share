"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Navigation from "@/components/Navigation/Navigation";
import { useSession } from "next-auth/react";
import NewReqestCard from "@/components/FriendsCards/NewReqestCard";
import FriendsCard from "@/components/FriendsCards/FriendsCard";
import { useState } from "react";
import AddFriends from "@/components/AddFriends/AddFriends";

export default function Friends({ params }) {
  const email = decodeURI(params.id).replaceAll("%40", "@");
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: friendsData,
    isLoading: isPostLoading,
    mutate,
  } = useSWR(`/api/friends`, fetcher);
  const friends = friendsData?.slice().reverse();
  const newRequests = friends?.filter(
    (friend) =>
      friend.accepted === false &&
      friend.addeduser === session?.data?.user?.email
  );
  const userFriends = friends?.filter(
    (friend) =>
      friend.accepted === true &&
      (session?.data?.user?.email === friend.email ||
        session?.data?.user?.email === friend.addeduser)
  );

  const { data: userData, isLoading: isUserLoading } = useSWR(
    `/api/users?email=${email}`,
    fetcher
  );

  if (isUserLoading || isPostLoading) {
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
                {isUserLoading ? "" : userData[0]?.username + "'s friends"}
              </p>
            </div>
            <button
              onClick={() => setIsFriendsOpen(true)}
              className="_button _card-gradient min-w-[100px] bottom-0 mr-4"
            >
              Add friends
            </button>
          </div>
        </div>
        <section className="w-full px-[3%] pb-20 flex flex-col gap-[5%] justify-center sm:w-[500px] md:flex-row md:w-full">
          <div className="mt-5 flex flex-col w-full">
            <p className="_text-color text-2xl font-semibold">New requests</p>
            {newRequests?.length < 1 ? (
              <p>No new requests</p>
            ) : (
              newRequests?.map((post) => {
                return (
                  <NewReqestCard key={post._id} item={post} mutate={mutate} />
                );
              })
            )}
          </div>
          <div className="mt-5 flex flex-col w-full">
            <p className="_text-color text-2xl font-semibold">Friends</p>
            {userFriends?.length < 1 ? (
              <p>Doesn&apos;t have any friends</p>
            ) : (
              userFriends?.map((post) => {
                return (
                  <FriendsCard key={post._id} item={post} session={session} />
                );
              })
            )}
          </div>
          {isFriendsOpen ? (
            <AddFriends setIsFriendsOpen={setIsFriendsOpen} />
          ) : (
            ""
          )}
        </section>
        <Navigation previousPage="/home"></Navigation>
      </MainDiv>
    );
  }
}
