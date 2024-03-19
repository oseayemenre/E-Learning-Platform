"use client";

import { SetStateAction, createContext, useContext, useState } from "react";

interface IUser {
  message: string;
  status: string;

  user: {
    id: string;
    email: string;
    password: string | null;
    role: "STUDENT" | "HOST";
    meetingId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

const UserContext = createContext<{
  user: IUser | null;
  setUser: React.Dispatch<SetStateAction<IUser | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") as string)
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
