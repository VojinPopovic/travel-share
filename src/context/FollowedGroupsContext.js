"use client";

import { createContext } from "react";
import { useState } from "react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const toggle = () => {
    setGroups([...groups]);
  };

  return (
    <GroupsContext.Provider value={{ toggle, mode }}>
      {children}
    </GroupsContext.Provider>
  );
};
