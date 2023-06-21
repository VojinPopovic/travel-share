"use client";

import useSWR from "swr";
import Loading from "@/app/loading";
import MainDiv from "@/components/MainDiv/MainDiv";
import Image from "next/image";
import Post from "@/components/Post/Post";

export default function page({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  //const { data: pictureData, isLoading: isPictureLoading } = useSWR(
  //  `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=tokyo&inputtype=textquery&fields=photos&key=""`,
  //   fetcher
  //);
  const { data: groupPostsData, isLoading: isGroupPostsLoading } = useSWR(
    `/api/posts/group?group=${params.id}`,
    fetcher
  );

  const idToUpper = params.id.charAt(0).toUpperCase() + params.id.slice(1);
  const { data: imageData, isLoading: isImageLoading } = useSWR(
    `https://restcountries.com/v3.1/name/${idToUpper}`,
    fetcher
  );

  console.log(imageData);

  if (isGroupPostsLoading) {
    <Loading />;
  } else {
    return (
      <MainDiv>
        <div className="relative w-full h-[400px] border-b-4 border-[rgba(0,0,0,0.68)]">
          <div className="absolute bottom-0 left-0 w-1/3 max-w-[200px] flex justify-start items-center mb-4 ml-4">
            <div className="h-[70px] aspect-square rounded-full border-2 border-[rgba(0,0,0,0.68)] overflow-hidden mr-2">
              <Image
                className="w-full h-full mx-auto rounded-lg object-cover"
                src={imageData[0]?.flags.svg}
                width={40}
                height={40}
                alt=""
              ></Image>
            </div>
            <p className="text-2xl _text-color font-semibold">{idToUpper}</p>
          </div>
        </div>
        <section className="w-full px-[3%] pb-4">
          <p className="_text-color text-2xl font-semibold mt-5">Group posts</p>
          {groupPostsData?.map((post) => {
            return <Post post={post} key={post._id}></Post>;
          })}
        </section>
      </MainDiv>
    );
  }
}
