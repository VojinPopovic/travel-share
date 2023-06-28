"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const session = useSession();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: groupData } = useSWR(
    `/api/groups/email?email=${session?.data?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    const groupUpdate = (groupData) => {
      let isIt = false;
      groupData?.forEach((group) => {
        if (group.groupname === selectedGroup) {
          isIt = true;
        }
      });
      return isIt;
    };
    setGroups(groupUpdate(groupData));
  }, [groupData, selectedGroup]);

  return (
    <GroupsContext.Provider value={{ setSelectedGroup, groups }}>
      {children}
    </GroupsContext.Provider>
  );
};
