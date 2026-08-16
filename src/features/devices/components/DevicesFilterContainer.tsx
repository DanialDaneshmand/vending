import SelectInput from "@/components/form/SelectInput";
import { Download } from "lucide-react";
import { useState } from "react";
import { FaSlidersH } from "react-icons/fa";
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
  const [isFilter, setIsFilter] = useState(false);
  return (
    <div>
      {/* Mobile Filter Container*/}
      <div className=" mt-4 block sm:hidden">
        <button
          onClick={() => setIsFilter((prev) => !prev)}
          className="flex bg-white justify-center w-full items-center h-[45] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all"
        >
          <FaSlidersH className="w-4 h-4" />
          <span>فیلتر کردن دستگاه ها</span>
        </button>
      </div>

      <div
        className={`${className} ${isFilter ? " transition-all duration-100 h-180 border border-gray-100 shadow-sm p-4 rounded-lg" : "h-0 sm:h-auto transition-all duration-100"}  overflow-hidden`}
      >
        {/* Search Container */}
        <div
          className={` col-span-12 lg:col-span-6 order-2 lg:order-1 flex items-center`}
        >
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-sm font-bold mb-2 mr-1">
              جستجو
            </label>
            <div className=" flex  items-center  sm:mb-0 w-full">
              <input
                onChange={(e) =>
                  handleInputChange({
                    target: { name: e.target.name, value: e.target.value },
                  })
                }
                name="search"
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
        {/*Exel Btn */}
        <div className="order-1 lg:order-2 flex flex-col items-end  sm:flex-row justify-between gap-4 sm:gap-4 col-span-12 lg:col-span-6">
          <button className="flex justify-center w-full items-center h-[45] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" />
            خروجی اکسل
          </button>
          <button className=" flex shadow-xs h-[45] items-center justify-center gap-x-3 border border-gray-100 rounded-lg px-3 w-full py-3  cursor-pointer text-sm">
            <span>
              <LuFilter size={18} />
            </span>
            <span>پاکسازی فیلتر ها</span>
          </button>
        </div>
        <div className="order-3 col-span-12 grid grid-cols-10 gap-4">
          {Object.entries(optionsMap).map(([key, value]) => {
            return (
              <div
                key={key}
                className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center"
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
        </div>
      </div>
    </div>
  );
}
