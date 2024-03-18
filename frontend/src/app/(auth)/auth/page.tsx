"use client";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { useState } from "react";

const Auth = () => {
  const [variant, setVariant] = useState(false);

  if (variant) return <Register handleChange={setVariant} />;

  return <Login handleChange={setVariant} />;
};

export default Auth;
