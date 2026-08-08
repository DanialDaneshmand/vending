import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface DeviceRow {
  id: number;
  name: string;
  code1: string;
  code2: string;
  location: string;
  section:string;
  status: "روشن" | "آنلاین" | "آفلاین";
  lastSeen: string;
  inventory: "مناسب" | "کم";
  income: string;
}

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

const devicesData: DeviceRow[] = [
  {
    id: 1,
    name: "وندینگ ۱۰۱",
    code1: "VM-101",
    code2: "VM-101",
    location: "طبقه همکف - ورودی اصلی",
    section:"طبقه اول",
    status: "آفلاین",
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
    section:"_",
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
    section:"_",
    status: "روشن",
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
    section:"_",
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
    section:"_",
    status: "روشن",
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
    section:"_",
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
    section:"_",
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
    section:"_",
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
    section:"_",
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
    section:"_",
    status: "آنلاین",
    lastSeen: "۲ دقیقه پیش",
    inventory: "مناسب",
    income: "۱,۷۸۰,۰۰۰",
  },
];

export default function DeviceSummary() {
  
  const filteredAndSortedDevices = devicesData
    .filter(device => device.status !== "آنلاین") 
    .sort((a, b) => {
      if (a.status === "آفلاین" && b.status === "روشن") return -1; 
      if (a.status === "روشن" && b.status === "آفلاین") return 1;  
      return 0; 
    });
  return (
    <div className=" bg-white h-full rounded-lg p-4 shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <h2 className=" font-bold text-gray-800">خلاصه دستگاه‌ها</h2>
        <Link
          href="/devices"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>مشاهده همه</span>
          <ChevronLeft size={14} />
        </Link>
      </div>

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
              <th className="px-4 py-2 font-normal text-center">بخش</th>
              <th className="px-4 py-2 font-normal text-nowrap text-center">
                وضعیت دستگاه
              </th>
              <th className="px-4 py-2 font-normal text-nowrap text-center">
                 موجودی
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedDevices.map((device) => (
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
                <td className="px-4 text-center py-3 border-y border-gray-100 text-slate-500 text-[13px] text-nowrap">
                  {device.location}
                </td>
                <td className="px-4 py-3 border-y text-center border-gray-100 text-slate-500 text-[13px] text-nowrap">
                  {device.section}
                </td>
                {/* وضعیت */}
                <td className="px-4 text-center py-3 border-y border-gray-100 ">
                  <span
                    className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                      device.status === "روشن"
                        ? "bg-green-50 text-green-600"
                        : device.status === "آنلاین"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-50 text-red-500"
                    }`}
                  >
                    {device.status}
                  </span>
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
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
    </div>
  );
}
