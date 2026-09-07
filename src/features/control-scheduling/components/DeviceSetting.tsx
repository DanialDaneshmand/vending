
"use client";

import useGetDevice_Detail from "@/shared/hooks/useGetDeviceDetail";
import { Laptop, Send, Loader2 } from "lucide-react"; 
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useUpdatePrice } from "../hooks/useUpdatePrice";
import toast from "react-hot-toast";
import useGetToggle from "../hooks/useGetToggle";
import { useUpdateToggle } from "../hooks/useUpdateToggle";
import UseGetProfile from "@/shared/hooks/useGetProfile"; 
import { hasActionPermission } from "@/shared/permisseions/permissionUtils";
import useGetDeviceSetting from "@/features/device-detail/hooks/useGetDeviceSetting";

export default function DeviceSetting() {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDevice_Detail(deviceId as string);
  const { isUpdatingPrice, updatePrice } = useUpdatePrice();
  const { isUpdatingToggle, updateToggle } = useUpdateToggle();
  const { isGettingToggle, toggle } = useGetToggle();
  const {deviceSetting,isGettingDeviceSetting}=useGetDeviceSetting(deviceId as string);

  console.log(deviceSetting,"device");
  

  // --- Auth & Profile ---
  const { isgettingprofile, profile } = UseGetProfile();
  const canEdit = hasActionPermission(profile?.role, 'canEdit');

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    toggle_interval_s: 0,
    toggle_duration_s: 0,
    toggle_count: 0,
    pos_ip: "", // 🆕 اضافه شد
  });

  useEffect(() => {
    if (device) {
      setFormData((prev) => ({ 
        ...prev, 
        name: device.name, 
        price: device.price || 0,
        pos_ip: device.pos_ip || "" // 🆕 مقداردهی اولیه از دیتای دستگاه
      }));
    }
    if (toggle?.items && deviceId) {
      const deviceToggle = toggle.items.find((item: any) => item.device_id === (deviceId as string));
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
    if (!canEdit) return; 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async () => {
    if (!deviceId) return;
    if (!canEdit) return;

    try {
      await Promise.all([
        updatePrice({ deviceId: deviceId as string, payload: { price: Number(formData.price) } }),
        updateToggle({
          deviceId: deviceId as string,
          payload: {
            toggle_interval_s: Number(formData.toggle_interval_s),
            toggle_duration_s: Number(formData.toggle_duration_s),
            toggle_count: Number(formData.toggle_count),
            pos_ip: formData.pos_ip, // 🆕 ارسال به همراه تنظیمات تاگل
          },
        }),
      ]);
    } catch (error) {
      toast.error("خطا در به‌روزرسانی تنظیمات.");
    }
  };

  if (isGettingDevice || isgettingprofile) {
    return <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full flex flex-col" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-right">

          <h2 className="text-slate-800 font-bold text-lg">{formData.name || "در حال بارگذاری..."}</h2>
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
            readOnly={!canEdit}
            className={`w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-left ${!canEdit ? "opacity-70 cursor-not-allowed" : ""}`}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-700 border-b pb-2">تنظیمات Toggle</h4>

          {/* 🆕 اینپوت جدید برای POS IP */}
          <div className="flex items-center justify-between gap-4">
            <input
              name="pos_ip"
              type="text"
              value={formData.pos_ip}
              onChange={handleInputChange}
              readOnly={!canEdit}
              placeholder="مثلاً 192.168.1.1"
              className={`w-40 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500 ${!canEdit ? "opacity-70 cursor-not-allowed" : ""}`}
            />
            <span className="text-xs text-slate-500">آدرس POS IP</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_duration_s"
              type="number"
              value={formData.toggle_duration_s}
              onChange={handleInputChange}
              readOnly={!canEdit}
              className={`w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500 ${!canEdit ? "opacity-70 cursor-not-allowed" : ""}`}
            />
            <span className="text-xs text-slate-500">زمان toggle (s)</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_interval_s"
              type="number"
              value={formData.toggle_interval_s}
              onChange={handleInputChange}
              readOnly={!canEdit}
              className={`w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500 ${!canEdit ? "opacity-70 cursor-not-allowed" : ""}`}
            />
            <span className="text-xs text-slate-500">فاصله بین تاگل‌ها (s)</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              name="toggle_count"
              type="number"
              value={formData.toggle_count}
              onChange={handleInputChange}
              readOnly={!canEdit}
              className={`w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500 ${!canEdit ? "opacity-70 cursor-not-allowed" : ""}`}
            />
            <span className="text-xs text-slate-500">تعداد toggle</span>
          </div>
        </div>
      </div>

      {canEdit && (
        <button
          onClick={handleSaveSettings}
          disabled={isUpdatingPrice || isUpdatingToggle}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mt-8 disabled:bg-gray-400 disabled:shadow-none"
        >
          {isUpdatingPrice || isUpdatingToggle ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <span>ارسال به دستگاه</span>
              <Send size={18} />
            </>
          )}
        </button>
      )}
    </div>

  );
}