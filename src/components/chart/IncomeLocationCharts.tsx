"use client"
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// داده‌های نمونه بر اساس تصویر
const data = [
  { name: "پاساژ کوروش", value: 4000000 },
  { name: "میدان ونک", value: 3100000 },
  { name: "پارک ملت", value: 2200000 },
  { name: "بازار بزرگ", value: 2200000 },
  { name: "مجتمع ایران‌مال", value: 1800000 },
  { name: "ایستگاه مترو صادقیه", value: 1300000 },
];

// تابع برای تبدیل اعداد به فرمت M (میلیون) مشابه عکس
const formatYAxis = (value: number) => {
  if (value === 0) return "۰";
  return `${(value / 1000000).toLocaleString("fa-IR")}M`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-100 shadow-md rounded-lg dir-rtl">
        <p className="text-xs font-bold text-gray-700">{`${payload[0].payload.name}`}</p>
        <p className="text-xs text-blue-600">{`درآمد: ${payload[0].value.toLocaleString("fa-IR")} تومان`}</p>
      </div>
    );
  }
  return null;
};

export default function IncomeLocationChart() {
  return (
    <div
      className="w-full h-full border border-gray-100 shadow-sm rounded-lg p-4"
    >
      {/* هدر نمودار */}
      <div className="flex justify-between items-center mb-8">
        <h3 className=" font-bold text-gray-800">درآمد به تفکیک مکان</h3>
        <div className="flex items-center gap-2 border border-gray-100 shadow-sm rounded-md px-3 py-1 cursor-pointer hover:bg-gray-50">
          <span className="text-xs text-gray-600">هفتگی</span>
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

      <div className="h-[300] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            {/* خطوط راهنمای افقی به صورت نقطه چین مشابه عکس */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="name"
              axisLine={true}
              tickLine={false}
              stroke="#ccc" 
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              interval={0}
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              // تمام استایل‌های متنی (از جمله تراز بندی) رو داخل آبجکت tick قرار می‌دیم
              tick={{
                fill: "#94A3B8",
                fontSize: 10,
                textAnchor: "end", // جایگزین textAlign برای SVG: مقدار 'end' یعنی تراز راست (برای RTL)
              }}
              tickFormatter={formatYAxis}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />

            {/* ستون اصلی با رنگ آبی دقیق و لبه‌های گرد بالایی */}
            <Bar
              dataKey="value"
              fill="#1D4ED8"
              radius={[4, 4, 0, 0]}
              barSize={45}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#1D72F2" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* راهنمای پایین نمودار (Legend سفارشی) */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <span className="text-sm font-bold text-gray-500">درآمد (تومان)</span>
        <div className="w-3 h-3 rounded-full bg-[#1D72F2]"></div>
      </div>
    </div>
  );
}
