"use client";

import useSWR from "swr";
import Loading from "@/app/loading";

export default function page({ params }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading } = useSWR(`/api/posts/group?group=${params.id}`, fetcher);


  if (isLoading) {
    <Loading />;
  } else {
    return (
      <div>
        {data?.map((item) => {
          return <p key={item._id}>{item.title}</p>;
        })}
      </div>
    );
  }
}
