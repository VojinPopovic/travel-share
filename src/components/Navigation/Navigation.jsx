"use client"

import Image from "next/image";
import FriendsIcon from "../../../public/friendsIcon.svg";
import GroupsIcon from "../../../public/groupsIcon.svg";
import SavedIcon from "../../../public/savedIcon.svg";
import BackArrowIcon from "../../../public/backArrowIcon.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navigation({ previousPage }) {
  const session = useSession();

  return (
    <div className="w-full h-[50px] _card-gradient fixed top-0 left-0 mt-[calc(100vh-50px)] flex justify-center">
      <div className="w-full h-full max-w-[900px] flex justify-around items-center">
        <div className="w-10% h-full flex items-center justify-center cursor-pointer">
          <Link href={previousPage}>
            <Image
              className="w-auto h-auto max-h-[30px]"
              src={BackArrowIcon}
              width={40}
              height={40}
              alt=""
            ></Image>
          </Link>
        </div>
        <div className="w-10% h-full flex items-center justify-center">
          <Link href="/">
            <Image
              className="w-auto h-auto max-h-[30px]"
              src={FriendsIcon}
              width={45}
              height={40}
              alt=""
            ></Image>
          </Link>
        </div>
        <div className="w-10% h-full flex items-center justify-center">
          <Link href="/groups">
            <Image
              className="w-auto h-auto max-h-[30px]"
              src={GroupsIcon}
              width={45}
              height={40}
              alt=""
            ></Image>
          </Link>
        </div>
        <div className="w-10% h-full flex items-center justify-center">
          <Link href="/">
            <Image
              className="w-auto h-auto max-h-[30px]"
              src={SavedIcon}
              width={40}
              height={40}
              alt=""
            ></Image>
          </Link>
        </div>
        <div className="w-[35px] aspect-square rounded-full overflow-hidden flex items-center justify-center">
          <Link href={`/profile/${session?.data?.user?.email}`}>
            <Image
              className="w-full h-full object-cover"
              src={session?.data?.user?.image}
              width={50}
              height={50}
              alt=""
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
