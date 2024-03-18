import Image from "next/image";

const Blob = ({ name }: { name: string }) => {
  return (
    <div className="w-[240px] p-4 flex gap-x-4 items-center bg-white rounded-[24px] text-[12px]">
      <Image src="/avatar.svg" width={60} height={60} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Blob;
