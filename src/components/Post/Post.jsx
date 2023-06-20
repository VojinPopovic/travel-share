import { useEffect, useState } from "react";
import ProfileIcon from "../../../public/profileIcon.svg";
import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  const [flag, setFlag] = useState("");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${post.group}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        setErr(true);
      }

      const data = await res.json();

      setData(data);
      setIsLoading(false);
    };
    getData();
  }, [post]);

  return (
    <div className="w-full _post-border rounded-lg mt-5">
      <div className="flex justify-between py-3 px-4">
        <div className="flex flex-col justify-start w-[10%] pr-4 gap-2">
          <div className="w-full">
            <Link href="/">
              <Image
                className="w-full mx-auto"
                src={ProfileIcon}
                alt=""
              ></Image>
            </Link>
          </div>
          <div className="w-full aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden">
            <Link href={`/groups/${data[0]?.name.common.toLowerCase()}`}>
              <img
                className="w-full h-full mx-auto rounded-lg object-cover"
                src={data[0]?.flags.svg}
                alt=""
              ></img>
            </Link>
          </div>
        </div>
        <div className="w-[90%]">
          <p className="text-xl font-semibold _text-color">{post.title}</p>
          <p className="_text-color font-medium">{post.content}</p>
        </div>
      </div>
      <div className="flex pb-3 pl-5">
        <div>❤️</div>
        <p className="_text-color font-medium">2200 likes</p>
      </div>
    </div>
  );
}
