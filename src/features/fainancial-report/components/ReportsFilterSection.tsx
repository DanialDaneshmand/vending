
"use client";

import { LuSearch, LuTrash2 } from "react-icons/lu"; 
import { FaSlidersH } from "react-icons/fa"; 
import ReportsFilterContainer from "./ReportsFilterContainer";
import { Dispatch, SetStateAction, useMemo } from "react";
import { DateObject } from "react-multi-date-picker";
import UseGetAllSection from "@/shared/hooks/useGetAllSections";

// --- مقادیر اولیه برای پاک‌سازی ---
const initialFilters: FilterValues = {
  fromDate: "",
  toDate: "",
  places: "all",
  sections: "all",
  startTime: "",
  endTime: "",
  searchQuery: "",
};

interface LocationItem {
  id: string;
  name: string;
}

interface SectionItem {
  id: string;
  name: string;
}

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

interface FilterValues {
  fromDate: string;
  toDate: string;
  places: string;
  sections: string;
  startTime: DateObject | "";
  endTime: DateObject | "";
  searchQuery: string;
}

interface ReportsFilterSectionProps {
  filterValues: FilterValues;
  setFilterValues: Dispatch<SetStateAction<FilterValues>>;
  locations: LocationItem[];
}

export default function ReportsFilterSection({
  filterValues,
  setFilterValues,
  locations,
}: ReportsFilterSectionProps) {
  const { sectionsList, isGettingSectionsList } = UseGetAllSection();

  const sectionsArray = useMemo(() => {
    if (!sectionsList) return [];
    return Array.isArray(sectionsList) ? sectionsList : sectionsList.items || [];
  }, [sectionsList]);

  const optionsMap = useMemo(() => {
    return {
      places: {
        title: "مجموعه",
        options: [
          { id: "all", name: "همه مجموعه ها" },
          ...(locations?.map((loc) => ({ id: loc.id, name: loc.name })) || []),
        ],
      },
      sections: {
        title: "بخش",
        options: [
          { id: "all", name: "همه بخش ها" },
          ...(sectionsArray.map((sec: any) => ({ id: sec.id, name: sec.name })) || []),
        ],
      },
    };
  }, [locations, sectionsArray]);

  const handleInputChange = (e: ChangeHandlerEvent) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilterValues(initialFilters);
  };

  return (
    <section className=" p-4 border bg-white border-gray-100 shadow-sm rounded-lg mt-4">

      {/* دکمه پاک‌سازی در بالای کل فیلترها */}
      <div className="flex justify-start mb-4">
        <button
          onClick={handleClearFilters}
          className="flex bg-white justify-center w-[200px] items-center h-[45px] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all"
        >
          <FaSlidersH className="w-4 h-4" />
          <span>پاک‌سازی فیلترها</span>
        </button>
      </div>

      <div className="">
        <ReportsFilterContainer
          className="grid grid-cols-12 gap-x-4 gap-y-4 py-4"
          filterValues={filterValues}
          handleInputChange={handleInputChange}
          optionsMap={optionsMap}
          setFilterValues={setFilterValues}
        />
      </div>

      <div className=" grid gap-4 grid-cols-12">
        {/* Search Container */}
        <div className={` col-span-12 lg:col-span-7 flex items-center`}>
          <div className="flex flex-col w-full ">
            <label className="text-sm mb-2 mr-1">جستجو</label>

            <div className=" flex items-center sm-mb-0 w-full relative">
              <input
                value={filterValues.searchQuery}
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="searchQuery"
                type="text"
                placeholder="جستجو بر اساس کد دستگاه ..."
                className="w-full outline-0 border border-gray-100 shadow-xs h-[45px] rounded-lg p-3 placeholder:text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <LuSearch />
              </span>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="col-span-12 lg:col-span-5 flex items-end h-full justify-center ">
          <div className="flex items-center gap-x-3 w-full">
            <button
              onClick={() => console.log("Export to Excel")}
              className="flex bg-white justify-center w-full items-center h-[45px] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-green-700 hover:bg-gray-50 transition-all"
            >
              <span className="text-sm font-bold">Excel</span>
              <ExcelIcon />
            </button>

            <button
              onClick={() => console.log("Export to CSV")}
              className="flex bg-white justify-center w-full items-center h-[45px] font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-xs rounded-md text-sm text-[#334155] hover:bg-gray-50 transition-all"
            >
              <span className="text-sm font-bold">CSV</span>
              <CsvIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExcelIcon() { return <span className="text-green-600">📊</span>; }
function CsvIcon() { return <span className="text-blue-600">📄</span>; }