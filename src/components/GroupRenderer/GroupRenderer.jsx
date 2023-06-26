import { useState, useEffect } from "react";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupRenderer({ group }) {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${group.groupname}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        setErr(true);
      }

      const data = await res.json();

      setData(data);
      setIsLoading(false);
    };
    getData();
  }, [group]);
  return (
    <>
      {data?.map((item) => {
        return <GroupCard item={item} />;
      })}
    </>
  );
}
