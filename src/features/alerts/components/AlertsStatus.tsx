import React from "react";
import { Wifi, CheckCircle, Bell, AlertTriangle } from "lucide-react";
import { RiWifiOffLine } from "react-icons/ri";

const statsData = [
  {
    title: "آفلاین‌ها",
    value: "۱۲",
    description: "دستگاه آفلاین",
    change: "+۲ نسبت به دیروز",
    changeColor: "text-red-500",
    icon: <RiWifiOffLine  className="w-5 h-5 text-[#A0A0AB]" />,
    iconBg: "bg-[#EDEEF1]",
  },
  {
    title: "حل شده",
    value: "۳۲",
    description: "هشدار",
    change: "+۱۵ نسبت به دیروز",
    changeColor: "text-green-500",
    icon: <CheckCircle className="w-5 h-5 text-[#4E886C]" />,
    iconBg: "bg-[#E4F8EB]",
  },
  {
    title: "هشدارهای باز",
    value: "۱۸",
    description: "هشدار",
    change: "+۵ نسبت به دیروز",
    changeColor: "text-red-500",
    icon: <Bell className="w-5 h-5 text-[#C68656]" />,
    iconBg: "bg-[#FCEDD9]",
  },
  {
    title: "هشدارهای بحرانی",
    value: "۷",
    description: "هشدار",
    change: "+۳ نسبت به دیروز",
    changeColor: "text-red-500",
    icon: <AlertTriangle className="w-5 h-5 text-[#C6484B]" />,
    iconBg: "bg-[#F9DAD8]",
  },
];

export default function AlertStats() {
  return (
    <div className="">
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex  justify-between relative overflow-hidden h-40"
          >
            {/* Header: Title and Icon */}
            <div className="flex justify-between items-start">
              <div
                className={`p-2 rounded-full ${item.iconBg} flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>

            <div className="h-full">
              {/* Value */}
              <div className="flex h-full flex-col items-center justify-between ">
                <span className="text-sm font-bold text-slate-600">
                  {item.title}
                </span>
                <span className="text-4xl font-bold text-slate-800 mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-slate-400 font-normal">
                  {item.description}
                </span>
                
                <span className="text-xs text-slate-400 flex items-center gap-x-2 font-normal">
                  <span  className={`text-xs font-medium ${item.changeColor}`}>{item.change.split(" ")[0]}</span>
                  <span>{item.change.split(" ").slice(1).join(" ")}</span>
                </span>
              </div>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
