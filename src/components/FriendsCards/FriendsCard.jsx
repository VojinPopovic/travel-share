import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Loading from "@/app/loading";

export default function FriendsCard({ item, session }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  function updateEmail() {
    if (session?.data?.user?.email === item.email) {
      return item.addeduser;
    } else if (session?.data?.user?.email === item.addeduser) {
      return item.email;
    }
  }
  const email = updateEmail();

  const { data, isLoading } = useSWR(`/api/users?email=${email}`, fetcher);
  if (isLoading) {
    <Loading />;
  } else {
    return (
      <div className="bg-gray-50 w-full flex justify-start items-center border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-100 my-2">
        <div className="flex items-center">
          <div className="w-[50px] aspect-square rounded-full overflow-hidden m-3">
            {data[0] !== undefined ? (
              <Link href={`/profile/${data[0]?.email}`}>
                <Image
                  className="mx-auto"
                  src={data[0]?.img}
                  width={100}
                  height={100}
                  alt=""
                ></Image>
              </Link>
            ) : (
              ""
            )}
          </div>
          <p className="_text-color font-semibold">{data[0]?.username}</p>
        </div>
      </div>
    );
  }
}
