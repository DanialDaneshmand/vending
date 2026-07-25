
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// ۱. دیتای نمونه بر اساس تصویر
const data = [
  { day: 'پنجشنبه', sales: 6200000 },
  { day: 'جمعه', sales: 9800000 },
  { day: 'شنبه', sales: 9200000 },
  { day: 'یکشنبه', sales: 13200000 },
  { day: 'دوشنبه', sales: 11500000 },
  { day: 'سه‌شنبه', sales: 9300000 },
  { day: 'امروز', sales: 15600000 },
];

// ۲. فرمت‌کننده مقادیر محور Y (تبدیل به فرمت M مانند تصویر)
const formatYAxis = (tick: number) => {
  if (tick === 0) return '۰';
  return `${tick / 1000000}M`;
};

// ۳. فرمت‌کننده تولتیپ (نمایش عدد به همراه تومان)
const formatTooltipValue = (value: any) => {
  return `${value.toLocaleString('fa-IR')} تومان`;
};

export default function WeeklySalesChart() {
  // برای جلوگیری از خطای Hydration در Next.js
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[350] w-full bg-white rounded-2xl animate-pulse" />;

  return (
    <div className="w-full rounded-lg border border-gray-100 bg-white p-6 shadow-sm" dir="rtl">

      {/* هدر نمودار شامل عنوان و دراپ‌دان بازه زمانی */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-800">
          نمودار فروش هفتگی <span className="text-xs font-normal text-gray-500">(تومان)</span>
        </h3>

        {/* دکمه دراپ‌دان تفکیک روز */}
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          <ChevronDown size={14} className="text-gray-500" />
          <span>۷ روز گذشته</span>
        </button>
      </div>

      {/* باکس اصلی نمودار */}
      <div className="h-[250] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* تعریف گرادینت رنگی برای زیر خط نمودار */}
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
              </linearGradient>
            </defs>


            {/* خطوط پس‌زمینه افقی و خط‌چین */}
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
            />

            {/* محور افقی (روزها) */}
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Vazirmatn, Tahoma' }}
              dy={10}
            />

            {/* محور عمودی (مبالغ فروش) */}
            <YAxis 
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              domain={[0, 20000000]}
              ticks={[0, 5000000, 10000000, 15000000, 20000000]}
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Vazirmatn, Tahoma' }}
              dx={-10}
            />

            {/* باکس جزئیات هنگام هاور کردن روی نقاط */}
            <Tooltip
              contentStyle={{
                direction: 'rtl',
                fontFamily: 'Vazirmatn, Tahoma',
                borderRadius: '8px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                fontSize: '12px'
              }}
              formatter={formatTooltipValue}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            />

            {/* خط اصلی نمودار و محدوده گرادینت */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#salesGradient)"
              // استایل نقاط روی نمودار
              dot={{ r: 4, fill: '#2563eb', strokeWidth: 1, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#1d4ed8', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}