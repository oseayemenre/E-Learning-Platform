"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/context/user.context";

const LoginSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email cannot be empty",
  }),

  password: z.string().min(8, {
    message: "Password cannot be empty",
  }),
});

type TLoginSchema = z.infer<typeof LoginSchema>;

const Login = ({
  handleChange,
}: {
  handleChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<TLoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(LoginSchema),
  });

  const [passwordvisibility, setPasswordVisibility] = useState(false);
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (value: TLoginSchema): Promise<void | string> => {
    const res = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    });

    const data = await res.json();

    if (res.status === 500) return toast.error("Something went wrong");

    if (res.status === 401) return toast.error("Invalid credentials");

    if (res.status === 404) return toast.error("User not found");

    router.push("/");

    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);
  };

  return (
    <main className="flex justify-between">
      <section className="w-1/2">
        <Image
          src="/lernixlg_logo.png"
          width={110}
          height={90}
          alt="Lernix_logo"
          className="mt-[21px] ml-[12px]"
        />

        <div className="mt-[39px] ml-[122px]">
          <div className="mb-[52px]">
            <h2 className="font-[500] text-[30px] mb-[22px]">Sign in</h2>
            <p className="mb-[6px]">If you don’t have an account register</p>
            <p>
              You can{" "}
              <span
                className="text-[#3339ad] font-[600] cursor-pointer"
                onClick={() => handleChange(true)}
              >
                Register here !
              </span>
            </p>
          </div>

          <form
            className="w-[429px] mb-[39px]"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col w-full mb-[49px]">
              <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                Email
              </label>

              <div className="flex gap-x-[10px] items-center mb-[7px]">
                <Image src="/message.svg" width={17} height={17} alt="" />
                <input
                  {...form.register("email")}
                  placeholder="Enter your email address"
                  className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                />
              </div>
              <div className="border-b-[2px]  border-b-[#000842] w-full" />
            </div>

            <div className="flex flex-col w-full mb-[17px]">
              <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                Password
              </label>

              <div className="w-full flex justify-between items-center">
                <div className="flex gap-x-[10px] items-center mb-[7px]">
                  <Image src="/padlock.svg" width={17} height={17} alt="" />
                  <input
                    {...form.register("password")}
                    type={passwordvisibility ? "text" : "password"}
                    placeholder="Enter your Password"
                    className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                  />
                </div>

                {passwordvisibility ? (
                  <IoMdEye
                    size={16}
                    color="#ABABAB"
                    className="cursor-pointer"
                    onClick={() => setPasswordVisibility(false)}
                  />
                ) : (
                  <IoMdEyeOff
                    size={16}
                    color="#ABABAB"
                    className="cursor-pointer"
                    onClick={() => setPasswordVisibility(true)}
                  />
                )}
              </div>
              <div className="border-b-[2px]  border-b-[#000842] w-full" />
            </div>

            <div className="w-full flex justify-between items-center font-[300] text-[12px] mb-[60px]">
              <div className="flex gap-x-[10px] items-center">
                <input type="checkbox" className="w-[15px] h-[15px]" />
                <p>Remember me</p>
              </div>

              <p className="text-[#4D4D4D]">Forgot Password ?</p>
            </div>

            <button
              type="submit"
              className="w-full h-[53px] rounded-[32px] bg-[#1F548D] font-[500] text-[17px] text-white"
            >
              Login
            </button>
          </form>

          <div className="w-[429px] flex flex-col items-center text-[#B5B5B5]">
            <p className="mb-[27px]">or continue with</p>
            <Image
              width={41.46}
              height={41.46}
              src="/google.svg"
              alt=""
              className="mb-[21px]"
            />
          </div>
        </div>
      </section>
      <div className="w-1/2 py-[21px] pr-[22px]">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1F548D] via-[#4591C4] to-[#C2BBF0] rounded-[15px]">
          <Image width={464} height={380} src="/lernixlg_auth.png" alt="" />
        </div>
      </div>
    </main>
  );
};

export default Login;
