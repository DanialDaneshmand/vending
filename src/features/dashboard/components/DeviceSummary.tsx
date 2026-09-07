"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import useGetDashboardInfo from "../hooks/useGetDashboardInfo";
import React from "react";
import UseGetDevicesList from "@/shared/hooks/useGetDevicesList";

const DeviceMiniIcon = () => (
  <svg
    className="w-4 h-4 text-blue-500 shrink-0 ml-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <rect x="9" y="6" width="6" height="5" rx="1" />
    <circle cx="10" cy="14" r="1" fill="currentColor" />
    <circle cx="14" cy="14" r="1" fill="currentColor" />
    <circle cx="10" cy="17" r="1" fill="currentColor" />
    <circle cx="14" cy="17" r="1" fill="currentColor" />
  </svg>
);

const getStatusText = (status: string) => {
  switch (status) {
    case "online":
      return "آنلاین";
    case "offline":
      return "آفلاین";
    case "pending":
      return "در انتظار";
    default:
      return status;
  }
};

const getInventoryText = (status: string) => {
  return status === "ok" ? "مناسب" : "کم";
};

export default function DeviceSummary() {
  const { dashboardInfo, isgettingDashboardInfo } = useGetDashboardInfo();
  const { devicesList, isGettingDevicesList } = UseGetDevicesList();

  

  // ۱. دریافت دیتای واقعی از بک‌اِند
  const allDevices = devicesList?.items|| [];

  // ۲. اعمال منطق فیلتر و مرتب‌سازی (دقیقاً مشابه کد استاتیک شما)
  const filteredAndSortedDevices = React.useMemo(() => {
    return allDevices
      .filter((device: any) => device.status !== "online") // حذف آنلاین‌ها
      .sort((a: any, b: any) => {
        // اولویت با آفلاین‌ها (بالا قرار بگیرند)
        if (a.status === "offline" && b.status !== "offline") return -1;
        if (b.status === "offline" && a.status !== "offline") return 1;
        return 0;
      });
  }, [allDevices]);

  // نمایش Skeleton در زمان لودینگ
  if (isgettingDashboardInfo) {
    return (
      <div
        className="bg-white h-full rounded-lg p-4 shadow-sm border border-gray-100 overflow-hidden animate-pulse"
        dir="rtl"
      >
        <div className="flex justify-between items-center pb-4">
          <div className="w-32 h-5 bg-gray-200 rounded" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-24 h-3 bg-gray-200 rounded" />
              </div>
              <div className="w-16 h-3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white h-full rounded-lg p-4 shadow-sm border border-gray-100 overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <h2 className="font-bold text-gray-800">خلاصه دستگاه‌ها</h2>
        <Link
          href="/devices"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>مشاهده همه</span>
          <ChevronLeft size={14} />
        </Link>
      </div>

      {/* Table Section */}

      <div className="w-full p-4 bg-white border border-gray-100 shadow-sm rounded-lg mt-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-4xl text-right border-separate border-spacing-y-2">
            <thead className="text-gray-400 text-sm font-medium">
              <tr>
                <th className="px-4 py-2 font-normal text-right">نام دستگاه</th>
                <th className="px-4 py-2 font-normal text-center">
                  شناسه دستگاه
                </th>
                <th className="px-4 py-2 font-normal text-center">مکان</th>
                <th className="px-4 py-2 font-normal text-center">بخش</th>
                <th className="px-4 py-2 font-normal text-center">
                  وضعیت دستگاه
                </th>
                <th className="px-4 py-2 font-normal text-center">موجودی</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedDevices.length > 0 ? (
                filteredAndSortedDevices.map((device: any) => (
                  <tr
                    key={device.id}
                    className="bg-white hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-4 py-3 rounded-r-lg border-y border-r border-gray-100 text-slate-700 text-[14px] font-medium flex items-center">
                      <DeviceMiniIcon /> {device.name || device.device_code}
                    </td>
                    <td className="px-4 py-3 text-center border-y border-gray-100 text-slate-500 text-[14px]">
                      {device.device_code}
                    </td>
                    <td className="px-4 py-3 text-center border-y border-gray-100 text-slate-500 text-[13px] text-nowrap">
                      {device.location_name}
                    </td>
                    <td className="px-4 py-3 text-center border-y border-gray-100 text-slate-500 text-[13px] text-nowrap">
                      {device.section_name || "_"}
                    </td>
                    <td className="px-4 py-3 text-center border-y border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          device.status === "online"
                            ? "bg-green-50 text-green-600"
                            : device.status === "offline"
                              ? "bg-red-50 text-red-500"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {getStatusText(device.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center border-y border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                          device.inventory_status === "ok"
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-500"
                        }`}
                      >
                        {getInventoryText(device.inventory_status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-400 text-sm"
                  >
                    هیچ دستگاهی با وضعیت مورد نظر یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
