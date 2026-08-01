import React, { useMemo, useState } from "react";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";
import Link from "next/link";

// آیکون کوچک دستگاه برای بخش نام دستگاه
const DeviceMiniIcon = () => (
  <svg
    className="w-4 h-4 text-blue-500 shrink-0 ml-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <rect x="9" y="6" width="6" height="5" rx="1" />
    <circle cx="10" cy="14" r="1" fill="currentColor" />
    <circle cx="14" cy="14" r="1" fill="currentColor" />
    <circle cx="10" cy="17" r="1" fill="currentColor" />
    <circle cx="14" cy="17" r="1" fill="currentColor" />
  </svg>
);

interface DeviceRow {
  id: number;
  name: string;
  code1: string;
  code2: string;
  location: string;
  status: "فعال" | "آنلاین" | "آفلاین";
  lastSeen: string;
  inventory: "مناسب" | "کم";
  income: string;
}

const devicesData: DeviceRow[] = [
  {
    id: 1,
    name: "وندینگ ۱۰۱",
    code1: "VM-101",
    code2: "VM-101",
    location: "طبقه همکف - ورودی اصلی",
    status: "فعال",
    lastSeen: "۲ دقیقه پیش",
    inventory: "کم",
    income: "۲,۴۵۰,۰۰۰",
  },
  {
    id: 2,
    name: "وندینگ ۲۰۵",
    code1: "VM-205",
    code2: "VM-205",
    location: "طبقه ۲ - سالن انتظار",
    status: "آنلاین",
    lastSeen: "۵ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۸۷۰,۰۰۰",
  },
  {
    id: 3,
    name: "وندینگ ۱۱۰",
    code1: "VM-110",
    code2: "VM-110",
    location: "طبقه ۱ - راهروی شرقی",
    status: "فعال",
    lastSeen: "۱ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۳۶۰,۰۰۰",
  },
  {
    id: 4,
    name: "وندینگ ۳۰۱",
    code1: "VM-301",
    code2: "VM-301",
    location: "طبقه ۳ - کنار آسانسور",
    status: "آفلاین",
    lastSeen: "۴۵ دقیقه پیش",
    inventory: "کم",
    income: "۸۹۰,۰۰۰",
  },
  {
    id: 5,
    name: "وندینگ ۱۰۳",
    code1: "VM-103",
    code2: "VM-103",
    location: "طبقه ۱ - لابی اصلی",
    status: "فعال",
    lastSeen: "۳ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۹۳۰,۰۰۰",
  },
  {
    id: 6,
    name: "وندینگ ۴۰۲",
    code1: "VM-402",
    code2: "VM-402",
    location: "طبقه ۴ - اتاق کنفرانس",
    status: "آفلاین",
    lastSeen: "۲ ساعت پیش",
    inventory: "کم",
    income: "۰",
  },
  {
    id: 7,
    name: "وندینگ ۲۰۲",
    code1: "VM-202",
    code2: "VM-202",
    location: "طبقه ۲ - سالن پذیرایی",
    status: "آنلاین",
    lastSeen: "۱ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۵۴۰,۰۰۰",
  },
  {
    id: 8,
    name: "وندینگ ۳۰۵",
    code1: "VM-305",
    code2: "VM-305",
    location: "طبقه ۳ - انتهای راهرو",
    status: "آنلاین",
    lastSeen: "۷ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۳۲۰,۰۰۰",
  },
  {
    id: 9,
    name: "وندینگ ۱۰۵",
    code1: "VM-105",
    code2: "VM-105",
    location: "طبقه ۱ - کنار در خروج",
    status: "آفلاین",
    lastSeen: "۳۵ دقیقه پیش",
    inventory: "کم",
    income: "۶۴۰,۰۰۰",
  },
  {
    id: 10,
    name: "وندینگ ۴۰۱",
    code1: "VM-401",
    code2: "VM-401",
    location: "طبقه ۴ - ورودی شمالی",
    status: "آنلاین",
    lastSeen: "۲ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۷۸۰,۰۰۰",
  },
];

export default function DeviceManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return devicesData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, devicesData]);

  const totalPages = Math.ceil(devicesData.length / pageSize);
  return (
    <div
      className="w-full p-4 bg-white border border-gray-100 shadow-sm rounded-lg mt-4"
      dir="rtl"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl text-right border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-sm font-medium">
              <th className="px-4 py-2 font-normal ">نام دستگاه</th>
              <th className="px-4 py-2 font-normal text-nowrap">
                شناسه دستگاه
              </th>
              <th className="px-4 py-2 font-normal text-center">مکان</th>
              <th className="px-4 py-2 font-normal text-nowrap">
                وضعیت دستگاه
              </th>
              <th className="px-4 py-2 font-normal text-nowrap">
                آخرین ارتباط
              </th>
              <th className="px-4 py-2 font-normal">موجودی</th>
              <th className="px-4 py-2 font-normal text-nowrap">
                درآمد امروز{" "}
              </th>
              <th className="px-4 py-2 font-normal w-40 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((device) => (
              <tr
                key={device.id}
                className="bg-white hover:bg-slate-50 transition-colors group"
              >
                {/* نام دستگاه */}
                <td className="px-4 py-3 rounded-r-lg text-nowrap border-y border-r border-gray-100 text-slate-700 text-[14px] font-medium flex items-center">
                  <DeviceMiniIcon /> {device.name}
                </td>
                {/* شناسه‌ها */}
                <td className="px-4 w-16 py-3 text-center border-y border-gray-100 text-slate-500 text-[14px]">
                  {device.code2}
                </td>
                {/* مکان */}
                <td className="px-4 py-3 border-y border-gray-100 text-slate-500 text-[13px] text-nowrap">
                  {device.location}
                </td>
                {/* وضعیت */}
                <td className="px-4 text-center py-3 border-y border-gray-100 ">
                  <span
                    className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                      device.status === "فعال"
                        ? "bg-green-50 text-green-600"
                        : device.status === "آنلاین"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-50 text-red-500"
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                {/* آخرین ارتباط */}
                <td className="px-4 py-3 border-y border-gray-100 text-slate-500 text-xs">
                  {device.lastSeen}
                </td>
                {/* موجودی */}
                <td className="px-4 py-3 text-center border-y border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                      device.inventory === "مناسب"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {device.inventory}
                  </span>
                </td>
                {/* درآمد */}
                <td className="px-4 py-3 text-center border-y border-gray-100 text-slate-700 text-[14px] font-medium">
                  {device.income}
                </td>
                {/* عملیات */}
                <td className="px-4 py-3 rounded-l-lg border-y border-l border-gray-100">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/devices/${device.id}`}>
                      <button className="flex items-center gap-1 px-2 py-1 text-blue-600  border border-gray-200 cursor-pointer rounded-md text-[12px] font-medium transition-colors">
                        <Eye className="w-3.5 h-3.5" /> مشاهده
                      </button>
                    </Link>
                    <button className="flex items-center gap-1 px-2 py-1 text-slate-600 border border-gray-200 cursor-pointer rounded-md text-[12px] font-medium transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-blue-600" /> ویرایش
                    </button>
                    <button className="py-1 px-2 cursor-pointer border border-r-gray-200 rounded-md text-gray-400  transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Section */}
        <StyledPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
