import SelectInput from "@/components/form/SelectInput";
import { Download } from "lucide-react";
import { LuFilter, LuSearch } from "react-icons/lu";

interface OptionsMap {
  [key: string]: {
    title: string;
    options: string[];
  };
}

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

interface FilterContainerProps<T> {
  filterValues: T;
  className: string;
  optionsMap: OptionsMap;
  handleInputChange: (e: ChangeHandlerEvent) => void;
}

export default function DevicesFilterContainer<T>({
  className,
  optionsMap,
  filterValues,
  handleInputChange,
}: FilterContainerProps<T>) {
  return (
    <div className={`${className}`}>
      <div className=" col-span-12 sm:col-span-6 lg:col-span-3 flex items-center">
        <div className="flex flex-col w-full">
          <label htmlFor="" className="text-sm font-bold mb-2 mr-1">
            جستجو
          </label>
          <div className=" flex  items-center  sm:mb-0 w-full">
            <input
              type="text"
              placeholder="جستجو بر اساس کد دستگاه ..."
              className="w-full outline-0 border border-gray-100 shadow-xs h-[45] rounded-lg p-3 placeholder:text-sm"
            />
            <span className="-mr-8">
              <LuSearch />
            </span>
          </div>
        </div>
      </div>

      {Object.entries(optionsMap).map(([key, value]) => {
        return (
          <div
            key={key}
            className="col-span-12 sm:col-span-6 lg:col-span-2 flex items-center"
          >
            <div className="w-full">
              <SelectInput
                name={key}
                title={value.title}
                options={value.options}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>
        );
      })}

      <div className=" flex flex-col xl:flex-col sm:flex-row justify-between gap-6 sm:gap-4 col-span-12 lg:col-span-11  xl:col-span-2">
        <button className="flex justify-center w-full items-center h-[45] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all">
          <Download className="w-4 h-4" />
          خروجی اکسل
        </button>
        <button className=" flex shadow-xs items-center justify-center gap-x-3 border border-gray-100 rounded-lg px-3 w-full py-3  cursor-pointer text-sm">
          <span>
            <LuFilter size={18} />
          </span>
          <span>پاکسازی فیلتر ها</span>
        </button>
      </div>
    </div>
  );
}
