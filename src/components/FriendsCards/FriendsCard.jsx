import Link from "next/link";
import Image from "next/image";

export default function FriendsCard({ item }) {
  return (
    <div className="bg-gray-50 w-full flex justify-start items-center border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-100 my-2">
      <div className="flex items-center">
        <div className="w-[50px] aspect-square rounded-full overflow-hidden m-3">
          <Link href={`/profile/${item[0]?.email}`}>
            <Image
              className="mx-auto"
              src={item.userimage}
              width={100}
              height={100}
              alt=""
            ></Image>
          </Link>
        </div>
        <p className="_text-color font-semibold">{item.username}</p>
      </div>
    </div>
  );
}
