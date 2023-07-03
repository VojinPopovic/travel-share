import Link from "next/link";
import Image from "next/image";
import AcceptIcon from "../../../public/acceptIcon.svg";
import DeclineIcon from "../../../public/declineIcon.svg";

export default function NewReqestCard({ item, mutate }) {
  async function addUser() {
    try {
      await fetch(`/api/friends/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({
          accepted: true,
        }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  }

  async function declineUser() {
    try {
      await fetch(`/api/friends/${item._id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-50 w-full flex justify-between items-center border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-100 my-2">
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
      <div className="mr-3">
        <button onClick={addUser} className="w-[25px] aspect-square mr-3">
          <Image src={AcceptIcon} width={30} height={30} alt=""></Image>
        </button>
        <button onClick={declineUser} className="w-[20px] aspect-square">
          <Image src={DeclineIcon} width={30} height={30} alt=""></Image>
        </button>
      </div>
    </div>
  );
}
