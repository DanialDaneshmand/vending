"use client";

import { toPersianNumbers } from "@/utils/toPersianNumber";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGamepad, FaRegBell, FaRegClock, FaScrewdriverWrench } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { IoGameControllerOutline, IoStatsChart } from "react-icons/io5";
import {
  IoHome,
  IoLocationOutline,
  IoSettingsOutline,
  IoStatsChartSharp,
} from "react-icons/io5";
import { LuWrench } from "react-icons/lu";

const links = [
  { id: 1, title: "داشبورد", href: "/dashboard", icon: <IoHome /> },
  { id: 2, title: "دستگاه ها", href: "/devices", icon: <IoGameControllerOutline /> },
  { id: 3, title: "مکان ها", href: "/places", icon: <IoLocationOutline /> },
  { id: 5, title: "هشدار ها ", href: "/alerts", icon: <FaRegBell /> },
  { id: 6, title: "گزارش مالی", href: "/financial-report", icon: <IoStatsChart /> },
  { id: 7, title: "کاربران و نقش ها", href: "/roles-users", icon: <FiUsers /> },
  { id: 8, title: "تعمیرات", href: "/repairs", icon: <LuWrench /> },
];

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <aside className=" h-screen fixed top-0 right-0 bottom-0 md:w-[130] lg:w-[185] xl:w-[225] bg-linear-to-b from-[#04275F] to-[#033074] ">
      <div className="p-5">
        <img src="/icon.png" alt="" className="w-12 h-10 rounded-xl object-center " />
      </div>
      <nav className="px-2">
        <ul>
          {links.map((item) => (
            <Link key={item.id} href={item.href} className="my-4">
              <li
                className={`text-[#EEEEF2] py-4 flex justify-between  px-3 ${pathName.startsWith(item.href)  ? "bg-linear-to-r from-[#023BA0] to-[#033BA1] rounded-lg" : ""}`}
              >
                <span className="flex items-center gap-x-4">
                  <span className="  text-sm lg:text-xl">{item.icon}</span>
                  <span className=" text-xs lg:text-[16px]">{item.title}</span>
                </span>
                {item.title === "هشدار ها " && (
                  <div className="bg-[#FE6006] text-xs h-5 w-5 flex items-center justify-center rounded-full">
                    {toPersianNumbers(7)}
                  </div>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
