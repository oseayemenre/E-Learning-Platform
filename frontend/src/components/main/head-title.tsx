import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HeadTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-[22px] font-[700]">{title}</h2>
      <div className="flex gap-x-4">
        <IoIosArrowBack size={24} className="cursor-pointer" />
        <IoIosArrowForward size={24} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default HeadTitle;
