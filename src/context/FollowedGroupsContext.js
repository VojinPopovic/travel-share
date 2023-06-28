"use client";

import { createContext } from "react";
import { useState, useEffect } from "react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState("");

  useEffect(() => {
    setGroups([...groups, newGroups]);
  },[newGroups]);

  return (
    <GroupsContext.Provider value={{ groups, setNewGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};
