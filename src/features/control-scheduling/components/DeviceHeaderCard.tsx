import React from "react";
import { Info } from "lucide-react";

export default function DeviceHeaderCard() {
  return (
    <div className="w-full h-full" dir="rtl">
      <div className="  bg-white rounded-lg h-full border border-gray-100  p-5 shadow-sm flex flex-col sm:flex-row items-stretch  gap-6 lg:gap-4">
        <div className="flex flex-col sm:flex-row gap-x-4   ">
          {/* تصویر دستگاه وندینگ */}
          <div className="  bg-[#F3F4F6] rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
            {/* تصویر فرضی دستگاه - می‌توانید با آدرس تصویر خود جایگزین کنید */}
            <img
              src="/devices/device1.png"
              alt="Vending Machine"
              className="w-full h-full object-cover "
            />
          </div>
          {/* بخش راست: تصویر و اطلاعات اصلی دستگاه */}
          <div className="flex flex-col sm:flex-row mt-8 sm:mt-0 items-center gap-5  justify-between lg:justify-start">
            {/* اطلاعات متنی و وضعیت‌ها */}
            <div className="flex-1 text-center sm:text-right">
              <h2 className="text-[17px] font-bold text-[#0F172A] mb-1">
                دستگاه VM-102
              </h2>
              <div className="text-xs font-bold text-gray-500 space-y-1 mb-3">
                <p>
                  <span className="">مکان:</span> مجتمع تجاری کوروش - طبقه همکف
                </p>
                <p>
                  <span className="text-gray-500">اخرین انلاین :</span>
                  <span className="text-[#9CA3AF]"> امروز 10:25</span>
                </p>
              </div>

              {/* بچ‌های وضعیت */}
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  آنلاین
                </span>
                {/* <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-[#10B981] bg-[#E9F3E8] border border-[#D1FAE5]">
                  فعال
                </span> */}
              </div>
            </div>
            <div className=" flex items-center px-2">
              {/* وضعیت فعلی */}
              <div className="flex flex-col items-center  justify-center   lg:text-right px-2">
                <span className="text-xs text-gray-500 font-bold mb-1.5">
                  وضعیت فعلی
                </span>
                <span className="text-[13px] font-bold text-[#10B981]">
                  فعال
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
