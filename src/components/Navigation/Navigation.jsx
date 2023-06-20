import Image from "next/image";
import FriendsIcon from "../../../public/friendsIcon.svg";
import GroupsIcon from "../../../public/groupsIcon.svg";
import SavedIcon from "../../../public/savedIcon.svg";
import BackArrowIcon from "../../../public/backArrowIcon.svg";
import ProfileIcon from "../../../public/profileIcon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter()
  return (
    <div className="w-full h-[50px] _card-gradient fixed top-0 mt-[calc(100vh-50px)] flex justify-around items-center">
      <div onClick={() => router.back()} className="w-10% h-full flex items-center justify-center cursor-pointer">
          <Image src={BackArrowIcon} width={40} height={40} alt=""></Image>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image src={FriendsIcon} width={45} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/groups">
          <Image src={GroupsIcon} width={45} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image src={SavedIcon} width={40} height={40} alt=""></Image>
        </Link>
      </div>
      <div className="w-10% h-full flex items-center justify-center">
        <Link href="/">
          <Image src={ProfileIcon} width={40} height={40} alt=""></Image>
        </Link>
      </div>
    </div>
  );
}
