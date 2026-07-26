"use client"

import { useState } from "react";

const DeviceControlCard = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col h-full ">
     <span className="text-gray-800 font-bold text-sm block mb-8  w-full ">کنترل دستگاه</span>
      <div className="flex justify-between items-center mb-4 ">
        <span className="text-gray-600 font-medium text-sm">وضعیت دستگاه</span>
        <div className="flex items-center gap-3">
          <span className={`text-[11px] ${isActive ? 'text-green-600' : 'text-gray-400'}`}>{isActive ? 'فعال' : 'غیرفعال'}</span>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isActive ? 'left-1' : 'left-6'}`} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed text-right">
        با غیرفعال‌سازی، دستگاه در برنامه‌ زمانبندی نیز اجرا نخواهند شد.
      </p>
    </div>
  );
};

export default DeviceControlCard
