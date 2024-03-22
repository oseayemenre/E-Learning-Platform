"use client";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { useState } from "react";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [variant, setVariant] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();

  if (user) return router.push("/");

  if (variant) return <Register handleChange={setVariant} />;

  return <Login handleChange={setVariant} />;
};

export default Auth;
