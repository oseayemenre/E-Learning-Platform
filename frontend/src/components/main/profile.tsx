"use client";

import { items } from "@/app/(main)/page";
import BottomBlob from "./bottom-blob";

const Profile = () => {
  return (
    <main>
      <div className="mb-[60px]">
        <div className="w-[313.7px]">
          <div className="w-[130px] h-[130px] rounded-full bg-[#4591C4] mx-auto flex items-center justify-center border-white border-[4px]">
            <p className="text-white text-[48px]">O</p>
          </div>
        </div>

        <div className="w-full h-[253.28px] bg-[#ffffffdb] relative bottom-6 -z-10 rounded-[31.37px] flex flex-col items-center justify-center">
          <h3 className="text-[18px] font-[500] mb-[5px]">Okechukwu Eluwah</h3>
          <p className="font-[400] text-[18px] text-[#959BA5] mb-[15.97px]">
            Eluwah3232@gmail.com
          </p>

          <div className="flex justify-between items-center ">
            <div className="w-[156.85px] flex flex-col items-center">
              <p className="text-[15.49px] text-[#959BA5] ">Courses</p>
              <p className="text-[28.76px] font-[700] text-[#242730] ">9</p>
            </div>
            <div className="w-[156.85px] flex flex-col items-center">
              <p className="text-[15.49px] text-[#959BA5]">Semester</p>
              <p className="text-[28.76px] font-[700] text-[#242730]">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        {items.map((index: number) => (
          <BottomBlob key={index} />
        ))}
      </div>
    </main>
  );
};

export default Profile;
