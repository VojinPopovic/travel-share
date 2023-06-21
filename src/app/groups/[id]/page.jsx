"use client";

import useSWR from "swr";
import Loading from "@/app/loading";

export default function page({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: groupPostsData, isLoading: isGroupPostsLoading } = useSWR(
    `/api/posts/group?group=${params.id}`,
    fetcher
  );
  //const { data: pictureData, isLoading: isPictureLoading } = useSWR(
  //  `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=tokyo&inputtype=textquery&fields=photos&key=""`,
 //   fetcher
  //);


  if (isGroupPostsLoading) {
    <Loading />;
  } else {
    return (
      <div>
        {groupPostsData?.map((item) => {
          return <p key={item._id}>{item.title}</p>;
        })}
      </div>
    );
  }
}
