import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const Blob = ({
  name,
  id,
  showConversations,
  setId,
}: {
  name: string;
  id: string;

  showConversations: Dispatch<SetStateAction<boolean | string>>;
  setId: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleSelectUser = () => {
    setId(id);
    showConversations(name);
  };

  return (
    <div
      className="w-[240px] p-4 flex gap-x-4 items-center bg-white rounded-[24px] text-[12px] cursor-pointer"
      onClick={handleSelectUser}
    >
      <Image src="/avatar.svg" width={60} height={60} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Blob;
