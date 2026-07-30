import React from "react";
import { Info } from "lucide-react"; // نصب کتابخانه: npm install lucide-react

const SettingsAlert = () => {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-lg p-4 my-4 shadow-sm">
      <div className="">
        <div className="text-blue-600">
          <Info size={24} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[#1e293b] font-bold text-sm md:text-base leading-relaxed">
          تنظیمات به‌صورت جداگانه برای هر دستگاه اعمال می‌شود.
        </h3>

        <p className="text-[#64748b] text-xs md:text-sm leading-relaxed">
          لطفاً مطمئن شوید با دقت وارد کنید. تنظیمات نادرست ممکن است باعث اختلال
          در عملکرد دستگاه شود.
        </p>
      </div>
    </div>
  );
};

export default SettingsAlert;
