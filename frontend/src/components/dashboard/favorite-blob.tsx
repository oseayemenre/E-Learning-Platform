"use client";

import { TCourse } from "@/app/(main)/classes/page";
import { usePinnedPost } from "@/context/pinned-post,context";
import { useRouter } from "next/navigation";
import { RiUnpinFill } from "react-icons/ri";
import { motion } from "framer-motion";

const FavoriteBlob = ({ post }: { post: TCourse }) => {
  const router = useRouter();
  const { pinnedPost, setPinnedPost } = usePinnedPost();

  const handleRemovedPinnedPost = () => {
    const pinnedPostCopy = [...pinnedPost];

    const findPinnedPost = pinnedPost.findIndex(
      (posts) => posts.courseName === post.courseName
    );

    pinnedPostCopy.splice(findPinnedPost, 1);

    setPinnedPost(pinnedPostCopy);
  };

  return (
    <div className="w-[240px] h-[180px] bg-[#4591C4] px-2 rounded-[24px] cursor-pointer flex flex-col items-center justify-center font-[500] text-center text-white relative">
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="bg-[#ffffff4d] flex items-center justify-center w-[44px] h-[44px] rounded-full mt-4 absolute right-4 top-0"
        onClick={handleRemovedPinnedPost}
      >
        <RiUnpinFill size={24} color="white" />
      </motion.div>

      <div
        onClick={() =>
          router.push(`/classes/${post.courseName.split(/\s+/).join("-")}`)
        }
      >
        <p className="text-[24px]">{post.courseCode}</p>
        <p className="text-[18px]">{post.courseName}</p>
      </div>
    </div>
  );
};

export default FavoriteBlob;
