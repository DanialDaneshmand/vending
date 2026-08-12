import React, { useState, useMemo } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import SelectInput from "@/components/form/SelectInput";
import { DateObject } from "react-multi-date-picker";

interface FilterValues {
  fromDate: string;
  toDate: string;
  places: string;
  sections: string;
  startTime: DateObject | "";
  endTime: DateObject | "";
  searchQuery: string;
}

interface FinancialReportTableProps {
  filterValues: FilterValues;
}

// داده‌ها را خارج از کامپوننت تعریف می‌کنیم تا با هر رندر دوباره ساخته نشوند
const data = [
  {
    id: 1,
    date: "1405/05/20",
    time: "10:20",
    location: "پاساژ کوروش",
    sectionName: "راهرو ورودی",
    deviceName: "دستگاه ۱",
    deviceId: "cx123-f12",
    devices: 12,
    games: 890,
    income: "۳,۵۸۰,۰۰۰",
  },
  {
    id: 2,
    date: "1405/05/21",
    time: "14:45",
    location: "مجتمع تیراژه",
    sectionName: "طبقه دوم",
    deviceName: "دستگاه واقعیت مجازی",
    deviceId: "vr-909-x",
    devices: 4,
    games: 150,
    income: "۱,۲۰۰,۰۰۰",
  },
  {
    id: 3,
    date: "1405/05/22",
    time: "18:30",
    location: "ایران مال",
    sectionName: "شهربازی سرپوشیده",
    deviceName: "سیمولاتور رانندگی",
    deviceId: "sim-racer-01",
    devices: 8,
    games: 420,
    income: "۵,۱۰۰,۰۰۰",
  },
  {
    id: 4,
    date: "1405/06/01",
    time: "21:15",
    location: "پالادیوم",
    sectionName: "فودکورت",
    deviceName: "دستگاه چنگک",
    deviceId: "claw-m-55",
    devices: 2,
    games: 600,
    income: "۲,۴۵۰,۰۰۰",
  },
  {
    id: 5,
    date: "1405/06/05",
    time: "09:00",
    location: "بام لند",
    sectionName: "محوطه باز",
    deviceName: "بسکتبال آرکید",
    deviceId: "hoop-a2",
    devices: 6,
    games: 310,
    income: "۱,۸۹۰,۰۰۰",
  },
];

// تابع کمکی برای تبدیل مبلغ (رشته فارسی با کاما) به عدد برای مقایسه
const parsePersianNumber = (value: string) => {
  return (
    parseInt(
      value
        .replace(/[, ]/g, "")
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()),
    ) || 0
  );
};

export default function FinancialReportTable({
  filterValues,
}: FinancialReportTableProps) {
  const [sort, setSort] = useState("none");

  const formattedFilters = {
    ...filterValues,
    startTime: filterValues.startTime
      ? filterValues.startTime.format("HH:mm")
      : "",
    endTime: filterValues.endTime ? filterValues.endTime.format("HH:mm") : "",
  };

  // ۱. اول داده‌ها را فیلتر می‌کنیم
  const filteredData = useFilteredData(data, formattedFilters);

  const sortedData = useMemo(() => {
    // اگر وضعیت none بود، داده‌های فیلتر شده را بدون هیچ تغییری برگردان
    if (sort === "none") return filteredData;

    return [...filteredData].sort((a, b) => {
      const incomeA = parsePersianNumber(a.income);
      const incomeB = parsePersianNumber(b.income);
      return sort === "highest" ? incomeB - incomeA : incomeA - incomeB;
    });
  }, [filteredData, sort]);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#1e293b] text-right">گزارش مالی</h3>

        {/* بخش انتخاب مرتب‌سازی */}

        <div className="relative w-40">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className=" w-full px-3 py-2 text-xs sm:text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm appearance-none cursor-pointer focus:outline-none transition-all text-right"
          >
            <option value="none">ترتیب پیش‌فرض</option>
            <option value="highest">بیشترین مبلغ</option>
            <option value="lowest">کمترین مبلغ</option>
          </select>

          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full text-center border-collapse min-w-3xl">
          <thead className="bg-[#F6F7F9] text-xs text-gray-500 font-medium">
            <tr>
              <th className="py-4 px-2 border-b border-gray-100">تاریخ</th>
              <th className="py-4 px-2 border-b border-gray-100">ساعت</th>
              <th className="py-4 px-2 border-b border-gray-100">نام مجموعه</th>
              <th className="py-4 px-2 border-b border-gray-100">نام بخش</th>
              <th className="py-4 px-2 border-b border-gray-100">نام دستگاه</th>
              <th className="py-4 px-2 border-b border-gray-100">
                آیدی دستگاه
              </th>
              <th className="py-4 px-2 border-b border-gray-100">تعداد بازی</th>
              <th className="py-4 px-2 border-b border-gray-100">مبلغ</th>
            </tr>
          </thead>
          <tbody className="text-[10px] md:text-xs text-gray-700">
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.date}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.time}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50 font-medium">
                    {row.location}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.sectionName}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.deviceName}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.deviceId}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.games}
                  </td>
                  <td className="py-4 px-2 border-b border-gray-50">
                    {row.income}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-10 text-gray-400">
                  داده‌ای برای نمایش یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
