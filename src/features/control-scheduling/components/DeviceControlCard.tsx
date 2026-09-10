
"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import { useEditDevice } from "@/features/device-detail/hooks/useEditDevice";
import useGetDeviceDetail from "@/shared/hooks/useGetDeviceDetail";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UseGetProfile from "@/shared/hooks/useGetProfile";
import { hasActionPermission } from "@/shared/permisseions/permissionUtils";
import { useSetFreeGame } from "../hooks/useSetFreeGame";

const DeviceControlCard = () => {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);
  const { editDevice, isEditingDevice } = useEditDevice();  
  const { isSettingFreeGame, setFreeGame } = useSetFreeGame();
  const { isgettingprofile, profile } = UseGetProfile();

  const [isShow, setIsShow] = useState(false);
  const [freeGames, setFreeGames] = useState(0); // استیت برای مقدار اینپوت و نمایش
  const [isActive, setIsActive] = useState(false);
  console.log(device);
  

  useEffect(() => {
    if (device) {
      setIsActive(device.is_active);
      // ✅ تغییر از free_games_count به free_play_remaining
      // اگر مقدار null یا undefined بود، 0 قرار می‌گیرد
      setFreeGames(device.free_play_remaining ?? 0);
    }
  }, [device]);

  const handleConfirm = async () => {
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      toast.error("شما دسترسی تغییر وضعیت دستگاه را ندارید");
      setIsShow(false);
      return;
    }

    const newStatus = !isActive;
    try {
      await editDevice({
        deviceId: deviceId as string,
        payload: { is_active: newStatus },
      });
      setIsActive(newStatus); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsShow(false); 
    }
  };

  const handleSaveFreeGames = async () => {
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      toast.error("شما دسترسی تغییر تعداد بازی‌ها را ندارید");
      return;
    }

    try {
      await setFreeGame({
        deviceId: deviceId as string,
        payload: {
          count: Number(freeGames), // تبدیل به عدد برای اطمینان
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("خطا در ذخیره تعداد بازی‌ها");
    }
  };

  if (isGettingDevice || isgettingprofile)
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg" />
    );

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col h-full ">
      <span className="text-gray-800 font-bold block mb-8 w-full ">
        کنترل دستگاه
      </span>
      <div className="flex items-center justify-between">
        <div>

          <span className="text-gray-600 font-medium text-sm">
            وضعیت دستگاه
          </span>
          <div className="flex items-center gap-3">
            <span className={`text-[11px] ${isActive ? "text-green-600" : "text-gray-400"}`}>
              {isActive ? "فعال" : "غیرفعال"}
            </span>

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
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? "left-1" : "left-6"}`} />
            </button>

            <ConfirmModal
              handleConfirm={handleConfirm}
              onClose={() => setIsShow(false)}
              open={isShow}
              title={`${isActive ? "تغییر وضعیت دستگاه به غیر فعال" : "تغییر وضعیت دستگاه به فعال"}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-2 text-xs sm:text-sm text-gray-500 font-semibold">
          <span>تعداد بازی های رایگان :</span>
          <span className="text-gray-800">{freeGames}</span>
        </div>
      </div>

      {hasActionPermission(profile?.role, 'canEdit') && (
        <div className="flex items-end gap-4 mt-10">
          <div className="w-full">
            <label className="text-sm font-semibold text-gray-500 mr-1 mb-3 block">
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
            disabled={isSettingFreeGame} // استفاده از لودینگ مخصوص این تابع
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-all"
          >
            {isSettingFreeGame ? "در حال ارسال..." : "ذخیره"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeviceControlCard;