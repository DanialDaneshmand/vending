import DateRangePicker from "@/components/form/DateRangePicker";
import SelectInput from "@/components/form/SelectInput";
import { Dispatch, SetStateAction } from "react";

interface OptionsMap {
  [key: string]: {
    title: string;
    options: string[];
  };
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

interface ReportsFilterContainerProps<T> {
  filterValues: T;
  className: string;
  optionsMap: OptionsMap;
  handleInputChange: (e: ChangeHandlerEvent) => void;
  setFilterValues: Dispatch<SetStateAction<T>>;
}

export default function ReportsFilterContainer<T extends DateFilterBase>({
  filterValues,
  className,
  handleInputChange,
  optionsMap,
  setFilterValues,
}: ReportsFilterContainerProps<T>) {
  return (
    <div className={`${className}`}>
      <div className="col-span-12 sm:col-span-6 xl:col-span-3">
        <DateRangePicker setFilterValues={setFilterValues} />
      </div>
      {Object.entries(optionsMap).map(([key, value]) => {
        return (
          <div key={key} className="col-span-12 sm:col-span-6 xl:col-span-2" >
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




      
 