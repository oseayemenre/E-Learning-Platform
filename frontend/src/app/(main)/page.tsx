"use client";

import SearchSection from "@/components/main/search-section";
import FavoriteBlob from "@/components/dashboard/favorite-blob";
import Profile from "@/components/main/profile";
import HeadTitle from "@/components/main/head-title";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { usePinnedPost } from "@/context/pinned-post,context";

export const items = Array(3).fill(0) as number[];

const Home = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { pinnedPost } = usePinnedPost();

  if (!user) return router.push("/auth");
  return (
    <main className="ml-[26px] flex justify-between">
      <section className="w-2/3 mt-[44px] mb-[46px]">
        <SearchSection />

        <section className="mb-10">
          <HeadTitle title="Pinned" />

          <div className={`flex gap-x-2 items-center overflow-x-auto w-full`}>
            {pinnedPost.length < 1
              ? "No pinned posts yet"
              : pinnedPost.map((post, index: number) => (
                  <FavoriteBlob key={index} post={post} />
                ))}
          </div>
        </section>

        <section>
          <h2 className="text-[22px] font-[700] mb-3">Notes</h2>
          <div className="w-full bg-white rounded-[24px] h-[318px] p-6">
            Jotted notes
          </div>
        </section>
      </section>

      <section className="mt-[15px]">
        <Profile />
      </section>
    </main>
  );
};

export default Home;
