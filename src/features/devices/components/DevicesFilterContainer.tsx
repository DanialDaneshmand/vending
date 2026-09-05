
import React, { useState } from "react";
import SelectInput from "@/components/form/SelectInput";
import UseGetAllSection from "@/shared/hooks/useGetAllSections";
import UseGetLocations from "@/shared/hooks/useGetLocations";
import { Download } from "lucide-react";
import { FaSlidersH } from "react-icons/fa";
import { LuFilter, LuSearch } from "react-icons/lu";

interface FilterContainerProps<T> {
  filterValues: T;
  className: string;
  handleInputChange: (e: any) => void;
  onReset: () => void;
}

export default function DevicesFilterContainer<T>({
  className,
  filterValues,
  handleInputChange,
  onReset,
}: FilterContainerProps<T>) {
  const [isFilter, setIsFilter] = useState(false);
  const { locations } = UseGetLocations();
  const { sectionsList } = UseGetAllSection();

  return (
    <div className="w-full">
      {/* Mobile Filter Container*/}
      <div className="mt-4 block sm:hidden">
        <button
          onClick={() => setIsFilter((prev) => !prev)}
          className="flex bg-white justify-center w-full items-center h-[45px] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all"
        >
          <FaSlidersH className="w-4 h-4" />
          <span>فیلتر کردن دستگاه ها</span>
        </button>
      </div>

      <div
        className={`${className} ${
          isFilter 
            ? "transition-all duration-100 h-auto border border-gray-100 shadow-sm p-4 rounded-lg" 
            : "h-0 sm:h-auto transition-all duration-100"
        } overflow-hidden sm:overflow-visible`}
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

        <div className="order-3 col-span-12 grid grid-cols-10 gap-4 mt-4">
          {/* مجموعه ها */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center">
            <div className="w-full">
              <SelectInput
                name="places"
                title="مجموعه ها"
                options={[
                  { id: "all", title: "همه مجموعه ها" },
                  ...(locations?.items?.map((item: any) => ({ id: item.id, name: item.name })) || [])
                ]}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>

          {/* بخش ها */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center">
            <div className="w-full">
              <SelectInput
                name="sections"
                title="بخش ها"
                options={[
                  { id: "all", title: "همه بخش ها" },
                  ...(sectionsList?.items?.map((item: any) => ({ id: item.id, name: item.name })) || [])
                ]}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>

          {/* وضعیت دستگاه */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center">
            <div className="w-full">
              <SelectInput
                name="status"
                title="وضعیت دستگاه"
                options={[
                  { id: "all_status", name: "همه وضعیت ها" },
                  { id: "pending", name: "در انتظار بررسی" },
                  { id: "online", name: "آنلاین" },
                  { id: "offline", name: "آفلاین" },
                  { id: "disabled", name: "مسدود شده" },
                  { id: "maintenance", name: "در حال تعمیر" },
                ]}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>

          {/* وضعیت اتصال */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center">
            <div className="w-full">
              <SelectInput
                name="alertType"
                title="وضعیت اتصال"
                options={[
                  { id: "all_power", name: "همه وضعیت ها" },
                  { id: "true", name: "روشن" },
                  { id: "false", name: "خاموش" },
                ]}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>

          {/* وضعیت موجودی */}
          <div className="col-span-12 sm:col-span-5 lg:col-span-2 flex items-center">
            <div className="w-full">
              <SelectInput
                name="inventory"
                title="وضعیت موجودی"
                options={[
                  { id: "all_inventory", name: "همه وضعیت ها" },
                  { id: "ok", name: "مناسب" },
                  { id: "low", name: "کم" },
                ]}
                filterValues={filterValues as any}
                handleChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}