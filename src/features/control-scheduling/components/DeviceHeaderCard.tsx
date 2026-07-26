import React from "react";
import { Info } from "lucide-react";

export default function DeviceHeaderCard() {
  return (
    <div className="w-full " dir="rtl">
      <div className="  bg-white rounded-lg border border-grey-100 mt-4 p-5 shadow-sm flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-4">
        <div className="flex gap-x-4 justify-between  ">
          {/* تصویر دستگاه وندینگ */}
          <div className="w-[78] h-[106]  bg-[#F3F4F6] rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
            {/* تصویر فرضی دستگاه - می‌توانید با آدرس تصویر خود جایگزین کنید */}
            <img
              src="/devices/device1.png"
              alt="Vending Machine"
              className="w-full h-full object-cover"
            />
          </div>
          {/* بخش راست: تصویر و اطلاعات اصلی دستگاه */}
          <div className="flex items-center gap-5  justify-between lg:justify-start">
            {/* اطلاعات متنی و وضعیت‌ها */}
            <div className="flex-1 text-right">
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
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  آنلاین
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium text-[#10B981] bg-[#E9F3E8] border border-[#D1FAE5]">
                  فعال
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* بخش وسط: پارامترها و مشخصات فنی (ریسپانسیو در قالب گرید/ردیف) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center gap-4 lg:gap-8 px-2 lg:px-6 my-4 lg:my-0 border-y lg:border-y-0 lg:border-x border-[#E5E7EB] py-4 lg:py-0">
          {/* وضعیت فعلی */}
          <div className="flex flex-col items-center  justify-center  lg:text-right px-2">
            <span className="text-xs text-gray-500 font-bold mb-1.5">
              وضعیت فعلی
            </span>
            <span className="text-[13px] font-bold text-[#10B981]">فعال</span>
          </div>

          {/* دمای داخلی */}
          <div className="flex flex-col items-center  justify-center text-center lg:text-right px-2 lg:border-r border-[#E5E7EB] lg:pr-8">
            <span className="text-xs text-gray-500 font-bold mb-1.5">
              دمای داخلی
            </span>
            <span className="text-[13px] font-bold text-[#1F2937]" dir="ltr">
              ۴.۸ °C
            </span>
          </div>

          {/* ولتاژ ورودی */}
          <div className="flex flex-col items-center justify-center text-center lg:text-right px-2 lg:border-r border-[#E5E7EB] lg:pr-8">
            <span className="text-xs text-gray-500 font-bold mb-1.5">
              ولتاژ ورودی
            </span>
            <span className="text-[13px] font-bold text-[#1F2937]" dir="ltr">
              ۲۲۵ V
            </span>
          </div>

          {/* نسخه دستگاه */}
          <div className="flex flex-col items-center  justify-center text-center lg:text-right px-2 lg:border-r border-[#E5E7EB] lg:pr-8">
            <span className="text-xs text-gray-500 font-bold mb-1.5">
              نسخه دستگاه
            </span>
            <span className="text-[13px] font-bold text-[#1F2937] font-mono">
              v2.1.8
            </span>
          </div>
        </div>

        {/* بخش چپ: دکمه عملیات */}
        <div className="flex items-center justify-center lg:justify-end lg:pl-2">
          <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-[#D1D5DB] rounded-lg text-xs text-gray-600 font-bold cursor-pointer  hover:bg-[#F0FDF4] hover:border-[#1D4ED8] transition-all">
            <Info className="w-4 h-4 text-[#1D4ED8]" />
            جزئیات دستگاه
          </button>
        </div>
      </div>
    </div>
  );
}
