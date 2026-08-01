import React from "react";
import {
  HiOutlineWallet,
  HiOutlineTrophy,
  HiOutlineGift,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";

const StatCard = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  subText,
}: any) => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex flex-col items-center justify-between  relative overflow-hidden">
    {/* هدر: عنوان و آیکون */}
    <div className="w-full flex justify-between items-start mb-2">
      <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 text-center">
        <p className="text-gray-700 text-sm font-bold mb-2">{title}</p>
        <h3 className="text-[#1e293b] text-xl font-bold dir-ltr tracking-tight">
          {value}
        </h3>
        <p className="text-gray-400 text-[10px] mt-1">{unit}</p>
      </div>
    </div>

    {/* فوتر: درصد تغییرات */}
    <div className="w-full mt-4 flex justify-center items-center gap-1 border-t border-gray-50 pt-3">
      <span className="text-gray-400 text-xs">نسبت به دوره قبل</span>
      <div className="flex items-center text-green-500 text-xs font-bold">
        <span>{change}</span>
        <HiOutlineArrowTrendingUp className="w-4 h-4 ml-0.5" />
      </div>
    </div>
  </div>
);

export default function ReportsCardsSection() {
  const stats = [
    {
      title: "درآمد کل",
      value: "۱۲,۴۵۰,۰۰۰",
      unit: "تومان",
      change: "۲۳٪",
      icon: LuWallet ,
      iconBg: "bg-[#E8DEFE]",
      iconColor: "text-[#3611A4]",
    },
    {
      title: "تعداد بازی",
      value: "۳,۲۵۶",
      unit: "بازی",
      change: "۱۸٪",
      icon: IoGameControllerOutline,
      iconBg: "bg-[#E1EFFF]",
      iconColor: "text-[#3D6BC5]",
    },
    {
      title: "برد / باخت",
      value: "۱,۹۸۷ / ۱,۲۶۹",
      unit: "برد / باخت",
      change: "۶۱٪", // نرخ برد
      icon: HiOutlineTrophy,
      iconBg: "bg-[#F9DFE2]",
      iconColor: "text-[#DB7269]",
    },
    {
      title: "جوایز توزیع شده",
      value: "۴۸",
      unit: "عدد",
      change: "۱۵٪",
      icon: HiOutlineGift,
      iconBg: "bg-[#FFE7D4]",
      iconColor: "text-[#EF7E2B]",
    },
  ];

  return (
    <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}
