"use client";

import SearchSection from "@/components/main/search-section";
import Blob from "@/components/message/blob";
import Image from "next/image";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa6";
import toast from "react-hot-toast";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const messageSchema = z.object({
  message: z.string().min(1),
});

type TMessageSchema = z.infer<typeof messageSchema>;
interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  role: "STUDENT" | "LECTURER";
  semester: "FIRST" | "SECOND";
  currentLevel: "HUNDRED" | "TWO_HUNDRED" | "THREE_HUNDRED" | "FOUR_HUNDRED";
  meetingId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
interface IUsers {
  users: IUser[];
}

interface IUSer {
  lecturers: IUser[];
  students: IUser[];
}

interface IMessage {
  id: string;
  senderId: string;
  recieverId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const Messages = () => {
  const form = useForm<TMessageSchema>({
    defaultValues: {
      message: "",
    },

    resolver: zodResolver(messageSchema),
  });

  const [users, setUsers] = useState<IUSer>({
    lecturers: [],
    students: [],
  });

  const [showConversations, setShowConversations] = useState<boolean | string>(
    false
  );

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = async (values: TMessageSchema) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/messages/${selectedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values.message,
        }),

        credentials: "include",
      }
    );

    if (!res.ok) return toast.error("Something went wrong");

    setMessages([...messages, values.message]);
    toast.success("Message sent");
    return form.reset();
  };

  console.log(messages);

  useEffect(() => {
    const handleFetch = async () => {
      const res = await fetch("http://localhost:8000/api/v1/messages/users", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) return toast.error("Something went wrong");

      const data = (await res.json()) as IUsers;

      const filteredLecturers = data.users?.filter(
        (lecturer) => lecturer.role === "LECTURER"
      );

      const filteredStudents = data.users?.filter(
        (student) => student.role === "STUDENT"
      );

      setUsers({
        ...users,
        lecturers: filteredLecturers,
        students: filteredStudents,
      });
    };

    handleFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = useUserContext();
  const router = useRouter();

  if (!user) return router.push("/auth");

  const fromMe = true;

  return (
    <div className="flex ml-[26px] mb-6 justify-between">
      <section className="w-2/3 mt-[44px] mb-[46px] h-screen ">
        <SearchSection />

        {showConversations ? (
          <div className="w-[768px] h-[683px] relative bg-white rounded-[24px] pl-[29px] pr-[60px] pt-3 mb-[28px]">
            <div className="flex gap-x-[17px] items-center mb-[28px]">
              <Image src="/mercy.svg" width={55} height={55} alt="" />
              <p className="font-[700] text-[22px] text-[#6A6E74]">
                {showConversations}
              </p>
            </div>

            <div
              className={`w-full flex flex-col gap-y-6 h-[75%] ${
                fromMe ? "items-end" : "flex items-start"
              }`}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`ml-[55px] text-white ${
                    fromMe ? "bg-[#0e3aff]" : "bg-[#DBE0EE]"
                  } w-[185px] py-5 rounded-[24px] px-4`}
                >
                  {message}
                </div>
              ))}
            </div>

            <div className="w-full">
              <form
                onSubmit={form.handleSubmit(handleSendMessage)}
                className="flex justify-between gap-x-2 items-center w-[90%] bg-[#e5e5e5] rounded-full py-3 px-6 mx-auto absolute bottom-4"
              >
                <input
                  type="text"
                  className="focus:outline-none bg-transparent w-full"
                  {...form.register("message")}
                />
                <button
                  type="submit"
                  className="w-8 h-8 bg-[#1F548D] rounded-full flex items-center justify-center"
                >
                  <PiPaperPlaneRightFill size={18} color="white" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>NO coversation selected</div>
        )}
      </section>

      <section className="mt-[180px] w-1/3 flex justify-center overflow-hidden">
        {users.lecturers.length < 1 || users.students.length < 1 ? (
          <motion.div
            animate={{
              rotate: 360,
              transition: {
                repeat: Infinity,
                duration: 1.5,
              },
            }}
            className="flex justify-center items-center"
          >
            <FaSpinner size={48} />
          </motion.div>
        ) : (
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col items-start">
              <h3 className="font-[500] mb-2">Lecturers</h3>
              <div className="flex flex-col gap-y-2">
                {users.lecturers.map((lecturer: IUser, index: number) => (
                  <Blob
                    id={lecturer.id}
                    key={index}
                    name={`${lecturer.lastName} ${lecturer.firstName}`}
                    showConversations={setShowConversations}
                    setId={setSelectedUserId}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start  w-[240px]">
              <h3 className="font-[500] mb-2 text-left">Students</h3>
              <div className="flex flex-col gap-y-2">
                {users.students.map((lecturer: IUser, index: number) => (
                  <Blob
                    id={lecturer.id}
                    key={index}
                    name={`${lecturer.lastName} ${lecturer.firstName}`}
                    showConversations={setShowConversations}
                    setId={setSelectedUserId}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Messages;
