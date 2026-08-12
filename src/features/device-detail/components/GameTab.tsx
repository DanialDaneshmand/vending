"use client";
import React from "react";
import { Gamepad2, TrendingUp, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// داده‌های نمونه برای نمودار (یک هفته اخیر)
const data = [
  { day: "شنبه", count: 45 },
  { day: "یکشنبه", count: 52 },
  { day: "دوشنبه", count: 38 },
  { day: "سه‌شنبه", count: 65 },
  { day: "چهارشنبه", count: 48 },
  { day: "پنجشنبه", count: 80 },
  { day: "جمعه", count: 95 },
];

const GameTab = () => {
  return (
    <div className="pt-4">
      {/* Grid اصلی برای ریسپانسیو سازی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* بخش اول: کارت تعداد بازی‌ها (اشغال ۱ ستون در حالت بزرگ) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full flex flex-col justify-between relative overflow-hidden group transition-all hover:shadow-md">
            {/* دکوراسیون پس‌زمینه کارت */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-70 group-hover:bg-blue-100 transition-colors" />

            <div className="relative z-10">
              

              <h3 className="text-slate-500 text-sm font-medium mb-1">
                کل بازی‌های ثبت شده
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  ۱,۲۸۴
                </span>
                <span className="text-slate-400 text-xs font-medium">بازی</span>
              </div>
            </div>

            <div className="mt-8 relative z-10 flex items-center gap-2 text-slate-400 text-xs">
              <Calendar size={14} />
              <span>به‌روزرسانی شده در لحظه</span>
            </div>
          </div>
        </div>

        {/* بخش دوم: نمودار تعداد بازی‌ها */}
        <div className="lg:col-span-2 w-full">
          {" "}
          {/* اضافه کردن w-full اینجا */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-full w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-bold text-lg">
                تحلیل بازی‌های روزانه
              </h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>تعداد بازی</span>
              </div>
            </div>

            {/* کانتینر نمودار با ارتفاع مشخص اما عرض کامل */}
            <div className="h-[280] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }} // حذف مارجین‌های اضافی برای چسبیدن به لبه‌ها
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      direction: "rtl",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTab;
