
"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import ConfirmModal from "@/components/shared/ConfirmModal";
import CreateBranchModal from "./CreateBranchModal";
import Link from "next/link";
import UseGetLocations from "@/shared/hooks/useGetLocations";
import { useDeleteLocation } from "../hooks/useDleteLocation";
import Skeleton from "react-loading-skeleton";
import clientApi from "@/shared/clientApi/clientApi";
import UseGetProfile from "@/shared/hooks/useGetProfile";
import { hasActionPermission } from "@/shared/permisseions/permissionUtils";

// --- کامپوننت مجزا برای هر ردیف جهت مدیریت درخواست‌های وابسته ---
const LocationRow = ({ 
  loc, 
  onDeleteId, 
  profileRole 
}: { 
  loc: any, 
  onDeleteId: (id: string) => void, 
  profileRole: string | undefined 
}) => {
  const [stats, setStats] = useState({ devices: 0, sections: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const sectionsResponse = await clientApi.get(`/locations/sections/list/?location_id=${loc.id}`);
        const sectionsList = sectionsResponse?.data?.items || []; 
        const sectionsCount = sectionsList.length;

        const deviceCountsPromises = sectionsList.map(async (section: any) => {
          const devResponse = await clientApi.get(`/devices/?location_id=${loc.id}&section_id=${section.id}`);
          return devResponse?.data?.items?.length || 0;
        });

        const deviceCountsArray = await Promise.all(deviceCountsPromises);
        const totalDevices = deviceCountsArray.reduce((acc, curr) => acc + curr, 0);

        setStats({ sections: sectionsCount, devices: totalDevices });
      } catch (error) {
        console.error(`Error fetching stats for location ${loc.id}:`, error);
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, [loc.id]);

  return (
    <tr className="hover:bg-gray-50/80 transition-colors group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-50 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-800">{loc.name}</span>
        </div>
      </td>
      <td className="p-4 text-sm text-gray-600">{loc.city || "شیراز"}</td>
      <td className="p-4 text-sm text-gray-600 text-center font-semibold">
        {isLoadingStats ? <Skeleton width={20} /> : stats.devices}
      </td>
      <td className="p-4 text-sm text-gray-600 text-center font-semibold">
        {isLoadingStats ? <Skeleton width={20} /> : stats.sections}
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-x-3">
          {/* دکمه مشاهده: برای همه نقش‌ها در دسترس است */}
          <Link
            href={`/places/${loc.id}`}
            className="text-xs border text-gray-400 border-gray-400 py-1 px-2 hover:border-blue-600 hover:text-blue-600 rounded-sm transition-all"
          >
            مشاهده مجموعه
          </Link>

          {/* دکمه حذف: فقط اگر کاربر دسترسی canDelete داشته باشد */}
          {hasActionPermission(profileRole, 'canDelete') && (
            <button
              onClick={() => onDeleteId(loc.id)}

              className="p-2 cursor-pointer text-gray-400 hover:text-red-500 rounded-lg transition-all"
              title="حذف مجموعه"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

// --- کامپوننت اصلی ---
export default function LocationManagement() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [isCreate, setIsCreate] = useState(false);
  const { isGettingLocations, locations } = UseGetLocations();
  const { deleteLocation } = useDeleteLocation();
  const { isgettingprofile, profile } = UseGetProfile();

  const handleConfirm = (locationId: string | undefined) => {
    if (!locationId) return;

    // چک امنیتی مجدد در لحظه تایید حذف
    if (hasActionPermission(profile?.role, 'canDelete')) {
      deleteLocation(locationId);
      setId(undefined);
    } else {
      console.error("شما دسترسی لازم برای حذف این مورد را ندارید.");
    }
  };

  return (
    <div className="p-4 border border-gray-100 rounded-lg shadow-sm">
      {/* بخش دکمه افزودن */}
      {isgettingprofile ? (
        <div className="flex items-center mb-4">
          <Skeleton className="h-11" width={160} borderRadius={10} />
        </div>
      ) : (
        <div className="flex items-center mb-4">
          {/* دکمه ثبت مجموعه جدید: فقط برای کسانی که canCreate دارند */}
          {hasActionPermission(profile?.role, 'canCreate') && (
            <button
              onClick={() => setIsCreate(true)}
              className="flex cursor-pointer items-center gap-2 bg-[#1D4ED8] text-white px-4 py-2.5 rounded-md transition-all font-medium text-sm hover:bg-blue-700"
            >
              <span className="text-xs sm:text-sm">ثبت مجموعه جدید</span>
              <div className="text-xs sm:text-sm">
                <FaPlus />
              </div>
            </button>
          )}
          <CreateBranchModal
            onClose={() => setIsCreate(false)}
            open={isCreate}
          />
        </div>
      )}

      {/* محتوای جدول */}
      {(isGettingLocations || isgettingprofile) ? (
        <div className="space-y-3">
          <Skeleton className="h-12" borderRadius={10} />
          <Skeleton className="h-12" borderRadius={10} />
          <Skeleton className="h-12" borderRadius={10} />
        </div>
      ) : locations?.items?.length === 0 ? (
        <div className="w-full flex justify-center">
          <div className="h-32 flex border-dashed w-full justify-center items-center px-10 border rounded-lg">
            <p className="text-gray-500">هیچ مجموعه‌ای ثبت نشده است!</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-lg">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-500">
                <th className="p-4 text-xs font-bold">نام مجموعه</th>
                <th className="p-4 text-xs font-bold">شهر</th>
                <th className="p-4 text-xs font-bold text-center">تعداد دستگاه</th>
                <th className="p-4 text-xs font-bold text-center">تعداد بخش</th>
                <th className="p-4 text-xs font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {locations?.items?.map((loc: any) => (
                <LocationRow 
                  key={loc.id} 
                  loc={loc} 
                  profileRole={profile?.role} 
                  onDeleteId={(locId) => setId(locId)} 
                />
              ))}
            </tbody>
          </table>

          <ConfirmModal
            onClose={() => setId(undefined)}
            open={Boolean(id)}
            title="حذف مجموعه"

            handleConfirm={() => handleConfirm(id)}
          />
        </div>
      )}
    </div>
  );
}