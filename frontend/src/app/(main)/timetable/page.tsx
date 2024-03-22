"use client";

import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/router";

const Timetable = () => {
  const { user } = useUserContext();
  const router = useRouter();

  if (!user) return router.push("/auth");

  return <div className="h-screen">Timetable</div>;
};

export default Timetable;
