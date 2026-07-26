"use client";

import React, { useState } from "react";
import { Bell, Mail, Maximize, ChevronDown } from "lucide-react";
import Image from "next/image";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import { HiBars4 } from "react-icons/hi2";
import { FaBars, FaGamepad, FaRegBell, FaRegClock } from "react-icons/fa6";
import {
  IoClose,
  IoHome,
  IoLocationOutline,
  IoSettingsOutline,
  IoStatsChart,
} from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { id: 1, title: "داشبورد", href: "/dashboard", icon: <IoHome /> },
  { id: 2, title: "دستگاه ها", href: "/devices", icon: <FaGamepad /> },
  { id: 3, title: "مکان ها", href: "/places", icon: <IoLocationOutline /> },
  {
    id: 4,
    title: "کنترل و زمان بندی",
    href: "/scheduling",
    icon: <FaRegClock />,
  },
  { id: 5, title: "هشدار ها ", href: "/alerts", icon: <FaRegBell /> },
  { id: 6, title: "گزارش ها", href: "/reports", icon: <IoStatsChart /> },
  { id: 7, title: "کاربران و نقش ها", href: "/roles-users", icon: <FiUsers /> },
  { id: 8, title: "تنظیمات", href: "/settings", icon: <IoSettingsOutline /> },
];

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const pathName = usePathname();
  return (
    <>
      {/* Desktap Header */}
      <div className="hidden md:block">
        <header className="flex  flex-col sm:flex-row items-center justify-between bg-white px-6 py-3 shadow-sm border-b border-gray-100 dir-rtl">
          {/* بخش سمت راست: عنوان سامانه */}
          <div className="flex items-center my-6">
            <h1 className="text-xl font-bold text-gray-800">
              سامانه مدیریت و کنترل وندینگ
            </h1>
          </div>

          {/* بخش سمت چپ: پروفایل و آیکون‌ها */}
          <div className="flex items-center gap-6">
            {/* آیکون‌های ابزار (Full Screen, Messages, Notifications) */}
            <div className="flex items-center gap-x-6 text-gray-800 border-l border-gray-200 pl-6">
              <button className=" text-sm cursor-pointer">
                <Maximize />
              </button>

              <button className="hover:text-gray-800 transition-colors cursor-pointer">
                <Mail />
              </button>

              {/* بخش اعلان‌ها همراه با نشانگر تعداد */}
              <button className="relative hover:text-gray-800 transition-colors cursor-pointer">
                <Bell />
                <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {toPersianNumbers(4)}
                </span>
              </button>
            </div>

            {/* پروفایل کاربر */}
            <div className="flex items-center gap-3">
              <div className="text-left flex flex-col items-end">
                <span className="text-sm font-bold text-gray-900 leading-none">
                  علی محمدی
                </span>
                <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <ChevronDown size={14} />
                  مدیر سیستم
                </span>
              </div>

              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src="/profile/prof.webp" // مسیر عکس پروفایل خودت رو بزار
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>
      </div>
      {/* Mobile Header */}
      <div className="block md:hidden">
        <header className=" flex justify-between items-center bg-white px-6 py-4 shadow-sm border-b border-gray-100 dir-rtl">
          <button onClick={() => setIsShow(true)} className=" cursor-pointer">
            <FaBars className="text-xl text-gray-800" />
          </button>
          {/* بخش سمت چپ: پروفایل و آیکون‌ها */}
          <div className="flex items-center gap-6">
            {/* آیکون‌های ابزار (Full Screen, Messages, Notifications) */}
            <div className="flex items-center gap-x-3 text-gray-800 border-l border-gray-200 pl-6">
              <button className=" text-sm cursor-pointer">
                <Maximize size={20} />
              </button>

              <button className="hover:text-gray-800 transition-colors cursor-pointer">
                <Mail size={20} />
              </button>

              {/* بخش اعلان‌ها همراه با نشانگر تعداد */}
              <button className="relative hover:text-gray-800 transition-colors cursor-pointer">
                <Bell size={20} />
                <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {toPersianNumbers(4)}
                </span>
              </button>
            </div>

            {/* پروفایل کاربر */}
            <div className="flex items-center gap-3">
              <div className="text-left flex flex-col items-end">
                <span className="text-sm font-bold text-gray-900 leading-none">
                  علی محمدی
                </span>
                <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <ChevronDown size={14} />
                  مدیر سیستم
                </span>
              </div>

              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src="/profile/prof.webp" // مسیر عکس پروفایل خودت رو بزار
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* Mobile Links */}
          {isShow && (
            <aside className="fixed z-50 top-0 bottom-0 right-0 left-0 bg-linear-to-b from-[#04275F] to-[#033074] ">
              <div className="p-5 flex items-center justify-between">
                <img
                  src="/icon.png"
                  alt=""
                  className="w-12 h-10 rounded-xl object-center "
                />
                <button
                  onClick={() => setIsShow(false)}
                  className=" cursor-pointer"
                >
                  <IoClose className="text-xl text-[#EEEEF2]" />
                </button>
              </div>
              <nav className="px-2">
                <ul>
                  {links.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="my-4"
                      onClick={() => setIsShow(false)}
                    >
                      <li
                        className={`text-[#EEEEF2] py-4 flex justify-between  px-3 ${pathName === item.href ? "bg-linear-to-r from-[#023BA0] to-[#033BA1] rounded-lg" : ""}`}
                      >
                        <span className="flex items-center gap-x-4">
                          <span className="text-xl">{item.icon}</span>
                          <span>{item.title}</span>
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
          )}
        </header>
      </div>
    </>
  );
};

export default Header;
