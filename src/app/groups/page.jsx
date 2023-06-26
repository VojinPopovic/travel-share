import SearchBar from "@/components/SearchBar/SearchBar";
import MainDiv from "@/components/MainDiv/MainDiv";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";

export async function getGroups() {
  const res = await fetch("https://restcountries.com/v3.1/all", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function Groups() {
  const data = await getGroups();
  return (
    <MainDiv>
      <SearchBar />
      <div className="w-full px-[3%]">
        <p className="font-semibold text-2xl _text-color mb-3">Browse groups</p>
        {data?.map((item) => {
          return (
            <Link key={uuidv4()} href={`/groups/${item.name.common.toLowerCase()}`}>
              <div
                className="relative w-full mx-auto flex justify-start items-center _post-border mb-3 rounded-2xl"
              >
                <div className="w-1/12 aspect-square rounded-full m-3 overflow-hidden">
                  <Image
                    className="w-full h-full mx-auto object-cover"
                    src={item.flags.svg}
                    width={100}
                    height={100}
                    alt=""
                  ></Image>
                </div>
                <p className="_text-color font-semibold">{item.name.common}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Navigation previousPage="/home" />
    </MainDiv>
  );
}
