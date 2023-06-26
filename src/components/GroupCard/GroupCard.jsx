import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default async function GroupCard({ item }) {
  return (
    <>
      <Link key={uuidv4()} href={`/groups/${item.name.common.toLowerCase()}`}>
        <div className="relative w-full mx-auto flex justify-start items-center _post-border mb-3 rounded-2xl">
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
    </>
  );
}
