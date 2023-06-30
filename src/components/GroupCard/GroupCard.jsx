import Link from "next/link";
import Image from "next/image";

export default async function GroupCard({ item }) {
  return (
    <>
      <Link href={`/groups/${item.name.common.toLowerCase()}`}>
        <div className="w-full bg-gray-50 flex justify-start items-center relative border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-100 mb-3">
          <div className="w-1/12 aspect-square rounded-full overflow-hidden m-3 border-purple-600">
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
