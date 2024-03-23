"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav_items } from "@/utils/data";
import { MdOutlineLogout } from "react-icons/md";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

type TNav_items = (typeof nav_items)[number];

const Nav = () => {
  const pathname = usePathname();

  const { user, setUser } = useUserContext();

  const router = useRouter();

  if (!user) return null;

  const handleLogOut = async (): Promise<void> => {
    await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    localStorage.removeItem("user");

    setUser(null);

    return router.push("/auth");
  };

  return (
    <nav className="w-[25%] bg-gradient-to-b from-[#1F548D] via-[#4591C4] to-[#C2BBF0] pb-10 pl-10 pt-[160px]">
      <section className="flex flex-col gap-y-4 mb-[83px]">
        {nav_items.slice(0, 4).map((items: TNav_items, index: number) => (
          <Link
            key={index}
            href={items.path}
            className={`flex gap-x-2 items-center pl-8 py-3 ${
              pathname === items.path
                ? "bg-[#e5e5e5] rounded-l-[100px]"
                : "bg-transparent"
            }`}
          >
            <items.icon
              size={24}
              color={pathname === items.path ? "black" : "#959BA5"}
            />
            <p
              className={`text-[14px] font-[500] ${
                pathname === items.path ? "text-black" : "text-white"
              }`}
            >
              {items.label.toUpperCase()}
            </p>
          </Link>
        ))}

        <div className="border-b-white w-[130px] border-b-[1px] ml-8" />

        {nav_items.slice(4).map((items: TNav_items, index: number) => (
          <Link
            key={index}
            href={items.path}
            className={`flex items-center pl-8 py-3 gap-x-2 mb-2${
              pathname === items.path
                ? "bg-[#e5e5e5] rounded-l-[100px]"
                : "bg-transparent"
            }`}
          >
            <items.icon
              size={24}
              color={pathname === items.path ? "black" : "#959BA5"}
            />
            <p
              className={`text-[14px] font-[500] ${
                pathname === items.path ? "text-black" : "text-white"
              }`}
            >
              {items.label.toUpperCase()}
            </p>
          </Link>
        ))}

        <div
          className="flex items-center pl-8 py-3 mb-2 gap-x-2 cursor-pointer"
          onClick={() => handleLogOut()}
        >
          <MdOutlineLogout size={24} color="#959BA5" />
          <p className="text-[14px] font-[500] text-white">LOG OUT</p>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
