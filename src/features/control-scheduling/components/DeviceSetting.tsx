
"use client";

import useGetDevice_Detail from "@/shared/hooks/useGetDeviceDetail";
import { Laptop, Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useUpdatePrice } from "../hooks/useUpdatePrice";
import toast from "react-hot-toast";
import useGetToggle from "../hooks/useGetToggle";
import { useUpdateToggle } from "../hooks/useUpdateToggle";

export default function DeviceSetting() {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDevice_Detail(deviceId as string);
  const { isUpdatingPrice, updatePrice } = useUpdatePrice();
  const { isUpdatingToggle, updateToggle } = useUpdateToggle();
  const { isGettingToggle, toggle } = useGetToggle();
  

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    toggle_interval_s: 0,
    toggle_duration_s: 0,
    toggle_count: 0,
  });

  useEffect(() => {
    // 1. Populate Basic Device Info
    if (device) {
      setFormData((prev) => ({
        ...prev,
        name: device.name,
        price: device.price || 0,
      }));
    }

    // 2. Find specific toggle settings for this device from the items list
    if (toggle?.items && deviceId) {
      const deviceToggle = toggle.items.find(
        (item: any) => item.device_id === (deviceId as string)
      );

      if (deviceToggle) {
        setFormData((prev) => ({
          ...prev,
          toggle_interval_s: deviceToggle.toggle_interval_s || 0,
          toggle_duration_s: deviceToggle.toggle_duration_s || 0,
          toggle_count: deviceToggle.toggle_count || 0,
        }));
      }
    }
  }, [device, toggle, deviceId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async () => {
    if (!deviceId) return;
    try {
      await Promise.all([
        updatePrice({
          deviceId: deviceId as string,
          payload: { price: Number(formData.price) },
        }),
        updateToggle({
          deviceId: deviceId as string,
          payload: {
            toggle_interval_s: Number(formData.toggle_interval_s),
            toggle_duration_s: Number(formData.toggle_duration_s),
            toggle_count: Number(formData.toggle_count),
          },
        }),
      ]);
      toast.success("تنظیمات با موفقیت به‌روزرسانی شد!");
    } catch (error) {
      toast.error("خطا در به‌روزرسانی تنظیمات.");
    }
  };

  if (isGettingDevice) {
    return <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h2 className="text-slate-800 font-bold text-lg">
            {formData.name || "در حال بارگذاری..."}
          </h2>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Laptop size={24} />
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <label className="text-xs text-slate-500 block text-right">قیمت (ریال)</label>
          <input
            name="price"
            type="number"
            value={formData.price}

            onChange={handleInputChange}
            className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-left"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-700 border-b pb-2">تنظیمات Toggle</h4>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_duration_s"
              type="number"
              value={formData.toggle_duration_s}
              onChange={handleInputChange}
              className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
            />
            <span className="text-xs text-slate-500">زمان toggle (s)</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_interval_s"
              type="number"
              value={formData.toggle_interval_s}
              onChange={handleInputChange}
              className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
            />
            <span className="text-xs text-slate-500">فاصله بین تاگل‌ها (s)</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_count"
              type="number"
              value={formData.toggle_count}
              onChange={handleInputChange}
              className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
            />
            <span className="text-xs text-slate-500">تعداد toggle</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveSettings}
        disabled={isUpdatingPrice || isUpdatingToggle}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mt-8 disabled:bg-gray-400 disabled:shadow-none"
      >
        {isUpdatingPrice || isUpdatingToggle ? (
          <span className="animate-pulse">در حال ارسال...</span>
        ) : (
          <>
            <span>ارسال به دستگاه</span>
            <Send size={18} />
          </>
        )}
      </button>
    </div>
  );
}