"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function AddFriends({ setIsFriendsOpen }) {
  const session = useSession();

  function closeModal() {
    setIsFriendsOpen(false);
  }
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: usersData, isLoading } = useSWR(`/api/users`, fetcher);
  const { data: friendsData, mutate } = useSWR(`/api/friends`, fetcher);

  async function addUser(addedUserEmail) {
    try {
      await fetch("/api/friends", {
        method: "POST",
        body: JSON.stringify({
          email: session?.data?.user?.email,
          addeduser: addedUserEmail,
          username: session?.data?.user?.name,
          userimage: session?.data?.user?.image,
          accepted: false,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let addedUserEmail = e.target[0].value;

    let friendsOneStepOne = friendsData?.filter(
      (item) => item.addeduser === addedUserEmail
    );
    let friendsOneStepTwo = friendsOneStepOne.filter(
      (item) => item.email === session?.data?.user?.email
    );

    let friendsTwoStepOne = friendsData?.filter(
      (item) => item.email === addedUserEmail
    );
    let friendsTwoStepTwo = friendsTwoStepOne.filter(
      (item) => item.addeduser === session?.data?.user?.email
    );
    let filterUser = usersData?.filter((item) => item.email === addedUserEmail);

    if (filterUser.length > 0) {
      if (friendsData.length < 1) {
        addUser(addedUserEmail);
      } else {
        if (addedUserEmail === session?.data?.user?.email) {
          alert("Can't add yourself!");
        } else {
          if (friendsOneStepTwo < 1 && friendsTwoStepTwo < 1) {
            addUser(addedUserEmail);
            alert("User added");
            e.target.reset()
          } else {
            alert("You are already friends with that user, or have a request pending");
          }
        }
      }
      mutate();
    } else {
      alert("user not found");
    }
  }

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12 z-10"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[98%] py-3 max-w-[600px] mx-auto"
        >
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 _accent-color-bg rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">
                  i
                </div>
                <div className="block pl-2 font-semibold text-xl self-start _text-color">
                  <h2 className="leading-relaxed">Add a friend</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Search for a friend by their email adress
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 _text-color sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Email</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="johnjohnson@gmail.com"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={closeModal}
                    className="flex justify-center items-center w-full _text-color px-4 py-3 rounded-md focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="rgba(0,0,0,0.68)"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Cancel
                  </button>
                  <button
                    className="_accent-color-bg flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    type="submit"
                  >
                   Add friend 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
