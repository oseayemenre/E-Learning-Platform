import CourseBlob from "@/components/courses/course-blob";
import HeadTitle from "@/components/main/head-title";
import Profile from "@/components/main/profile";
import SearchSection from "@/components/main/search-section";

const Classes = () => {
  const index = Array(9).fill(1) as number[];

  return (
    <div className="flex justify-between ml-[26px]">
      <section className="w-2/3 mt-[44px] mb-[46px] h-screen ">
        <SearchSection />
        <HeadTitle title="Courses" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          {index.map((index: number) => (
            <CourseBlob key={index} />
          ))}
        </div>
      </section>

      <section className="mt-[15px]">
        <Profile />
      </section>
    </div>
  );
};

export default Classes;
