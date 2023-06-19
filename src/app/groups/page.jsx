import Loading from "@/components/Loading/Loading";
import SearchBar from "@/components/SearchBar/SearchBar";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

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
      {data?.map((item) => {
        return (
          <div
            key={uuidv4()}
            className="relative w-[90%] h-[100px] w-max-[902px] mx-auto flex justify-start items-center _post-border mb-3 rounded-2xl"
          >
            <div className="w-[10%] aspect-square rounded-full m-3 overflow-hidden">
              <Link href={`/groups/${item.name.common}`}>
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
    </MainDiv>
  );
}
