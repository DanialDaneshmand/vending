"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// داده‌های نمونه برای شبیه‌سازی نقاط زیاد در عکس
const data = [
  { date: "۰۱/۰۶", value: 500000 },
  { date: "۰۳/۰۶", value: 1200000 },
  { date: "۰۵/۰۶", value: 2000000 },
  { date: "۰۷/۰۶", value: 1000000 },
  { date: "۰۹/۰۶", value: 2500000 },
  { date: "۱۱/۰۶", value: 1800000 },
  { date: "۱۳/۰۶", value: 2400000 },
  { date: "۱۵/۰۶", value: 1600000 },
  { date: "۱۷/۰۶", value: 2500000 },
  { date: "۱۹/۰۶", value: 2200000 },
  { date: "۲۱/۰۶", value: 1200000 },
  { date: "۲۳/۰۶", value: 2600000 },
  { date: "۲۵/۰۶", value: 3100000 },
  { date: "۲۷/۰۶", value: 1500000 },
  { date: "۲۹/۰۶", value: 2800000 },
  { date: "۳۱/۰۶", value: 2000000 },
];

const formatYAxis = (value: number) => {
  if (value === 0) return "۰";
  return `${(value / 1000000).toLocaleString("fa-IR")}M`;
};

export default function IncomeTrendChart() {
  return (
    <div className="w-full border bg-white border-gray-100 shadow-sm rounded-lg p-4">
      {/* هدر */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-bold text-gray-800">روند درآمد</h3>
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1 cursor-pointer hover:bg-gray-50">
          <span className="text-xs text-gray-600">روزانه</span>
          <svg
            className="w-3 h-3 text-gray-400"
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

      <div className="h-[300]  w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
          >
            <defs>
              {/* ایجاد گرادینت زیر نمودار مشابه عکس */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1D72F2" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1D72F2" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="date"
              axisLine={true} // فعال کردن خط محور
              tickLine={false}
              stroke="#ccc" 
              tick={{ fill: "#94A3B8", fontSize: 9 }}
              interval="preserveStartEnd"
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10, textAnchor: "end" }}
              tickFormatter={formatYAxis}
              dx={-10}
            />

            <Tooltip />

            <Area
              type="monotone" // برای ایجاد خطوط نرم و منحنی
              dataKey="value"
              stroke="#1D72F2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              // تنظیمات دایره‌های روی نقاط
              dot={{ r: 3, fill: "#1D72F2", strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}

      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="text-[10px] text-gray-500">درآمد (تومان)</span>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1D72F2] z-10"></div>
          <div className="w-6 h-[2p] bg-[#1D72F2] -ml-1"></div>
        </div>
      </div>
    </div>
  );
}
