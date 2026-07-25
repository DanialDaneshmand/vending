import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const devices = [
  {
    id: "VM-102",
    name: "وبدینگ ۱۰۲",
    location: "مجتمع تجاری کوروش",
    connection: "آنلاین",
    status: "فعال",
    lastReport: "۱۰:۳۱",
    income: "۲,۴۵۰,۰۰۰",
    connectionColor: "bg-green-100 text-green-600",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: "VM-204",
    name: "وبدینگ ۲۰۵",
    location: "شهرداری سبز پرس شمادی",
    connection: "آنلاین",
    status: "فعال",
    lastReport: "۱۳ دیروز",
    income: "۱,۳۳۰,۰۰۰",
    connectionColor: "bg-gray-100 text-gray-800",
    statusColor: "bg-green-100 text-green-600",
  },

  {
    id: "VM-301",
    name: "وبدینگ ۳۰۱",
    location: "پاساژ میلاد تور",
    connection: "آنلاین",
    status: "غیرفعال",
    lastReport: "۲۲:۱۰ دیروز",
    income: "۸۹۰,۰۰۰",
    connectionColor: "bg-gray-100 text-gray-800",
    statusColor: "bg-red-100 text-red-500",
  },
  {
    id: "VM-205",
    name: "وبدینگ ۲۰۵",
    location: "شهرداری سبز پرس شمادی",
    connection: "آنلاین",
    status: "فعال",
    lastReport: "۱۳ دیروز",
    income: "۱,۳۳۰,۰۰۰",
    connectionColor: "bg-gray-100 text-gray-800",
    statusColor: "bg-green-100 text-green-600",
  },
];

export default function DeviceSummary() {
  return (
    <div className=" bg-white h-full rounded-lg p-4 shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <h2 className=" font-bold text-gray-800">خلاصه دستگاه‌ها</h2>
        <Link
          href="#"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>مشاهده همه</span>
          <ChevronLeft size={14} />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-xs">
        <table className="w-full text-right border-collapse">
          <thead className=" rounded-t-lg overflow-hidden bg-[#F6F7F8]">
            <tr className=" border-b border-gray-100">
              <th className="p-4 font-bold text-xs ">نام دستگاه</th>
              <th className="p-4 font-bold text-xs ">شناسه دستگاه</th>
              <th className="p-4 font-bold text-xs text-center ">مکان</th>

              <th className="p-4 font-bold text-xs ">وضعیت اتصال</th>
              <th className="p-4 font-bold text-xs ">وضعیت دستگاه</th>
              <th className="p-4 font-bold text-xs ">آخرین گزارش</th>
              <th className="p-4 font-bold text-xs ">درآمد امروز (تومان)</th>
              <th className="p-4 font-bold text-xs "></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((dev, index) => (
              <tr
                key={dev.id}
                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors`}
              >
                <td className="p-4 text-sm text-gray-800 font-bold">{dev.name}</td>
                <td className="p-4 text-sm text-gray-800 font-bold">{dev.id}</td>
                <td className="p-4 text-sm text-gray-800 font-bold">{dev.location}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs  font-bold ${dev.connectionColor}`}
                  >
                    {dev.connection}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${dev.statusColor}`}
                  >
                    {dev.status}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold text-gray-600">{dev.lastReport}</td>
                <td className="p-4 text-sm text-gray-800 font-bold">
                  {dev.income}
                </td>
                <td className="p-4 text-gray-800 cursor-pointer">
                  <button>
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
