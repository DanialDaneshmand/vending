"use client";
import React, { useState } from "react";
import { Package, Database } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import InventoryTable from "./InventoryTable";
import SelectInput from "@/components/form/SelectInput";
import useGetDeviceTransactions from "../hooks/useGetDeviceTransactions";
import { useParams } from "next/navigation";
import { useAddManualInventory } from "../hooks/useAddManualInventory";
import useGetDeviceDetail from "@/shared/hooks/useGetDeviceDetail";
import toast from "react-hot-toast";

interface HandleChangeArg {
  target: {
    value: string | number;
    name: string;
  };
}

// داده‌های نمونه برای نمودار
const data = [
  { day: "شنبه", count: 120 },
  { day: "یکشنبه", count: 150 },
  { day: "دوشنبه", count: 110 },
  { day: "سه‌شنبه", count: 180 },
  { day: "چهارشنبه", count: 140 },
  { day: "پنجشنبه", count: 210 },
  { day: "جمعه", count: 250 },
];

const InventoryTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [changeValue, setChangeValue] = useState({
    count: 0,
    operator: "increase", // مقدار پیش‌فرض مطابق با id در SelectInput
  });

  const { deviceId } = useParams();

  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);

  const { deviceTransactions, isGettingDeviceTransactions } =
    useGetDeviceTransactions(deviceId as string);
  const { addManualInventory, isAddingManualInventory } =
    useAddManualInventory();

  const handleChange = (e: HandleChangeArg) => {
    setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
  };

  const handleAddInventory = () => {
    const numericValue = +changeValue.count;
    const currentInventory = device?.inventory_level || 0; // دریافت موجودی فعلی از API

    // ۱. بررسی اینکه مقدار صفر نباشد
    if (numericValue === 0) {
      toast.error("لطفاً یک مقدار غیر از صفر را وارد کنید");
      return;
    }

    // ۲. بررسی اینکه اگر عملیات "کم کردن" است، مقدار از موجودی فعلی بیشتر نباشد
    if (
      changeValue.operator === "decrease" &&
      numericValue > currentInventory
    ) {
      toast.error(
        `مقدار وارد شده بیشتر از موجودی فعلی (${currentInventory}) است و نمی‌توان آن را کم کرد`,
      );
      return;
    }

    // تعیین متن دلیل و مقدار نهایی دلتا
    const reasonText =
      changeValue.operator === "increase" ? "افزودن" : "کم کردن";
    const finalDelta =
      changeValue.operator === "decrease"
        ? -Math.abs(numericValue)
        : Math.abs(numericValue);

    // ارسال درخواست به API
    addManualInventory(
      {
        deviceId: deviceId as string,
        payload: {
          delta: finalDelta,
          reason: reasonText,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setChangeValue({ count: 0, operator: "increase" });
          toast.success("موجودی با موفقیت به‌روز شد");
        },
        onError: () => {
          toast.error("خطایی در ثبت تغییرات رخ داد");
        },
      },
    );
  };

  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* بخش اول: کارت موجودی کل (اشغال ۱ ستون در حالت بزرگ) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full flex flex-col justify-between relative overflow-hidden group transition-all">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-70 group-hover:bg-emerald-100 transition-colors" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Package size={28} />
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className=" py-2 px-5 rounded-lg text-white cursor-pointer bg-emerald-600 font-semibold text-sm"
                >
                  تغییر موجودی
                </button>
              </div>

              <h3 className="text-slate-500 text-sm font-medium mb-1">
                کل موجودی فعلی
              </h3>

              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-800">
                    {device?.inventory_level}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    واحد
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${isEditing ? "h-[165] transition-all duration-300" : " h-0 transition-all duration-300"}  overflow-hidden   mt-2 flex flex-col justify-center `}
            >
              <div className="flex items-start gap-x-2 w-full">
                <input
                  className={`${changeValue.operator === "increase" ? "text-green-600 border-green-600" : "text-red-600 border-red-600"} w-full h-12 outline-0 border mt-2  rounded-lg p-3  `}
                  type="number"
                  name="count"
                  value={changeValue.count}
                  onChange={(e) =>
                    handleChange({
                      target: { value: e.target.value, name: e.target.name },
                    })
                  }
                />
                <SelectInput
                  filterValues={changeValue}
                  handleChange={handleChange}
                  name="operator"
                  options={[
                    { id: "increase", title: "افزودن" },
                    { id: "decrease", title: "کم کردن" },
                  ]}
                />
              </div>
              <button
                onClick={handleAddInventory}
                disabled={isAddingManualInventory || +changeValue.count === 0}
                className="py-2 px-5 rounded-lg text-white mt-4 cursor-pointer bg-emerald-600 font-semibold text-sm disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isAddingManualInventory ? "در حال ثبت..." : "اعمال تغییرات"}
              </button>
            </div>

            <div className="mt-8 relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Database size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 w-full">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-800 font-bold text-lg">
                تحلیل تغییرات موجودی
              </h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>تعداد واحدها</span>
              </div>
            </div>

            {/* کانتینر نمودار */}
            <div className="h-[300] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorInventory"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                    stroke="#10b981" // Emerald 500
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorInventory)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="col-span-1 lg:col-span-3">
          <InventoryTable />
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
