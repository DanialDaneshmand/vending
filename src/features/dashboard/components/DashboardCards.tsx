import React from "react";
import { Bell, Wifi, Gift, Gamepad2, Wallet } from "lucide-react";
import DashboardCard from "./DashboardCard";

// ۱. تعریف تایپ برای داده‌های کارت
interface StatCard {
  id: number;
  title: string;
  value: string;
  unit?: string;
  trend: string;
  isNegativeTrend?: boolean; // برای رنگ قرمز/نارنجی هشدارها
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
}

// ۲. ساخت آرایه داده‌ها (Mock Data) دقیقاً مشابه تصویر
const cardsData: StatCard[] = [
  {
    id: 1,
    title: "درآمد امروز",
    value: "۱۲,۴۵۰,۰۰۰",
    unit: "تومان",
    trend: "+۱۷.۵٪ نسبت به دیروز",
    icon: Wallet,
    iconColor: "text-[#4000FE]",
    bgColor: "bg-[#E5DEFE] ",
  },
  {
    id: 2,
    title: "تعداد بازدید امروز",
    value: "۳۲۵",
    trend: "+۳۵ نسبت به دیروز",
    icon: Gamepad2,
    iconColor: "text-[#023AFD]",
    bgColor: "bg-[#D8E6FD]",
  },
  {
    id: 3,
    title: "جوایز ثبت‌شده",
    value: "۴۸",
    trend: "+۸ نسبت به دیروز",
    icon: Gift,
    iconColor: "text-[#FD6514]",
    bgColor: "bg-[#FEE7D6]",
  },
  {
    id: 4,
    title: "دستگاه‌های آنلاین",
    value: "۱۲",
    trend: "+۲ نسبت به دیروز",
    icon: Wifi,
    iconColor: "text-[#12A11A]",
    bgColor: "bg-[#E2F5E4]",
  },
  {
    id: 5,
    title: "هشدارهای باز",
    value: "۷",
    trend: "+۳ نسبت به دیروز",
    isNegativeTrend: true, // هشدارهای باز معمولاً رنگ قرمز یا اخطار دارند
    icon: Bell,
    iconColor: "text-[#F2060E]",
    bgColor: "bg-[#FDDFE0]",
  },
];

export default function DashboardCards() {
  return (
    <div className="w-full  py-4" dir="rtl">
      {/* گریدبندی واکنش‌گرا (ریسپانسیو) برای نمایش ۵ کارت در دسکتاپ و تک کارت در موبایل */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {cardsData.map((card) => {
          const IconComponent = card.icon;

          return (
            <DashboardCard
              key={card.id}
              IconComponent={IconComponent}
              card={card}
            />
          );
        })}
      </div>
    </div>
  );
}
