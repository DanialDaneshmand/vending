
"use client";
import React, { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";
import Link from "next/link";
import { LuTrash2 } from "react-icons/lu";
import UseGetDevicesList from "@/shared/hooks/useGetDevicesList";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { useDeleteDevice } from "../hooks/useDeleteDevice";
import Skeleton from "react-loading-skeleton";

// ... (DeviceMiniIcon همان قبلی)
const DeviceMiniIcon = () => (
  <svg className="w-4 h-4 text-blue-500 shrink-0 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="3" width="12" height="18" rx="2" /><rect x="9" y="6" width="6" height="5" rx="1" /><circle cx="10" cy="14" r="1" fill="currentColor" /><circle cx="14" cy="14" r="1" fill="currentColor" /><circle cx="10" cy="17" r="1" fill="currentColor" /><circle cx="14" cy="17" r="1" fill="currentColor" />
  </svg>
);

export default function DeviceManagementTable({ filters }: { filters: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { devicesList, isGettingDevicesList } = UseGetDevicesList(); // بدون پاس دادن فیلتر
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [deviceId, setDeviceId] = useState<null | string>(null);
  const { deleteDevice } = useDeleteDevice();

  const handleDeleteBtnClick = (id: string) => {
    setIsShowConfirmModal(true);
    setDeviceId(id);
  };

  const handleDeleleteDevice = () => {
    if (deviceId) deleteDevice(deviceId);
  };

const filteredData = useMemo(() => {
  if (!devicesList?.items) return [];

  return devicesList.items.filter((device: any) => {
    // 1. فیلتر جستجو (نام یا کد دستگاه)
    // اگر سرچ خالی باشد یا مقدار جستجو در نام یا کد دستگاه باشد
    const searchMatch = 
      filters.search === "" || 
      device.name?.toLowerCase().includes(filters.search.toLowerCase()) || 
      device.device_code?.toLowerCase().includes(filters.search.toLowerCase());

    // 2. فیلتر مجموعه ها
    // اگر مقدار 'all_places' یا 'همه مجموعه ها' باشد، یا مقدار با نام مکان دستگاه برابر باشد
    const locationMatch = 
      filters.places === "all_places" || 
      filters.places === "همه مجموعه ها" || 
      device.location_name === filters.places;

    // 3. فیلتر بخش ها
    const sectionMatch = 
      filters.sections === "all_sections" || 
      filters.sections === "همه بخش ها" || 
      device.section_name === filters.sections;

    // 4. فیلتر وضعیت دستگاه
    const statusMatch = 
      filters.status === "all_status" || 
      filters.status === "همه وضعیت ها" || 
      device.status === filters.status;

    // 5. فیلتر وضعیت اتصال (True/False)
    // تبدیل مقدار device.power_on به رشته برای مقایسه دقیق با 'true' یا 'false'
    const connectionMatch = 
      filters.alertType === "all_power" || 
      filters.alertType === "وضعیت اتصال " || 
      String(device.power_on) === filters.alertType;

    // 6. فیلتر وضعیت موجودی
    const inventoryMatch = 
      filters.inventory === "all_inventory" || 
      filters.inventory === "وضعیت موجودی" || 
      device.inventory_status === filters.inventory;

    // تمام شرط‌ها باید برقرار باشند (AND logic)
    return searchMatch && locationMatch && sectionMatch && statusMatch && connectionMatch && inventoryMatch;
  });
}, [devicesList, filters]);
  // --- صفحه‌بندی روی داده‌های فیلتر شده ---
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const totalPages = Math.ceil((filteredData.length || 0) / pageSize);

  return (
    <div className="w-full p-4 bg-white border border-gray-100 shadow-sm rounded-lg mt-4" dir="rtl">
      <p className="text-xl text-gray-600 mb-4">لیست دستگاه ها</p>

      {isGettingDevicesList ? (
        <Skeleton className="h-64" />
      ) : paginatedData.length === 0 ? (
        <div className="flex justify-center py-6">
          <div className="border border-gray-200 border-dashed rounded-lg w-full h-32 flex items-center justify-center">
            <p>هیچ دستگاهی با این مشخصات یافت نشد</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-4xl text-right border-separate border-spacing-y-2">
            <thead className="text-gray-400 text-sm font-medium">
              <tr>
                <th className="px-4 py-2 font-normal">نام دستگاه</th>
                <th className="px-4 py-2 font-normal text-nowrap">شناسه دستگاه</th>
                <th className="px-4 py-2 font-normal text-center">مکان</th>
                <th className="px-4 py-2 font-normal text-center">بخش</th>
                <th className="px-4 py-2 font-normal text-nowrap text-center">وضعیت دستگاه</th>
                <th className="px-4 py-2 font-normal text-nowrap text-center">موجودی</th>
                <th className="px-4 py-2 font-normal w-40 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((device: any) => (
                <tr key={device.id} className="bg-white hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3 rounded-r-lg text-nowrap border-y border-r border-gray-100 text-slate-700 text-[14px] font-medium align-middle">
                    <div className="flex items-center gap-2"><DeviceMiniIcon /> {device.name}</div>
                  </td>
                  <td className="px-4 w-16 py-3 text-center text-nowrap border-y border-gray-100 text-slate-500 text-[12px] align-middle">
                    {device.device_code}
                  </td>
                  <td className="px-4 text-center py-3 border-y border-gray-100 text-slate-500 text-[13px] text-nowrap align-middle">
                    {device.location_name}
                  </td>
                  <td className="px-4 py-3 border-y text-center border-gray-100 text-slate-500 text-[13px] text-nowrap align-middle">
                    {device.section_name}
                  </td>
                  <td className="px-4 text-center py-3 border-y border-gray-100 align-middle">
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                      device.status === "online" || device.status === "فعال" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                    }`}>{device.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center border-y border-gray-100 align-middle">

                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                      device.inventory_status === "ok" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"
                    }`}>{device.inventory_level}</span>
                  </td>
                  <td className="px-4 py-3 rounded-l-lg border-y border-l border-gray-100 align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/devices/${device.id}`}>
                        <button className="flex items-center gap-1 px-2 h-8 text-blue-600 border border-gray-200 cursor-pointer rounded-md text-[12px] font-medium transition-colors">
                          <Eye className="w-3.5 h-3.5" /> مشاهده
                        </button>
                      </Link>
                      <button onClick={() => handleDeleteBtnClick(device.id)} className="flex items-center gap-1 px-2 h-8 text-slate-600 border border-gray-200 cursor-pointer rounded-md text-[12px] font-medium transition-colors">
                        <LuTrash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmModal
            handleConfirm={handleDeleleteDevice}
            onClose={() => setIsShowConfirmModal(false)}
            open={isShowConfirmModal}
            title="حذف دستگاه"
          />
          <StyledPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      )}
    </div>
  );
}