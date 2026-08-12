"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import { useState } from "react";

const DeviceControlCard = () => {
  const [isActive, setIsActive] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [freeGames,setFreeGames]=useState(100)
  const handleConfirm = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col h-full ">
      <span className="text-gray-800 font-bold  block mb-8  w-full ">
        کنترل دستگاه
      </span>
      <div className=" flex items-center  justify-between">
        <div className="  ">
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
              className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${isActive ? "bg-green-500" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? "left-1" : "left-6"}`}
              />
            </button>

            {/* Confirm Modal */}
            <ConfirmModal
              handleConfirm={handleConfirm}
              onClose={() => setIsShow(false)}
              open={isShow}
              title={`${isActive ? "تغییر وضعیت دستگاه به غیر فعال" : "تغییر وضعیت دستگاه به فعال"}`}
            />
          </div>
        </div>
        {/* Count Of Free Game */}
        <div className=" flex items-center  gap-x-2 text-xs sm:text-sm text-gray-500 font-semibold">
          <span>تعداد بازی های رایگان :</span>
          <span>{freeGames}</span>
        </div>
      </div>
      {/* Free Game Container */}
      <div className=" flex items-end gap-4  mt-10">
        <div className=" w-full">
          <label
            htmlFor=""
            className=" text-sm font-semibold text-gray-500 mr-1 mb-3 block"
          >
            تعداد بازی رایگان
          </label>
          <input
          onChange={(e)=>setFreeGames(+e.target.value)}
            value={freeGames}
            type="number"
            name="count"
            className=" py-2 rounded-lg outline-0 px-2 w-full border border-gray-100 shadow-sm bg-white"
          />
        </div>
        <button className="py-2 px-5 rounded-lg bg-emerald-600 text-white font-medium">
          ثبت
        </button>
      </div>
    </div>
  );
};

export default DeviceControlCard;
