import { FaHeart } from "react-icons/fa";

const FavoriteBlob = () => {
  return (
    <div className="w-[240px] h-[180px] rounded-[24px] bg-[#4591C4] relative">
      <div className="bg-[#ffffff4d] flex items-center justify-center w-[44px] h-[44px] rounded-full mt-4 absolute right-4">
        <FaHeart size={24} color="white" />
      </div>
    </div>
  );
};

export default FavoriteBlob;
