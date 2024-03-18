"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav_items } from "@/utils/data";

const Nav = () => {
  type TNav_items = (typeof nav_items)[number];

  const pathname = usePathname();

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
      </section>
    </nav>
  );
};

export default Nav;
