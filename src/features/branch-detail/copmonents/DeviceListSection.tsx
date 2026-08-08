"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Trash2, Plus, Smartphone, Circle } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import CreateDeviceModal from "./CreateDeviceModal";

interface SectionType {
  id: string;
  name: string;
  deviceCount: number;
}

interface DeviceListSectionProps {
  section: SectionType | null;
  setSection: Dispatch<SetStateAction<SectionType | null>>;
}

// دیتای استاتیک برای دستگاه‌های یک بخش
const initialDevices = [
  { id: "DEV-101", name: "وندینگ مرکزی - A1", status: "روشن" },
  { id: "DEV-102", name: "وندینگ ورودی - B2", status: "خاموش" },
  { id: "DEV-103", name: "وندینگ کافیه - C1", status: "آفلاین" },
  { id: "DEV-104", name: "وندینگ لابی - L1", status: "روشن" },
  { id: "DEV-105", name: "وندینگ راهرو - H2", status: "روشن" },
  { id: "DEV-106", name: "وندینگ طبقه اول - F1", status: "آفلاین" },
];

export default function DeviceListSection({
  section,
  setSection,
}: DeviceListSectionProps) {
  const [devices, setDevices] = useState(initialDevices);
  const [isCreateDevice, setIsCreateDevice] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("آیا از حذف این دستگاه اطمینان دارید؟")) {
      setDevices(devices.filter((device) => device.id !== id));
    }
  };

  // تابع کمکی برای تعیین رنگ Badge وضعیت
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "روشن":
        return "bg-green-50 text-green-600 border-green-100";
      case "خاموش":
        return "bg-gray-50 text-gray-500 border-gray-100";
      case "آفلاین":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-400 border-gray-100";
    }
  };

  return (
    <div
      className=" mx-auto p-4 border border-gray-100 shadow-sm bg-white rounded-lg pt-8 h-full"
      dir="rtl"
    >
      {section ? (
        <div>
          {/* هدر صفحه: عنوان و دکمه افزودن */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-600">
                لیست دستگاه‌ها
              </h1>
            </div>
            <button
              onClick={() => setIsCreateDevice(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm font-medium text-sm"
            >
              افزودن دستگاه
              <span>
                <FaPlus />
              </span>
            </button>
          </div>
          {/* Craete Device Modal */}
          <CreateDeviceModal
            onClose={() => setIsCreateDevice(false)}
            open={isCreateDevice}
          />

          {/* لیست کارت‌ها */}
          <div className="grid grid-cols-1 gap-3">
            {devices.length > 0 ? (
              devices.map((device) => (
                <div
                  key={device.id}
                  className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between group"
                >
                  {/* بخش اطلاعات دستگاه */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                      <Smartphone size={22} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold text-sm">
                        {device.name}
                      </span>
                      <span className="text-gray-400 text-xs font-mono">
                        {device.id}
                      </span>
                    </div>
                  </div>

                  {/* بخش وضعیت و عملیات */}
                  <div className="flex items-center gap-6">
                    {/* Badge وضعیت */}

                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyles(device.status)}`}
                    >
                      <Circle size={8} fill="currentColor" />
                      {device.status}
                    </div>

                    {/* دکمه حذف */}
                    <button
                      onClick={() => handleDelete(device.id)}
                      className="p-2 text-gray-400 hover:text-red-500  rounded-lg transition-all "
                      title="حذف دستگاه"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400">
                  هیچ دستگاهی در این بخش یافت نشد.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center"> 
          <h3 className="text-gray-500 font-semibold ">برای نماش تعداد دستگاه ها یک بخش را انتخاب کنید.</h3>
        </div>
      )}
    </div>
  );
}
