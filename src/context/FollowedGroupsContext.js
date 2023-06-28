"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: groupData, mutate } = useSWR(
    `/api/groups/email?email=${session?.data?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    const groupUpdate = (groupData) => {
      let isIt = false;
      groupData?.forEach((group) => {
        if (group.groupname === selectedGroup) {
          isIt = true;
          setSelectedGroupId(group._id);
        }
      });
      return isIt;
    };
    setGroups(groupUpdate(groupData));
  }, [groupData, selectedGroup]);

  async function unfollowHandler() {
    try {
      await fetch(`/api/groups/${selectedGroupId}`, { method: "DELETE" });
      mutate();
    } catch (error) {
      console.log(err);
    }
  }

  return (
    <GroupsContext.Provider
      value={{ setSelectedGroup, groups, unfollowHandler }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
