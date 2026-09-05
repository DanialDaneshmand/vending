"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import { useEditDevice } from "@/features/device-detail/hooks/useEditDevice";
import useGetDeviceDetail from "@/shared/hooks/useGetDeviceDetail";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const DeviceControlCard = () => {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);
  const { editDevice, isEditingDevice } = useEditDevice();  

  const [isShow, setIsShow] = useState(false);
  const [freeGames, setFreeGames] = useState(0);

  // Local state to handle the toggle UI immediately, initialized from API data
  const [isActive, setIsActive] = useState(false);

  // Sync local state with API data when device information is loaded
  useEffect(() => {
    if (device) {
      setIsActive(device.is_active);
      // Assuming there's a field for free games in your API, otherwise default to 0
      setFreeGames(device.free_games_count || 0);
    }
  }, [device]);

  // Handle the actual API update for device status
  const handleConfirm = async () => {
    const newStatus = !isActive;

    try {
      await editDevice({
        deviceId: deviceId as string,
        payload: {
          is_active: newStatus,
        },
      });

      setIsActive(newStatus); // Update UI state on success
    } catch (error) {
      console.log(error);
    } finally {
      setIsShow(false); // Close modal
    }
  };

  // Handle updating the number of free games
  const handleSaveFreeGames = async () => {
    try {
      await editDevice({
        deviceId: deviceId as string,
        payload: {
          free_games_count: freeGames, // Adjust the key name based on your API documentation
        },
      });
      toast.success("Free games count updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isGettingDevice)
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
            <button
              onClick={() => setIsShow(true)}
              disabled={isEditingDevice}
              className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? "left-1" : "left-6"}`}
              />
            </button>

            {/* Confirm Modal for status toggle */}
            <ConfirmModal
              handleConfirm={handleConfirm}
              onClose={() => setIsShow(false)}
              open={isShow}
              title={`${isActive ? "تغییر وضعیت دستگاه به غیر فعال" : "تغییر وضعیت دستگاه به فعال"}`}
            />
          </div>
        </div>
        {/* Display of Free Games Count */}
        <div className=" flex items-center gap-x-2 text-xs sm:text-sm text-gray-500 font-semibold">
          <span>تعداد بازی های رایگان :</span>
          <span className="text-gray-800">{freeGames}</span>
        </div>
      </div>
      {/* Input for adjusting Free Games */}
      <div className=" flex items-end gap-4 mt-10">
        <div className=" w-full">
          <label className=" text-sm font-semibold text-gray-500 mr-1 mb-3 block">
            تعداد بازی رایگان
          </label>
          <input
            onChange={(e) => setFreeGames(+e.target.value)}
            value={freeGames}
            type="number"
            className=" py-2 rounded-lg outline-0 px-2 w-full border border-gray-100 shadow-sm bg-white"
          />
        </div>
        <button
          onClick={handleSaveFreeGames}
          disabled={isEditingDevice}
          className="py-2 px-5 rounded-lg bg-emerald-600 text-white font-medium disabled:bg-gray-400 transition-colors"
        >
          {isEditingDevice ? "..." : "ثبت"}
        </button>
      </div>
    </div>
  );
};

export default DeviceControlCard;
