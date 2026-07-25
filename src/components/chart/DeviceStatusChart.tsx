"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// ۱. تعریف ساختار تایپ داده‌ها
interface DeviceStatus {
  name: string;
  value: number; // تعداد دستگاه‌ها
  percentage: number; // درصد
  color: string; // رنگ اختصاصی سگمنت
}

// ۲. آرایه داده‌ها بر اساس تصویر
const devicesData: DeviceStatus[] = [
  { name: "آنلاین", value: 12, percentage: 60, color: "#22c55e" }, // سبز
  { name: "آفلاین", value: 5, percentage: 25, color: "#cbd5e1" }, // خاکستری
  { name: "غیرفعال", value: 3, percentage: 15, color: "#ef4444" }, // قرمز
];

export default function DeviceStatusChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[280] w-full max-w-sm bg-white rounded-lg animate-pulse" />
    );
  }

  // محاسبه کل دستگاه‌ها برای نمایش در مرکز نمودار
  const totalDevices = devicesData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div
      className="w-full h-[350]  rounded-lg border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between"
      dir="rtl"
    >
      {/* هدر کارت */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">وضعیت دستگاه‌ها</h3>
      </div>

      {/* بخش اصلی: نمودار و راهنما (Legend) */}
      <div className="flex items-center justify-between gap-4 my-2">
        {/* نمودار دونات در سمت چپ همراه با نوشته وسط */}
        <div className="relative w-[150] h-[150] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={devicesData}
                cx="50%"
                cy="50%"
                innerRadius={52} // شعاع داخلی برای ایجاد حفره دونات
                outerRadius={70} // شعاع خارجی
                paddingAngle={0} // بدون فاصله بین سگمنت‌ها طبق تصویر
                dataKey="value"
                startAngle={90} // شروع از نقطه ساعت ۱۲
                endAngle={-270} // حرکت ساعت‌گرد
              >
                {devicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* متن وسط نمودار دونات */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-800 leading-none">
              {totalDevices.toLocaleString("fa-IR")}
            </span>
            <span className="text-[10px] font-bold text-gray-400 mt-1">
              دستگاه کل
            </span>
          </div>
        </div>

        {/* راهنمای سمت راست (Legend) */}
        <div className="flex flex-col gap-4">
          {devicesData.map((item) => (
            <div key={item.name} className="flex flex-col items-start">
              {/* نام وضعیت و دایره رنگی */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold text-slate-700">
                  {item.name}
                </span>
              </div>
              {/* درصد زیر نام */}
              <span className="text-[11px] font-medium text-gray-400 mr-4.5">
                ({item.percentage.toLocaleString("fa-IR")}٪)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* دکمه فوتر برای هدایت به صفحه تمام دستگاه‌ها */}
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>مشاهده همه دستگاه‌ها</span>
          <ChevronLeft size={14} />
        </a>
      </div>
    </div>
  );
}
