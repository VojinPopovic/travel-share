"use client";

import { v4 as uuidv4 } from "uuid";
import SearchBar from "@/components/SearchBar/SearchBar";
import GroupCard from "@/components/GroupCard/GroupCard";
import MainDiv from "@/components/MainDiv/MainDiv";
import Navigation from "@/components/Navigation/Navigation";
import { useState, useEffect } from "react";

export default function GroupCsr({ data }) {
  const [searchValue, setSearchValue] = useState("0");
  const [postFilter, setPostFilter] = useState();

  useEffect(() => {
    if (searchValue === "0") {
      setPostFilter(data);
    } else {
      setPostFilter(
        data?.filter((item) =>
          item.name.common.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, data]);

  return (
    <>
      <MainDiv>
        <SearchBar setSearchValue={setSearchValue} />
        <div className="w-full px-[3%]">
          <p className="font-semibold text-2xl _text-color mb-3">
            Browse groups
          </p>
          {postFilter?.map((item) => {
            return <GroupCard key={uuidv4()} item={item} />;
          })}
        </div>
        <Navigation previousPage="/home" />
      </MainDiv>
    </>
  );
}
