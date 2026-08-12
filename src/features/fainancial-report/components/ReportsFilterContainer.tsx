import DateRangePicker from "@/components/form/DateRangePicker";
import SelectInput from "@/components/form/SelectInput";
import ElegantTimePicker from "@/components/form/TimeRangeFilter";
import TimeRangePicker from "@/components/form/TimeRangeFilter";
import { Dispatch, SetStateAction } from "react";
import { DateObject } from "react-multi-date-picker";

interface OptionsMap {
  [key: string]: {
    title: string;
    options: string[];
  };
}

interface TimeFilterState {
  startTime: DateObject | "";
  endTime: DateObject | "";
  [key: string]: any; // در صورت وجود فیلدهای دیگر در آبجکت شما
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
        <DateRangePicker setFilterValues={setFilterValues} />
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
