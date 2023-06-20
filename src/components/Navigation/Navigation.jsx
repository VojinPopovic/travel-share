import Image from "next/image";
import FriendsIcon from "../../../public/friendsIcon.svg";
import GroupsIcon from "../../../public/groupsIcon.svg";
import SavedIcon from "../../../public/savedIcon.svg";
import BackArrowIcon from "../../../public/backArrowIcon.svg";
import ProfileIcon from "../../../public/profileIcon.svg";
import Link from "next/link";

export default function Navigation({previousPage}) {
  return (
    <div className="w-full h-[50px] _card-gradient fixed top-0 mt-[calc(100vh-50px)] flex justify-around items-center">
      <div className="w-10% h-full flex items-center justify-center cursor-pointer">
        <Link href={previousPage}>
          <Image className="w-auto h-auto max-h-[30px]" src={BackArrowIcon} width={40} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image className="w-auto h-auto max-h-[30px]" src={FriendsIcon} width={45} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/groups">
          <Image className="w-auto h-auto max-h-[30px]" src={GroupsIcon} width={45} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image className="w-auto h-auto max-h-[30px]" src={SavedIcon} width={40} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image className="w-auto h-auto max-h-[35px]" src={ProfileIcon} width={40} height={40} alt=""></Image>
        </Link>
      </div>
    </div>
  );
}
