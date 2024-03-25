"use client";

import Profile from "@/components/main/profile";
import SearchSection from "@/components/main/search-section";
import { useState } from "react";
import { useUserContext } from "@/context/user.context";

type TOption = "Feed" | "Meetings" | "Notepad";

const Course = ({ params }: { params: { id: string } }) => {
  const [options, setOptions] = useState<TOption>("Feed");

  const { user } = useUserContext();

  return (
    <div className="flex justify-between ml-[26px]">
      <section className="w-2/3 mt-[44px] mb-[36px] h-full">
        <SearchSection />

        <p className="text-[24px] font-[500] mb-9">
          {params.id.split("-").join(" ")}
        </p>

        <div className="flex items-center justify-start gap-x-4 font-[700] text-[22px] mb-[18px]">
          <p
            className={`cursor-pointer ${
              options === "Feed" ? "text-black" : "text-[#8a8a8a]"
            }`}
            onClick={() => setOptions("Feed")}
          >
            Feed
          </p>
          <div className="h-[40px] bg-[#bfbfbf] w-[2px]" />
          <p
            className={`cursor-pointer ${
              options === "Meetings" ? "text-black" : "text-[#8a8a8a]"
            }`}
            onClick={() => setOptions("Meetings")}
          >
            Meetings
          </p>
          <div className="h-[40px] bg-[#bfbfbf] w-[2px]" />
          <p
            className={`cursor-pointer ${
              options === "Notepad" ? "text-black" : "text-[#8a8a8a]"
            }`}
            onClick={() => setOptions("Notepad")}
          >
            Notepad
          </p>
        </div>

        {options === "Feed" && (
          <div className="w-[768px] h-[318px] bg-white rounded-[24px] pt-[12px]">
            <div className="ml-[29px] mr-[12px] flex items-center gap-x-[18px]">
              <div className="w-[82px] h-[82px] rounded-full bg-[#4591C4] flex items-center justify-center text-[24px] text-white">
                {user?.user.lastName.charAt(0)}
              </div>

              <div className="text-[22px] mb-[35px]">
                {user?.user.lastName} {user?.user.firstName}
              </div>
            </div>

            <textarea
              placeholder="Text Input Field"
              className="w-[80%] h-[70%] ml-[120px] text-[14px] focus:outline-none"
            />
          </div>
        )}

        {options === "Meetings" && (
          <div className="w-[1057px] h-[619px] bg-white rounded-[24px] pt-[12px] flex items-center justify-center">
            <div className="w-[986px] h-[499px] bg-[#D9D9D9]" />
          </div>
        )}

        {options === "Notepad" && (
          <textarea className="w-[768px] h-[606px] bg-white rounded-[24px] p-6 focus:outline-none" />
        )}
      </section>

      <section
        className={`mt-[15px] ${options === "Meetings" ? "hidden" : "flex"}`}
      >
        <Profile />
      </section>
    </div>
  );
};

export default Course;
