"use client";

import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { usePinnedPost } from "@/context/pinned-post,context";
import { TCourse } from "@/app/(main)/classes/page";
import { motion } from "framer-motion";

const CourseBlob = ({
  coursename,
  coursecode,
}: {
  coursename: string;
  coursecode: string;
}) => {
  const router = useRouter();

  const { pinnedPost, setPinnedPost } = usePinnedPost();

  return (
    <div className="w-[240px] h-[180px] bg-[#4591C4] px-2 rounded-[24px] cursor-pointer flex flex-col items-center justify-center font-[500] text-center text-white relative">
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="bg-[#ffffff4d] flex items-center justify-center w-[44px] h-[44px] rounded-full mt-4 absolute right-4 top-0"
        onClick={() =>
          setPinnedPost([
            ...pinnedPost,
            { courseName: coursename, courseCode: coursecode } as TCourse,
          ])
        }
      >
        <FaHeart size={24} color="white" />
      </motion.div>

      <div
        onClick={() =>
          router.push(`/classes/${coursename.split(/\s+/).join("-")}`)
        }
      >
        <p className="text-[24px]">{coursecode}</p>
        <p className="text-[18px]">{coursename}</p>
      </div>
    </div>
  );
};

export default CourseBlob;
