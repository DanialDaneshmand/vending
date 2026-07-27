import React from "react";
import { FiUser } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LuHeadphones } from "react-icons/lu";

// مدل داده‌های کارت‌ها
const statsData = [
  {
    id: 1,
    title: "اپراتورها",
    value: "۹۶",
    change: "+۲",
    changeText: "نسبت به دیروز",
    iconType: "support",
    bgColor: "bg-[#EFF6FF]", // آبی بسیار ملایم
    iconColor: "text-[#2563EB]", // آبی اصلی آیکون
  },
  {
    id: 2,
    title: "مدیران",
    value: "۱۲",
    change: "+۱",
    changeText: "نسبت به دیروز",
    iconType: "shield",
    bgColor: "bg-[#F5F3FF]", // بنفش بسیار ملایم
    iconColor: "text-[#7C3AED]", // بنفش اصلی آیکون
  },
  {
    id: 3,
    title: "کاربران فعال",
    value: "۱۰۸",
    change: "+۳",
    changeText: "نسبت به دیروز",
    iconType: "user-check",
    bgColor: "bg-[#E8F8F0]", // سبز بسیار ملایم
    iconColor: "text-[#10B981]", // سبز اصلی آیکون
  },
  {
    id: 4,
    title: "کل کاربران",
    value: "۱۲۵",
    change: "+۵",
    changeText: "نسبت به دیروز",
    iconType: "user",
    bgColor: "bg-[#E8F8F0]", // سبز بسیار ملایم
    iconColor: "text-[#10B981]", // سبز اصلی آیکون
  },
];

const UserCards = () => {
  return (
    <div>
      {/* گرید ریسپانسیو: در موبایل تک‌ستونه، در تبلت دو ستونه و در دسکتاپ ۴ ستونه */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-white mb-4 rounded-lg border border-gray-100 p-4 flex items-center gap-x-3 justify-start shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300"
          >
            {/* راست: آیکون اختصاصی با بک‌گراند رنگی متناسب */}
            <div className="h-full">
              <div
                className={`w-12 h-12 rounded-full ${item.bgColor} ${item.iconColor} flex items-center justify-center  `}
              >
                {renderIcon(item.iconType)}
              </div>
            </div>

            {/* چپ: بخش متنی (توضیحات، عدد بزرگ و درصد تغییرات) */}
            <div className="flex flex-col items-start  text-start">
              <span className="text-[13px] font-medium text-[#64748B] mb-2">
                {item.title}
              </span>
              <span className="text-xl font-bold text-[#0F172A] leading-none mb-2">
                {item.value}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold">
                <span className="text-[#10B981]">{item.change}</span>
                <span className="text-[#94A3B8]">{item.changeText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// تابع کمکی برای رسم دقیق آیکون‌های SVG
const renderIcon = (type: string) => {
  const props = {
    className: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
  };
  switch (type) {
    case "user":
      return <FiUser className="text-2xl" />;
    case "user-check":
      return <LiaUserCheckSolid className="text-2xl" />;
    case "shield":
      return <GoShieldCheck className="text-2xl" />;
    case "support":
      return <LuHeadphones className="text-2xl" />;
    default:
      return null;
  }
};

export default UserCards;
