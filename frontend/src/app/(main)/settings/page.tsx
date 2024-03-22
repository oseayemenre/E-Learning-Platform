"use client";

import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

const Settings = () => {
  const { user } = useUserContext();
  const router = useRouter();

  if (!user) return router.push("/auth");
  return <div className="h-screen">Settings</div>;
};

export default Settings;
