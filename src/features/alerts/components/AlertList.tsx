import React, { useMemo, useState } from "react";
import {
  Download,
  AlertTriangle,
  Thermometer,
  WifiOff,
  CreditCard,
  DoorClosed,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";
import { IoIosArrowDown } from "react-icons/io";

const alertData = [
  {
    id: 1,
    type: "تمام موجودی پایین",
    typeIcon: <AlertTriangle className="w-4 h-4 text-red-500" />,
    device: "VM-102",
    location: "تهران، میدان ونک",
    status: "باز",
    statusStyle: "bg-[#FFF1F2] text-[#E11D48]",
    severity: "بحرانی",
    severityColor: "bg-[#E11D48]",
    time: "۱۴۰۳/۰۶/۲۴",
    clock: "۱۰:۳۲",
    actions: { confirm: true, resolve: true },
  },
  {
    id: 2,
    type: "گرمای بیش از حد",
    typeIcon: <Thermometer className="w-4 h-4 text-orange-500" />,
    device: "VM-205",
    location: "اصفهان، خیابان آمادگاه",
    status: "باز",
    statusStyle: "bg-[#FFF1F2] text-[#E11D48]",
    severity: "بالا",
    severityColor: "bg-[#F59E0B]",
    time: "۱۴۰۳/۰۶/۲۴",
    clock: "۰۹:۵۸",
    actions: { confirm: true, resolve: true },
  },
  {
    id: 3,
    type: "قطع ارتباط",
    typeIcon: <WifiOff className="w-4 h-4 text-blue-500" />,
    device: "VM-301",
    location: "مشهد، بلوار وکیل آباد",
    status: "باز",
    statusStyle: "bg-[#FFF1F2] text-[#E11D48]",
    severity: "بالا",
    severityColor: "bg-[#F59E0B]",
    time: "۱۴۰۳/۰۶/۲۴",
    clock: "۰۹:۴۱",
    actions: { confirm: true, resolve: true },
  },
  {
    id: 4,
    type: "خطای پرداخت",
    typeIcon: <CreditCard className="w-4 h-4 text-slate-500" />,
    device: "VM-110",
    location: "شیراز، خیابان زند",
    status: "باز",
    statusStyle: "bg-[#FFF1F2] text-[#E11D48]",
    severity: "متوسط",
    severityColor: "bg-[#FACC15]",
    time: "۱۴۰۳/۰۶/۲۴",
    clock: "۰۸:۱۷",
    actions: { confirm: true, resolve: true },
  },
  {
    id: 5,
    type: "عدم بسته شدن درب",
    typeIcon: <DoorClosed className="w-4 h-4 text-slate-500" />,
    device: "VM-103",
    location: "تبریز، ولیعصر شمالی",
    status: "تأیید شده",
    statusStyle: "bg-[#EFF6FF] text-[#1D4ED8]",
    severity: "متوسط",
    severityColor: "bg-[#FACC15]",
    time: "۱۴۰۳/۰۶/۲۴",
    clock: "۰۷:۵۰",
    actions: { confirm: false, resolve: false },
  },
  {
    id: 6,
    type: "سنسور دما نامعتبر",
    typeIcon: <Thermometer className="w-4 h-4 text-slate-500" />,
    device: "VM-207",
    location: "کرج، عظیمیه",
    status: "حل شده",
    statusStyle: "bg-[#F0FDF4] text-[#15803D]",
    severity: "متوسط",
    severityColor: "bg-[#FACC15]",
    time: "۱۴۰۳/۰۶/۲۳",
    clock: "۲۱:۴۳",
    actions: { confirm: false, resolve: false },
  },
  {
    id: 7,
    type: "تمام موجودی پایین",
    typeIcon: <AlertTriangle className="w-4 h-4 text-red-500" />,
    device: "VM-304",
    location: "اهواز، کیانپارس",
    status: "حل شده",
    statusStyle: "bg-[#F0FDF4] text-[#15803D]",
    severity: "بحرانی",
    severityColor: "bg-[#E11D48]",
    time: "۱۴۰۳/۰۶/۲۳",
    clock: "۱۹:۱۰",
    actions: { confirm: false, resolve: false },
  },
];

export default function AlertList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return alertData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, alertData]);

  const totalPages = Math.ceil(alertData.length / pageSize);
  return (
    <div className=" py-4  mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className=" flex px-4 justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">لیست هشدارها</h1>
        <button className="flex items-center font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-sm rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all">
          <Download className="w-4 h-4" />
          خروجی اکسل
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="w-full text-right min-w-3xl ">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs font-medium">
              <th className="py-4 px-2 text-center">نوع هشدار</th>
              <th className="py-4 px-2 text-center">دستگاه</th>
              <th className="py-4 px-2 text-center">مکان</th>
              <th className="py-2 px-2 text-center">وضعیت</th>
              <th className="py-2 px-2 text-center">شدت</th>
              <th className="py-2 px-2 text-center">زمان</th>
              <th className="py-2 px-2 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-800">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Alert Type */}
                <td className="py-2 px-2">
                  <div className="flex items-center  gap-2">
                    {item.typeIcon}
                    <span className="font-bold text-gray-800">{item.type}</span>
                  </div>
                </td>

                {/* Device */}
                <td className="py-2 px-2 text-center font-bold text-gray-800 ">
                  {item.device}
                </td>

                {/* Location */}
                <td className="py-2 px-2 text-center text-gray-500">
                  {item.location}
                </td>

                {/* Status */}
                <td className="py-2 px-2 text-center">
                  <span
                    className={`px-4 py-1 rounded-md text-[11px] font-bold ${item.statusStyle}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Severity */}
                <td className="py-2 px-2 text-center">
                  <div className="flex items-center justify-start gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${item.severityColor}`}
                    ></span>
                    <span className="text-gray-700">{item.severity}</span>
                  </div>
                </td>

                {/* Time */}
                <td className="py-2 px-2 text-center">
                  <div className="flex flex-col text-[11px] leading-tight text-gray-500">
                    <span className="font-bold">{item.time}</span>
                    <span>{item.clock}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-2 px-2">
                  <div className="flex items-center justify-center gap-2">
                    {/* Confirm Button */}
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-[11px] transition-all
                        ${item.actions.confirm ? "border-blue-100 text-blue-600 hover:bg-blue-50" : "border-gray-100 text-gray-200"}`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      تأیید
                    </button>

                    {/* Resolve Button */}
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-[11px] transition-all
                        ${item.actions.resolve ? "border-green-100 text-green-600 hover:bg-green-50" : "border-gray-100 text-gray-200"}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      حل
                    </button>

                    {/* Details Button */}

                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 text-[11px] hover:bg-gray-50 transition-all">
                      <Eye className="w-3.5 h-3.5" />
                      جزئیات
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
