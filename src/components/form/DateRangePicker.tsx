"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object"; // اضافه شد برای مدیریت تاریخ‌ها
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
  // مقدار اولیه استیت داخلی را بر اساس value دریافتی یا بازه امروز-فردا ست می‌کنیم
  const [dates, setDates] = useState(
    value.length > 0
      ? value
      : [
          new DateObject(
            new Date(new Date().setDate(new Date().getDate() + 1)),
          ),
          new DateObject(),
          // روش دستی: تبدیل به تاریخ JS، اضافه کردن یک روز، و تبدیل مجدد به DateObject
        ],
  );
  // یک useEffect می‌گذاریم که اگر در ابتدا مقداری نبود، استیت پدر هم آپدیت شود
  useEffect(() => {
    if (dates.length === 2) {
      setFilterValues(
        (prev) =>
          ({
            ...prev,
            fromDate: dates[0].format("YYYY/MM/DD"),
            toDate: dates[1].format("YYYY/MM/DD"),
          }) as T,
      );
    }
  }, []);

  return (
    <div className="w-full ">
      <DatePicker
        range
        value={dates}
        onChange={(dates: any) => {
          setDates(dates);
          if (dates.length !== 2) return;

          setFilterValues(
            (prev) =>
              ({
                ...prev,
                fromDate: dates[0].format("YYYY/MM/DD"),
                toDate: dates[1].format("YYYY/MM/DD"),
              }) as T,
          );
        }}
        containerClassName="w-full"
        className="w-full"
        calendar={persian}
        locale={persianFa}
        calendarPosition="bottom-right"
        dateSeparator=" - "
        render={(value, openCalendar) => {
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
                  {value || "انتخاب بازه زمانی"}
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
