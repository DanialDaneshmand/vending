import { Plus } from "lucide-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const WeeklySchedule = () => {
  const days = [
    {
      day: "شنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۲:۰۰ | ۱۳:۳۰ - ۰۲:۰۰",
      active: true,
    },
    {
      day: "یکشنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۲:۳۰ | ۱۳:۳۰ - ۱۲:۰۰",
      active: true,
    },
    {
      day: "دوشنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۲:۰۰ | ۱۳:۳۰ - ۰۷:۰۰",
      active: true,
    },
    {
      day: "سه‌شنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۱:۳۰ | ۱۳:۳۰ - ۰۲:۰۰",
      active: true,
    },
    {
      day: "چهارشنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۲:۰۰ | ۱۳:۳۰ - ۰۳:۰۰",
      active: true,
    },
    {
      day: "پنجشنبه",
      status: "فعال",
      ranges: "۰۷:۰۰ - ۱۲:۰۰ | ۱۳:۳۰ - ۰۲:۰۰",
      active: true,
    },
    { day: "جمعه", status: "غیرفعال", ranges: "—", active: false },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-[15px] font-bold text-gray-800">
          برنامه زمان‌بندی هفتگی
        </h2>
        <button className="flex mt-4 sm:mt-0 items-center gap-1.5 px-3 py-1.5 border border-blue-600 rounded-md text-blue-600 text-xs font-bold cursor-pointer transition-all">
          افزودن بازه زمانی
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-right text-[12px]">
          <thead>
            <tr className="text-gray-600 border-b border-gray-100">
              <th className="pb-3 ">روز</th>
              <th className="pb-3  text-center">وضعیت</th>
              <th className="pb-3  text-center">بازه‌های فعال</th>
              <th className="pb-3  text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {days.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 font-bold text-gray-600">{item.day}</td>
                <td className="py-3.5 text-center">
                  <span
                    className={`px-3 py-1 rounded-md text-xs ${item.active ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500"}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td
                  className="py-3.5 text-center text-gray-500 font-medium"
                  dir="ltr"
                >
                  {item.ranges}
                </td>
                <td className="py-3.5 text-left">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                      <FiEdit className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                      <FaRegTrashAlt className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedule;
