import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

enum Level {
  HUNDRED = 100,
  TWOHUNDRED = 200,
  THREEHUNDRED = 300,
  FOURHUNDRED = 400,
  FIVEHUNDRED = 500,
}

console.log(Level.FIVEHUNDRED);

enum Role {
  STUDENT,
  LECTURER,
}

enum Semester {
  FIRST = 1,
  SECOND = 2,
}

const RegisterSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email cannot be empty",
  }),

  password: z.string().min(8, {
    message: "Password cannot be empty",
  }),

  confirmPassword: z.string().min(8, {
    message: "Confirm password cannot be empty",
  }),

  currentLevel: z.nativeEnum(Level),

  semester: z.nativeEnum(Semester),

  course: z.string().min(1, {
    message: "Course cannot be empty",
  }),
});

type TRegisterSchema = z.infer<typeof RegisterSchema>;
type TRole = "STUDENT" | "LECTURER";

const Register = ({
  handleChange,
}: {
  handleChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<TRegisterSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      currentLevel: undefined,
      semester: undefined,
      course: "",
    },

    resolver: zodResolver(RegisterSchema),
  });

  const [passwordvisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [role, setRole] = useState<TRole>("STUDENT");

  const handleSubmit = async (value: TRegisterSchema) => {
    console.log("submit");
    if (value.password !== value.confirmPassword)
      return toast.error("Password must match");

    const res = await fetch(
      "http://localhost:8000/api/v1/users/create-account",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          currentLevel: value.currentLevel,
          semester: value.semester,
          course: value.course,
        }),
      }
    );

    if (!res.ok) return toast.error("Cannot create account");
  };

  return (
    <main className="flex justify-between">
      <section className="w-5/6 mb-[20px]">
        <Image
          src="/lernixlg_logo.png"
          width={110}
          height={90}
          alt="Lernix_logo"
          className="my-[21px] ml-[12px]"
        />

        <div className="flex justify-between pl-[123px] pr-[41px] items-start">
          <div>
            <div className="mb-[52px]">
              <h2 className="font-[500] text-[30px] mb-[22px]">Sign up</h2>
              <p className="mb-[6px]">If you don’t have an account</p>
              <p>
                You can{" "}
                <span
                  className="text-[#3339ad] font-[600] cursor-pointer"
                  onClick={() => handleChange(false)}
                >
                  Login here !
                </span>
              </p>
            </div>

            <form className="w-[429px] mb-[39px]">
              <div className="flex flex-col w-full mb-[42px]">
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

              <div className="flex flex-col w-full mb-[42px]">
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

              <div className="flex flex-col w-full mb-[42px]">
                <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                  Confirm Password
                </label>

                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-x-[10px] items-center mb-[7px]">
                    <Image src="/padlock.svg" width={17} height={17} alt="" />
                    <input
                      {...form.register("confirmPassword")}
                      type={confirmPasswordVisibility ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                    />
                  </div>

                  {confirmPasswordVisibility ? (
                    <IoMdEye
                      size={16}
                      color="#ABABAB"
                      className="cursor-pointer"
                      onClick={() => setConfirmPasswordVisibility(false)}
                    />
                  ) : (
                    <IoMdEyeOff
                      size={16}
                      color="#ABABAB"
                      className="cursor-pointer"
                      onClick={() => setConfirmPasswordVisibility(true)}
                    />
                  )}
                </div>
                <div className="border-b-[2px]  border-b-[#000842] w-full" />
              </div>

              <div className="flex flex-col w-full mb-[42px]">
                <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                  Course
                </label>

                <div className="flex gap-x-[10px] items-center mb-[7px]">
                  <Image src="/message.svg" width={17} height={17} alt="" />
                  <input
                    {...form.register("course")}
                    placeholder="Enter your Course"
                    className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                  />
                </div>
                <div className="border-b-[2px]  border-b-[#000842] w-full" />
              </div>
            </form>
          </div>

          <div className="mt-[55px] mb-[37px]">
            <p className="mb-[68px]">
              Are you a Student or{" "}
              <span className="text-[#1F548D]">Lecturer?</span>
            </p>

            <div className="w-[314px] h-[83px] bg-[#C5CBE6] rounded-[32px] p-6 flex justify-between items-center drop-shadow-[0_4px_26px_rgba(0,0,0,0.25)] text-white">
              <button
                className={`w-[142px] ${
                  role === "STUDENT"
                    ? "bg-[#738DFE] h-[36px] rounded-full text-white drop-shadow-[0_4px_26px_rgba(0,0,0,0.25)] duration-150 transition ease"
                    : null
                }`}
                onClick={() => setRole("STUDENT")}
              >
                Student
              </button>
              <button
                className={`w-[142px] ${
                  role === "LECTURER"
                    ? "bg-[#738DFE] h-[36px] rounded-full text-white drop-shadow-[0_4px_26px_rgba(0,0,0,0.25)] duration-150 transition ease"
                    : null
                }`}
                onClick={() => setRole("LECTURER")}
              >
                Lecturer
              </button>
            </div>

            <form
              className="w-[429px] mb-[39px] mt-[37px]"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-col w-full mb-[42px]">
                <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                  Current Level
                </label>

                <div className="flex gap-x-[10px] items-center mb-[7px]">
                  <Image src="/message.svg" width={17} height={17} alt="" />
                  <input
                    {...form.register("currentLevel")}
                    placeholder="Enter your Current Level"
                    className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                  />
                </div>
                <div className="border-b-[2px]  border-b-[#000842] w-full" />
              </div>

              <div className="flex flex-col w-full mb-[42px]">
                <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                  Current Semester
                </label>

                <div className="flex gap-x-[10px] items-center mb-[7px]">
                  <Image src="/message.svg" width={17} height={17} alt="" />
                  <input
                    {...form.register("semester")}
                    placeholder="Enter your Current Semester"
                    className="text-[#000842] placeholder:text-[#000842] focus:outline-none w-full "
                  />
                </div>
                <div className="border-b-[2px]  border-b-[#000842] w-full" />
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center ">
          <button
            className="w-[429px] h-[53px] bg-[#1F548D] text-white rounded-[32px]"
            onClick={() => form.handleSubmit(handleSubmit)}
          >
            Register
          </button>
        </div>
      </section>

      <section className="w-1/6 pt-[26px] pr-[15px] pb-[15px]">
        <div className="bg-gradient-to-b from-[#1F548D] via-[#4591C4] to-[#C2BBF0] rounded-[15px] h-full" />
      </section>
    </main>
  );
};

export default Register;
