"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import MainDiv from "@/components/MainDiv/MainDiv";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Navigation from "@/components/Navigation/Navigation";

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
            <div
              key={uuidv4()}
              className="relative w-full mx-auto flex justify-start items-center _post-border mb-3 rounded-2xl"
            >
              <div className="w-[10%] aspect-square rounded-full m-3 overflow-hidden">
                <Link href={`/groups/${item.name.common.toLowerCase()}`}>
                  <img
                    className="w-full h-full mx-auto object-cover"
                    src={item.flags.svg}
                    alt=""
                  ></img>
                </Link>
              </div>
              <p className="_text-color font-semibold">{item.name.common}</p>
            </div>
          );
        })}
      </div>
      <Navigation/>
    </MainDiv>
  );
}
