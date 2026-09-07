
"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import { useEditDevice } from "@/features/device-detail/hooks/useEditDevice";
import useGetDeviceDetail from "@/shared/hooks/useGetDeviceDetail";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UseGetProfile from "@/shared/hooks/useGetProfile"; // اضافه شد
import { hasActionPermission } from "@/shared/permisseions/permissionUtils"; // اضافه شد

const DeviceControlCard = () => {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);
  const { editDevice, isEditingDevice } = useEditDevice();  

  // --- Auth & Profile ---
  const { isgettingprofile, profile } = UseGetProfile(); // اضافه شد

  const [isShow, setIsShow] = useState(false);
  const [freeGames, setFreeGames] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (device) {
      setIsActive(device.is_active);
      setFreeGames(device.free_games_count || 0);
    }
  }, [device]);

  const handleConfirm = async () => {
    // ✅ لایه امنیتی: چک دسترسی در لحظه تایید تغییر وضعیت
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      toast.error("شما دسترسی تغییر وضعیت دستگاه را ندارید");
      setIsShow(false);
      return;
    }

    const newStatus = !isActive;

    try {
      await editDevice({
        deviceId: deviceId as string,
        payload: {
          is_active: newStatus,
        },
      });

      setIsActive(newStatus); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsShow(false); 
    }
  };

  const handleSaveFreeGames = async () => {
    // ✅ لایه امنیتی: چک دسترسی در لحظه ذخیره تعداد بازی‌ها
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      toast.error("شما دسترسی تغییر تعداد بازی‌ها را ندارید");
      return;
    }

    try {
      await editDevice({
        deviceId: deviceId as string,
        payload: {
          free_games_count: freeGames, 
        },
      });
      toast.success("Free games count updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isGettingDevice || isgettingprofile) // لودینگ پروفایل اضافه شد
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />
    );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col h-full ">
      <span className="text-gray-800 font-bold block mb-8 w-full ">
        کنترل دستگاه
      </span>
      <div className=" flex items-center justify-between">
        <div className=" ">
          <span className="text-gray-600 font-medium text-sm">
            وضعیت دستگاه
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] ${isActive ? "text-green-600" : "text-gray-400"}`}
            >
              {isActive ? "فعال" : "غیرفعال"}
            </span>

            {/* ✅ کنترل دسترسی: دکمه Toggle فقط برای کاربران مجاز فعال باشد */}
            <button
              onClick={() => {

                if (hasActionPermission(profile?.role, 'canEdit')) {
                  setIsShow(true);
                } else {
                  toast.error("شما دسترسی تغییر وضعیت را ندارید");
                }
              }}
              disabled={isEditingDevice}
              className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? "left-1" : "left-6"}`}
              />
            </button>

            <ConfirmModal
              handleConfirm={handleConfirm}
              onClose={() => setIsShow(false)}
              open={isShow}
              title={`${isActive ? "تغییر وضعیت دستگاه به غیر فعال" : "تغییر وضعیت دستگاه به فعال"}`}
            />
          </div>
        </div>
        <div className=" flex items-center gap-x-2 text-xs sm:text-sm text-gray-500 font-semibold">
          <span>تعداد بازی های رایگان :</span>
          <span className="text-gray-800">{freeGames}</span>
        </div>
      </div>

      {/* ✅ کنترل دسترسی: بخش ورودی تعداد بازی‌ها فقط برای کاربران مجاز نمایش داده شود */}
      {hasActionPermission(profile?.role, 'canEdit') && (
        <div className=" flex items-end gap-4 mt-10">
          <div className=" w-full">
            <label className=" text-sm font-semibold text-gray-500 mr-1 mb-3 block">
              تعداد بازی رایگان
            </label>
            <input
              type="number"
              value={freeGames}
              onChange={(e) => setFreeGames(Number(e.target.value))}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleSaveFreeGames}
            disabled={isEditingDevice}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-all"
          >
            ذخیره
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceControlCard;