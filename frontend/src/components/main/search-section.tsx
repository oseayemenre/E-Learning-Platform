import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchSection = () => {
  return (
    <div className="ml-[22px] flex w-full justify-between items-center mb-[44px]">
      <div className="bg-white flex justify-start px-4 py-[10px] w-[504px] gap-x-2 rounded-[22px]">
        <HiMagnifyingGlass size={20} color="#959BA5" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full focus:outline-none text-[14px]"
        />
      </div>

      <div className="flex gap-x-4">
        <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white cursor-pointer">
          <AiFillMessage size={24} />
        </div>
        <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-white cursor-pointer">
          <FaBell size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
