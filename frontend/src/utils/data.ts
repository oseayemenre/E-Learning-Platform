import { IoMdHome, IoIosSettings } from "react-icons/io";
import { FaCompass } from "react-icons/fa";
import { FaNewspaper, FaCalendarDays } from "react-icons/fa6";

export const nav_items = [
  {
    icon: IoMdHome,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: FaCompass,
    label: "Classes",
    path: "/classes",
  },
  {
    icon: FaNewspaper,
    label: "Messages",
    path: "/messages",
  },
  {
    icon: FaCalendarDays,
    label: "Timetable",
    path: "/timetable",
  },
  {
    icon: IoIosSettings,
    label: "Settings",
    path: "/settings",
  },
] as const;
