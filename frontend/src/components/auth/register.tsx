"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdEye, IoMdEyeOff, IoIosArrowUp } from "react-icons/io";
import { MdOutlineSchool } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
});

const DropdownItems = [
  {
    title: "Software Engineering",
    click: "SOFTWARE ENGINEERING",
  },

  {
    title: "Computer Science",
    click: "COMPUTER SCIENCE",
  },

  {
    title: "Computer Technology",
    click: "COMPUTER TECHNOLOGY",
  },

  {
    title: "Computer Information System",
    click: "COMPUTER INFORMATION SYSTEM",
  },

  {
    title: "Information Technology",
    click: "INFORMATION TECHNOLOGY",
  },
] as const;

const StudentLevel = ["100", "200", "300", "400"] as const;
const currentSemester = ["FIRST", "SECOND"] as const;

type TRegisterSchema = z.infer<typeof RegisterSchema>;
type TRole = "STUDENT" | "LECTURER";
type TCourse =
  | "COMPUTER SCIENCE"
  | "SOFTWARE ENGINEERING"
  | "COMPUTER TECHNOLOGY"
  | "COMPUTER INFORMATION SYSTEM"
  | "INFORMATION TECHNOLOGY"
  | "Select Course Of Study";
type TDropdownCourses = (typeof DropdownItems)[number];

type TLevel = (typeof StudentLevel)[number] | "Select Level";

type TSemester =
  | (typeof currentSemester)[number]
  | "Enter your Current Semester";

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
    },

    resolver: zodResolver(RegisterSchema),
  });

  const [passwordvisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [role, setRole] = useState<TRole>("STUDENT");
  const [level, setLevel] = useState<TLevel>("Select Level");
  const [toggleCourses, setToggleCourses] = useState(false);
  const [course, setCourse] = useState<TCourse>("Select Course Of Study");
  const [toggleLevel, setToggleLevel] = useState(false);
  const [toggleSemester, setToggleSemester] = useState(false);
  const [semester, setSemester] = useState<TSemester>(
    "Enter your Current Semester"
  );

  const currentLevel =
    level === "100"
      ? "HUNDRED"
      : level === "200"
      ? "TWO_HUNDRED"
      : level === "300"
      ? "THREE_HUNDRED"
      : level === "400"
      ? "FOUR_HUNDRED"
      : null;

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
          currentLevel,
          semester,
          course: course.split(/\s+/).join("_"),
          role,
        }),
      }
    );

    if (!res.ok) return toast.error("Cannot create account");
  };

  return (
    <main className="flex justify-between ">
      <section className="w-5/6 mb-[20px]">
        <Image
          src="/lernixlg_logo.png"
          width={110}
          height={90}
          alt="Lernix_logo"
          className="my-[21px] ml-[12px]"
        />

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
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

                <div className="w-[429px] mb-[39px]">
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
                        <Image
                          src="/padlock.svg"
                          width={17}
                          height={17}
                          alt=""
                        />
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
                        <Image
                          src="/padlock.svg"
                          width={17}
                          height={17}
                          alt=""
                        />
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

                  <div className="relative">
                    {toggleCourses && (
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{ opacity: 1 }}
                        className="w-full h-[200px] absolute top-[60px] bg-[#C5CBE6] rounded-[5px] flex flex-col gap-y-1"
                      >
                        {DropdownItems.map(
                          (items: TDropdownCourses, index: number) => (
                            <div
                              className="px-6 pt-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                              key={index}
                              onClick={() => setCourse(items.click)}
                            >
                              {items.title}
                            </div>
                          )
                        )}
                      </motion.div>
                    )}

                    <div className="flex flex-col w-full mb-[42px]">
                      <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                        Course
                      </label>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-x-[10px] items-center mb-[7px]">
                          <MdOutlineSchool size={17} />
                          <p>{course}</p>
                        </div>

                        <IoIosArrowUp
                          size={17}
                          className={`cursor-pointer duration-150 ease ${
                            toggleCourses ? "rotate-180" : "rotate-0"
                          }`}
                          onClick={() => setToggleCourses(!toggleCourses)}
                        />
                      </div>
                      <div className="border-b-[2px]  border-b-[#000842] w-full" />
                    </div>
                  </div>
                </div>
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

                <div>
                  <div className="w-[429px] mb-[39px] mt-[37px]">
                    <div className="relative">
                      {toggleLevel && (
                        <motion.div
                          initial={{
                            opacity: 0,
                          }}
                          animate={{ opacity: 1 }}
                          className="w-full h-[150px] absolute top-[60px] bg-[#C5CBE6] z-50 rounded-[5px] flex flex-col gap-y-1"
                        >
                          {StudentLevel.map((items: TLevel, index: number) => (
                            <div
                              className="px-6 pt-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                              key={index}
                              onClick={() => setLevel(items)}
                            >
                              {items}
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {role === "STUDENT" && (
                        <div className="flex flex-col w-full mb-[42px]">
                          <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                            Level
                          </label>

                          <div className="flex justify-between items-center">
                            <div className="flex gap-x-[10px] items-center mb-[7px]">
                              <MdOutlineSchool size={17} />
                              <p>{level}</p>
                            </div>

                            <IoIosArrowUp
                              size={17}
                              className={`cursor-pointer duration-150 ease ${
                                toggleLevel ? "rotate-180" : "rotate-0"
                              }`}
                              onClick={() => setToggleLevel(!toggleLevel)}
                            />
                          </div>
                          <div className="border-b-[2px]  border-b-[#000842] w-full" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col w-full mb-[42px]">
                      <div className="relative">
                        {toggleSemester && (
                          <motion.div
                            initial={{
                              opacity: 0,
                            }}
                            animate={{ opacity: 1 }}
                            className="w-full h-[100px] absolute top-[60px] bg-[#C5CBE6] rounded-[5px] flex flex-col gap-y-1"
                          >
                            {currentSemester.map(
                              (items: TSemester, index: number) => (
                                <div
                                  className="px-6 pt-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                                  key={index}
                                  onClick={() => setSemester(items)}
                                >
                                  {items}
                                </div>
                              )
                            )}
                          </motion.div>
                        )}

                        <div className="flex flex-col w-full mb-[42px]">
                          <label className="mb-[11px] font-[500] text-[13px] text-[#999999]">
                            Semester
                          </label>

                          <div className="flex justify-between items-center">
                            <div className="flex gap-x-[10px] items-center mb-[7px]">
                              <MdOutlineSchool size={17} />
                              <p>{semester}</p>
                            </div>

                            <IoIosArrowUp
                              size={17}
                              className={`cursor-pointer duration-150 ease ${
                                toggleSemester ? "rotate-180" : "rotate-0"
                              }`}
                              onClick={() => setToggleSemester(!toggleSemester)}
                            />
                          </div>
                          <div className="border-b-[2px]  border-b-[#000842] w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className=" bg-blue-800">
              Register
            </button>
          </div>
        </form>
      </section>

      <section className="w-1/6 pt-[26px] pr-[15px] pb-[15px]">
        <div className="bg-gradient-to-b from-[#1F548D] via-[#4591C4] to-[#C2BBF0] rounded-[15px] h-full" />
      </section>
    </main>
  );
};

export default Register;
