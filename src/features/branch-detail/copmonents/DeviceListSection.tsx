"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Trash2, Plus, Smartphone, Circle } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import CreateDeviceModal from "./CreateDeviceModal";
import UseGetDevicesSection from "../hooks/useGetDevicesSection";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { useDeleteDevice } from "../hooks/useDeleteDevice";

interface DeviceListSectionProps {
  sectionId: string | null;
}

export default function DeviceListSection({
  sectionId,
}: DeviceListSectionProps) {
  const [isCreateDevice, setIsCreateDevice] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const { branchId } = useParams();

  const { devicesSection, isGettingDevicesSection } = UseGetDevicesSection(
    sectionId as string,
    branchId as string,
  );

  const {deleteDevice,isDeletingDevice}=useDeleteDevice()

  const handleDeleteClick = (id: string) => {
    setDeviceId(id);
  };

  const handleDelete = async() => {
    if(deviceId){
      await deleteDevice(deviceId)
    }
  };
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
      {sectionId ? (
        <div>
          {/* هدر صفحه: عنوان و دکمه افزودن */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-600">
                لیست دستگاه‌ها
              </h1>
            </div>
            {false ? (
              <Skeleton className="h-11" width={160} />
            ) : (
              <button
                onClick={() => setIsCreateDevice(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm font-medium text-sm"
              >
                افزودن دستگاه
                <span>
                  <FaPlus />
                </span>
              </button>
            )}
          </div>
          {/* Craete Device Modal */}
          <CreateDeviceModal
            locationId={branchId as string}
            sectionId={sectionId}
            onClose={() => setIsCreateDevice(false)}
            open={isCreateDevice}
          />
          {/* Confirm Modal */}
          <ConfirmModal handleConfirm={handleDelete} onClose={()=>setDeviceId(null)} open={Boolean(deviceId)} title="حذف دستگاه" />

          {/* لیست کارت‌ها */}
          {isGettingDevicesSection ? (
            <Skeleton className="h-64 " borderRadius={10} />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {devicesSection?.items?.length > 0 ? (
                devicesSection?.items?.map((device: any) => (
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
                          {device.device_id}
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
                        onClick={() => handleDeleteClick(device.id)}
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
          )}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="text-gray-500 font-semibold ">
            برای نماش تعداد دستگاه ها یک بخش را انتخاب کنید.
          </h3>
        </div>
      )}
    </div>
  );
}
