import React from "react";
import { Wifi, CloudOff, AlertTriangle } from "lucide-react";

// آیکون اختصاصی دستگاه (کارت اول سمت راست) برای شباهت ۱۰۰ درصدی به تصویر
const DeviceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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

const statsData = [
  {
    id: 1,
    title: "کل دستگاه‌ها",
    value: "۲۰",
    unit: "دستگاه",
    icon: DeviceIcon,
    iconColor: "text-[#6D28D9]", // بنفش تیره
    iconBg: "bg-[#F5F3FF]", // پس‌زمینه بنفش ملایم
    subText: null,
  },
  {
    id: 2,
    title: "دستگاه‌های آنلاین",
    value: "۱۲",
    unit: "دستگاه",
    icon: Wifi,
    iconColor: "text-[#15803D]", // سبز تیره
    iconBg: "bg-[#E8F5E9]", // پس‌زمینه سبز ملایم
    subText: (
      <span className="text-[#15803D] text-xs font-bold flex items-center gap-0.5 justify-center">
        <span>↑</span>
        <span className="ml-1">%۶۰ از کل</span>
      </span>
    ),
  },
  {
    id: 3,
    title: "دستگاه‌های آفلاین",
    value: "۶",
    unit: "دستگاه",
    icon: CloudOff,
    iconColor: "text-[#B91C1C]", // قرمز تیره
    iconBg: "bg-[#FEE2E2]", // پس‌زمینه قرمز ملایم
    subText: (
      <span className="text-[#B91C1C] text-xs font-bold flex items-center gap-0.5 justify-center">
        <span>↓</span>
        <span className="ml-1">%۳۰ از کل</span>
      </span>
    ),
  },
  {
    id: 4,
    title: "موجودی کم",
    value: "۲",
    unit: "دستگاه",
    icon: AlertTriangle,
    iconColor: "text-[#C2410C]", // نارنجی تیره
    iconBg: "bg-[#FFF3E0]", // پس‌زمینه نارنجی ملایم
    subText: (
      <span className="text-[#C2410C] text-xs font-bold">نیاز به بررسی</span>
    ),
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white px-5 py-6 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between  transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            {/* بخش راست: آیکون دایره‌ای با پس‌زمینه رنگی */}
            <div className="h-full ">
                <div
              className={`w-14 h-14 rounded-full ${stat.iconBg} flex items-center justify-center shrink-0 shadow-inner`}
            >
              <Icon className={`w-7 h-7 ${stat.iconColor}`} />
            </div>
            </div>
            {/* بخش چپ: اطلاعات متنی وسط‌چین شده */}
            <div className="flex flex-col items-center justify-center flex-1 text-center pr-2">
              <span className="text-[12px] font-bold text-gray-500 mb-2">
                {stat.title}
              </span>
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] text-gray-400 mt-2 font-medium">
                {stat.unit}
              </span>

              {/* مقدار ترند پایین (اگر وجود داشته باشد) */}
              <div className="mt-4 h-4 flex items-center justify-center">
                {stat.subText}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
