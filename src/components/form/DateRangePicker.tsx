
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { IoCalendarClearOutline } from "react-icons/io5";

interface DateFilterBase {
  fromDate?: string;
  toDate?: string;
}

interface Props<T extends DateFilterBase> {
  value?: any[];
  setFilterValues: Dispatch<SetStateAction<T>>;
}

export default function DateRangePicker<T extends DateFilterBase>({
  value = [],
  setFilterValues,
}: Props<T>) {
  // مقدار اولیه را فقط از value می‌گیریم، اگر نبود آرایه خالی است (بدون تاریخ پیش‌فرض)
  const [dates, setDates] = useState(value && value.length > 0 ? value : []);

  return (
    <div className="w-full ">
      <DatePicker
        range
        onChange={(newDates: any) => {
          setDates(newDates);

          // فقط اگر بازه کامل انتخاب شده باشد (دو تاریخ)، فیلترها را آپدیت کن
          if (newDates && newDates.length === 2) {
            setFilterValues(
              (prev) =>
                ({
                  ...prev,
                  fromDate: newDates[0].format("YYYY/MM/DD"),
                  toDate: newDates[1].format("YYYY/MM/DD"),
                }) as T,
            );
          } else {
            // اگر کاربر تاریخ‌ها را پاک کرد، فیلترها را هم خالی کن
            setFilterValues(
              (prev) =>
                ({
                  ...prev,
                  fromDate: "",
                  toDate: "",
                }) as T,
            );
          }
        }}
        containerClassName="w-full"

        className="w-full"
        calendar={persian}
        locale={persianFa}
        calendarPosition="bottom-right"
        dateSeparator=" - "
        render={(val, openCalendar) => {
          return (
            <div
              className=" w-full  group"
              dir="rtl"
              onClick={openCalendar}
            >
              <label className=" bg-white  text-sm font-medium text-gray-800 transition-all mb-2 block">
                بازه زمانی
              </label>

              <div className="flex items-center gap-x-2 justify-between w-full px-4 py-3 bg-white border border-gray-100 rounded-lg shadow-xs cursor-pointer  transition-all">
                <span className="text-sm font-medium text-[#1E293B] flex-1 text-center">
                  {/* نمایش مقدار انتخاب شده یا متن پیش‌فرض */}
                  {val || "انتخاب بازه زمانی"}
                </span>
                <span>
                  <IoCalendarClearOutline className=" text-gray-500 text-lg" />
                </span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}