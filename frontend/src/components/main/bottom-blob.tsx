import Image from "next/image";

const BottomBlob = () => {
  return (
    <div className="w-[240px] bg-white h-[96px] rounded-[24px] flex gap-x-3 p-4 items-center">
      <Image width={64} height={64} src="/exam.svg" alt="" />
      <div>
        <p className="text-[14px] text-[#242730]">Exam</p>
        <p className="text-[12px] text-[#959BA5]">20 min</p>
      </div>
    </div>
  );
};

export default BottomBlob;
