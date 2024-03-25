"use client";

import { TCourse } from "@/app/(main)/classes/page";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IPinnedPost {
  pinnedPost: TCourse[];
  setPinnedPost: Dispatch<SetStateAction<TCourse[]>>;
}

const PinnedPost = createContext<IPinnedPost | null>(null);

export const usePinnedPost = (): IPinnedPost => {
  const context = useContext(PinnedPost);

  if (!context) {
    throw new Error("Context is null");
  }

  return context;
};

export const PinnedPostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pinnedPost, setPinnedPost] = useState<TCourse[]>([]);

  return (
    <PinnedPost.Provider value={{ pinnedPost, setPinnedPost }}>
      {children}
    </PinnedPost.Provider>
  );
};
