import DateRangePicker from "@/components/form/DateRangePicker";
import SelectInput from "@/components/form/SelectInput";
import ElegantTimePicker from "@/components/form/TimeRangeFilter";
import { Dispatch, SetStateAction } from "react";
import { DateObject } from "react-multi-date-picker";

// ۱. ابتدا یک اینترفیس برای آیتم‌های هر آپشن تعریف می‌کنیم
interface OptionItem {
  id: string;
  name: string;
}

// ۲. تایپ OptionsMap را اصلاح می‌کنیم تا آرایه‌ای از آبجکت‌ها را بپذیرد
interface OptionsMap {
  [key: string]: {
    title: string;
    options: OptionItem[]; // از string[] به OptionItem[] تغییر کرد
  };
}

interface TimeFilterState {
  startTime: DateObject | "";
  endTime: DateObject | "";
  [key: string]: any;
}

interface DateFilterBase {
  fromDate?: string;
  toDate?: string;
}

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

interface ReportsFilterContainerProps<T extends TimeFilterState> {
  filterValues: T;
  className: string;
  optionsMap: OptionsMap;
  handleInputChange: (e: ChangeHandlerEvent) => void;
  setFilterValues: Dispatch<SetStateAction<T>>;
}

export default function ReportsFilterContainer<
  T extends DateFilterBase & TimeFilterState,
>({
  filterValues,
  className,
  handleInputChange,
  optionsMap,
  setFilterValues,
}: ReportsFilterContainerProps<T>) {
  return (
    <div className={`${className}`}>
      <div className="col-span-12 sm:col-span-6 xl:col-span-4 ">
        <DateRangePicker
          // پاس دادن مقادیر تاریخ از استیت اصلی به کامپوننت
          value={
            filterValues.fromDate
              ? [filterValues.fromDate, filterValues.toDate]
              : []
          }
          setFilterValues={setFilterValues}
        />
      </div>
      <div className="col-span-12 sm:col-span-6 xl:col-span-4 flex justify-center">
        <ElegantTimePicker
          setFilterValues={setFilterValues}
          filterValues={filterValues}
        />
      </div>

      {Object.entries(optionsMap).map(([key, value]) => {
        return (
          <div key={key} className="col-span-12 sm:col-span-6 xl:col-span-2">
            <SelectInput
              name={key}
              title={value.title}
              // حالا value.options شامل آرایه‌ای از {id, name} است
              options={value.options}
              filterValues={filterValues as any}
              handleChange={handleInputChange}
            />
          </div>
        );
      })}
    </div>
  );
}
