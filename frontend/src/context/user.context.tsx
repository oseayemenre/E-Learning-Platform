"use client";

import { SetStateAction, createContext, useContext, useState } from "react";

export interface IUser {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string | null;
    role: "STUDENT" | "HOST";
    semester: "FIRST" | "SECOND";
    currentLevel: "HUNDRED" | "TWO_HUNDRED" | "THREE_HUNDRED" | "FOUR_HUNDRED";
    meetingId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

const UserContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
} | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("Context must be used within UserContextProvider");

  return context;
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
