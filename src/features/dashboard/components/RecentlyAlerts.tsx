import React from "react";
import {
  ChevronLeft,
  AlertTriangle,
  AlertCircle,
  Info,
  OctagonAlert,
} from "lucide-react";

// ۱. تعریف دیتای هشدارها
const alerts = [
  {
    id: 1,
    title: "اتمام موجودی جایزه در دستگاه VM-102",
    location: "مجتمع تجاری کوروش",
    time: "۱۰:۳۲",
    type: "critical", // قرمز
  },
  {
    id: 2,
    title: "مشکل ارتباط در دستگاه VM-205",
    location: "شهرداری سعادت آباد",
    time: "۰۹:۴۸",
    type: "warning", // نارنجی
  },
  
  {
    id: 5,
    title: "گیر کردن جایزه در دستگاه VM-103",
    location: "پارک ملت",
    time: "۲۱:۰۲",
    date: "دیروز",
    type: "critical", // قرمز
  },
];

// تابع کمکی برای انتخاب آیکون و رنگ بر اساس نوع هشدار
const getAlertStyle = (type: string) => {
  switch (type) {
    case "critical":
      return {
        icon: <AlertTriangle size={20} />,
        bg: "bg-[#F8E8E8]",
        text: "text-[#FA0000]",
        border: "border-red-100",
      };
    case "warning":
      return {
        icon: <AlertCircle size={20} />,
        bg: "bg-[#FEF1E6]",
        text: "text-[#FD4900]",
        border: "border-orange-100",
      };
    case "info":
      return {
        icon: <Info size={20} />,
        bg: "bg-[#E7F0FE]",
        text: "text-[#003AFD]",
        border: "border-blue-100",
      };
    default:
      return {
        icon: <OctagonAlert size={20} />,
        bg: "bg-gray-50",
        text: "text-gray-500",
        border: "border-gray-100",
      };
  }
};

export default function RecentAlerts() {
  return (
    <div
      className="w-full  h-[350] rounded-lg border border-gray-100 bg-white py-5 px-3 shadow-sm"
      dir="rtl"
    >
      {/* هدر کارت */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-black text-slate-800">هشدارهای اخیر</h3>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[13px] font-bold text-white">
            ۷
          </span>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>مشاهده همه</span>
          <ChevronLeft size={14} />
        </a>
      </div>

      {/* لیست هشدارها */}
      <div className="flex flex-col">
        {alerts.map((alert, index) => {
          const style = getAlertStyle(alert.type);
          return (
            <div
              key={alert.id}
              className={`flex items-center my-1 justify-between py-4  ${
                index !== alerts.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              {/* بخش سمت چپ: آیکون */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bg} ${style.text} border ${style.border}`}
              >
                {style.icon}
              </div>

              {/* بخش وسط: محتوا */}
              <div className="flex flex-col  flex-1 px-2 text-right">
                <h4 className="text-xs font-bold text-slate-700 leading-tight">
                  {alert.title}
                </h4>
                <p className="text-xs font-medium text-gray-400 mt-1">
                  مکان: {alert.location}
                </p>
              </div>
              {/* بخش سمت راست: زمان */}
              <div className="flex flex-row-reverse  w-12 items-center gap-1 text-gray-400 ">
                <span className="text-[11px] font-medium">{alert.time}</span>

                {alert?.date && (
                  <span className="text-[11px] font-medium">{alert.date}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
