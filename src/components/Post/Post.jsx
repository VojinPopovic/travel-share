import IcelandIcon from "../../../public/icelandIcon.svg";
import ProfileIcon from "../../../public/profileIcon.svg";
import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="w-full _post-border rounded-lg mt-5">
      <div className="flex justify-between py-3 px-4">
        <div className="flex flex-col justify-start w-[10%] pr-4 gap-2">
          <div className="w-full">
            <Link href="/">
              <Image
                className="w-[80%] mx-auto"
                src={ProfileIcon}
                alt=""
              ></Image>
            </Link>
          </div>
          <div className="w-full">
            <Link href="/">
              <Image
                className="w-[80%] mx-auto"
                src={IcelandIcon}
                alt=""
              ></Image>
            </Link>
          </div>
        </div>
        <div className="w-[90%]">
          <p className="text-xl font-semibold _text-color">{post.title}</p>
          <p className="_text-color font-medium">{post.desc}</p>
        </div>
      </div>
      <div className="flex pb-3 pl-5">
        <div>❤️</div>
        <p className="_text-color font-medium">2200 likes</p>
      </div>
    </div>
  );
}
