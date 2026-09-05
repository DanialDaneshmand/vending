
"use client";

import React, { useState, useMemo } from "react";
import PageTitle from "@/components/shared/PageTitle";
import DevicesFilterContainer from "@/features/devices/components/DevicesFilterContainer";
import Skeleton from "react-loading-skeleton";
import {  LuPlus, LuTrash2 } from "react-icons/lu";
import { toast } from "react-hot-toast";
import { LucideCheckCircle } from "lucide-react";
import UseGetDevicesList from "@/shared/hooks/useGetDevicesList";

const DISPLAY_DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const DAY_TO_API_MAP: Record<string, number> = {
  دوشنبه: 0, سه‌شنبه: 1, چهارشنبه: 2, پنجشنبه: 3, جمعه: 4, شنبه: 5, یکشنبه: 6,
};

interface TimeSlot {
  time: string; 
  action: "روشن" | "خاموش";
}

interface DaySchedule {
  day: string;
  active: boolean;
  schedules: TimeSlot[];
}

const DeviceMiniIcon = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" /><rect x="9" y="6" width="6" height="5" rx="1" />
    <circle cx="10" cy="14" r="1" fill="currentColor" /><circle cx="14" cy="14" r="1" fill="currentColor" />
    <circle cx="10" cy="17" r="1" fill="currentColor" /><circle cx="14" cy="17" r="1" fill="currentColor" />
  </svg>
);

export default function BulkSchedulingPage() {
  const initialFilters = {
    places: "همه مجموعه ها",
    sections: "همه بخش ها",
    alertType: "وضعیت اتصال ", 
    status: "همه وضعیت ها",
    inventory: "وضعیت موجودی",
    search: "",
  };
  const [filters, setFilterValues] = useState(initialFilters);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scheduleTemplate, setScheduleTemplate] = useState<DaySchedule[]>(
    DISPLAY_DAYS.map(day => ({ day, active: false, schedules: [] }))
  );

  const { devicesList, isGettingDevicesList } = UseGetDevicesList();
  

  const filteredData = useMemo(() => {
      if (!devicesList?.items) return [];
  
      return devicesList.items.filter((device: any) => {
        // 1. فیلتر جستجو
        const searchMatch =
          !filters.search ||
          filters.search === "" ||
          device.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          device.device_code
            ?.toLowerCase()
            .includes(filters.search.toLowerCase());
  
        // 2. فیلتر مجموعه ها (اصلاح شده برای ID)
        const locationMatch =
          filters.places === "all" ||
          filters.places === "all_places" ||
          filters.places === "همه مجموعه ها" ||
          device.location_id === filters.places; // ✅ حتماً از location_id استفاده کنید
  
        // 3. فیلتر بخش ها (اصلاح شده برای ID)
        const sectionMatch =
          filters.sections === "all" ||
          filters.sections === "all_sections" ||
          filters.sections === "همه بخش ها" ||
          device.section_id === filters.sections; // ✅ حتماً از section_id استفاده کنید
  
        // 4. فیلتر وضعیت دستگاه
        const statusMatch =
          !filters.status ||
          filters.status === "all" ||
          filters.status === "all_status" ||
          filters.status === "همه وضعیت ها" ||
          device.status === filters.status;
  
        // 5. فیلتر وضعیت اتصال (Power On)
        const connectionMatch =
          !filters.alertType ||
          filters.alertType === "all_power" ||
          filters.alertType === "وضعیت اتصال " ||
          String(device.power_on) === filters.alertType;
  
        // 6. فیلتر وضعیت موجودی
        const inventoryMatch =
          !filters.inventory ||
          filters.inventory === "all" ||
          filters.inventory === "all_inventory" ||
          filters.inventory === "وضعیت موجودی" ||
          device.inventory_status === filters.inventory;
  
        return (
          searchMatch &&
          locationMatch &&
          sectionMatch &&
          statusMatch &&
          connectionMatch &&
          inventoryMatch
        );
      });
    }, [devicesList, filters]);

  const toggleDevice = (id: string) => {

    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredData.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredData.map((d: any) => d.id)));
  };

  const toggleDayActive = (index: number) => {
    const next = [...scheduleTemplate];
    next[index].active = !next[index].active;
    setScheduleTemplate(next);
  };

  const addSlot = (dayIndex: number) => {
    const next = [...scheduleTemplate];
    next[dayIndex].schedules.push({ time: "12:00", action: "روشن" });
    setScheduleTemplate(next);
  };

  const updateSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, value: string) => {
    const next = [...scheduleTemplate];
    (next[dayIndex].schedules[slotIndex] as any)[field] = value;
    setScheduleTemplate(next);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const next = [...scheduleTemplate];
    next[dayIndex].schedules.splice(slotIndex, 1);
    setScheduleTemplate(next);
  };

  const handleBulkUpdate = async () => {
    if (selectedIds.size === 0) return toast.error("لطفا دستگاه‌ها را انتخاب کنید");
    const finalPayload = {
      deviceIds: Array.from(selectedIds),
      schedules: scheduleTemplate.map(item => ({
        day_of_week: DAY_TO_API_MAP[item.day],
        enabled: item.active,
        slots: item.schedules.map(s => {
          const [hour, minute] = s.time.split(":").map(Number);
          return { hour: isNaN(hour) ? 0 : hour, minute: isNaN(minute) ? 0 : minute, action: s.action === "روشن" ? "on" : "off" };
        })
      }))
    };
    console.log("Final Bulk Payload:", finalPayload);
    toast.success(`تنظیمات برای ${selectedIds.size} دستگاه ارسال شد`);
  };
  return (
    <section className="p-4" dir="rtl">
      <PageTitle title="آپدیت گروهی زمان‌بندی" description="داشبورد / زمان‌بندی گروهی" />

      <DevicesFilterContainer
        className="grid grid-cols-12 bg-white gap-6 sm:gap-4 mt-4 p-0 sm:p-4"
        filterValues={filters}
        handleInputChange={(e: any) => setFilterValues(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        onReset={() => setFilterValues(initialFilters)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

        {/* ۱. جدول انتخاب دستگاه‌ها (سمت راست) */}
        <div className="lg:col-span-7 bg-white p-4 border border-gray-100 shadow-sm rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-gray-600 font-medium">انتخاب دستگاه‌ها</p>
            <button onClick={toggleAll} className="text-sm text-blue-600 font-medium hover:underline">
              {selectedIds.size === filteredData.length ? "لغو انتخاب همه" : "انتخاب همه"}
            </button>
          </div>

          {isGettingDevicesList ? <Skeleton className="h-64" /> : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-separate border-spacing-y-2">
                <thead className="text-gray-400 text-sm font-medium">
                  <tr className="text-center">
                    <th className="px-4 py-2 w-10"></th>
                    <th className="px-4 py-2">نام دستگاه</th>
                    <th className="px-4 py-2">شناسه</th>
                    <th className="px-4 py-2">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredData.map((device: any) => (
                    <tr key={device.id} className={`transition-colors ${selectedIds.has(device.id) ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="px-4 py-3 border-y border-gray-100 rounded-r-lg text-center">
                        <input type="checkbox" checked={selectedIds.has(device.id)} onChange={() => toggleDevice(device.id)} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                      </td>
                      <td className="px-4 py-3 border-y border-gray-100 text-slate-700 text-sm font-medium text-right">
                        <div className="flex items-center gap-2"><DeviceMiniIcon /> {device.name}</div>
                      </td>
                      <td className="px-4 py-3 border-y border-gray-100 text-slate-500 text-xs">{device.device_code}</td>
                      <td className="px-4 py-3 border-y border-gray-100">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${device.status === "online" || device.status === "فعال" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                          {device.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ۲. پنل تنظیمات زمان‌بندی (سمت چپ) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-lg">
            <h2 className="text-lg text-gray-600 font-medium mb-6">تنظیم قالب زمان‌بندی مشترک</h2>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
              {scheduleTemplate.map((item, dayIdx) => (

                <div key={item.day} className={`p-3 rounded-xl border transition-all ${item.active ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-gray-50/30'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-700">{item.day}</span>
                      <button 
                        onClick={() => toggleDayActive(dayIdx)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${item.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                      >
                        {item.active ? "فعال" : "غیرفعال"}
                      </button>
                    </div>
                    {item.active && (
                      <button onClick={() => addSlot(dayIdx)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium">
                        <LuPlus className="w-3 h-3" /> افزودن زمان
                      </button>
                    )}
                  </div>

                  {item.active && (
                    <div className="space-y-2 mt-3">
                      {item.schedules.map((slot, slotIdx) => (
                        <div key={slotIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                          <input 
                            type="time" 
                            value={slot.time} 
                            onChange={(e) => updateSlot(dayIdx, slotIdx, 'time', e.target.value)}
                            className="w-24 text-center text-xs border rounded p-1 outline-none focus:ring-1 ring-blue-500" 
                          />
                          <select 
                            value={slot.action} 
                            onChange={(e) => updateSlot(dayIdx, slotIdx, 'action', e.target.value)}
                            className="text-xs border rounded p-1 outline-none focus:ring-1 ring-blue-500"
                          >
                            <option value="روشن">روشن</option>
                            <option value="خاموش">خاموش</option>
                          </select>
                          <button onClick={() => removeSlot(dayIdx, slotIdx)} className="p-1 text-red-400 hover:text-red-600">
                            <LuTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={handleBulkUpdate}
              disabled={selectedIds.size === 0}
              className={`w-full mt-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                selectedIds.size > 0 ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <LucideCheckCircle className="w-5 h-5" />
              ارسال تنظیمات به {selectedIds.size} دستگاه
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}