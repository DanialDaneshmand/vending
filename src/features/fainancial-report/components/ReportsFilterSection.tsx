"use client";

import { LuSearch } from "react-icons/lu";
import ReportsFilterContainer from "./ReportsFilterContainer";
import { Dispatch, SetStateAction, useState } from "react";
import { DateObject } from "react-multi-date-picker";

const optionsMap = {
  places: { title: "مجموعه", options: ["همه مجموعه ها", "مکان 1", "مکان 2"] },
  sections: { title: "بخش", options: ["همه بخش ها", "بخش 1", "بخش 2"] },
};

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
  searchQuery:string
}

interface ReportsFilterSectionProps{
filterValues:FilterValues;
setFilterValues:Dispatch<SetStateAction<FilterValues>>
}

export default function ReportsFilterSection({filterValues,setFilterValues}:ReportsFilterSectionProps) {
  


  const handleInputChange = (e: ChangeHandlerEvent) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className=" p-4 border bg-white border-gray-100 shadow-sm rounded-lg mt-4">
      {/* Tabs */}

      <div className="">
        <ReportsFilterContainer
          className="grid grid-cols-12 gap-x-4 gap-y-4  py-4"
          filterValues={filterValues}
          handleInputChange={handleInputChange}
          optionsMap={optionsMap}
          setFilterValues={setFilterValues}
        />
      </div>
      <div className=" grid gap-4 grid-cols-12">
        {/* Search Container */}
        <div className={` col-span-12 lg:col-span-8  flex items-center`}>
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-sm  mb-2 mr-1">
              جستجو
            </label>
            <div className=" flex  items-center  sm:mb-0 w-full">
              <input
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="searchQuery"
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
        {/* Exel and CSV */}
        <div className="col-span-12 lg:col-span-4 flex items-end h-full justify-center ">
          <div className="flex items-center gap-x-4  w-full">
            <button
              onClick={() => console.log("Export to Excel")}
              className="flex items-center gap-2 px-3 py-2.5 w-full justify-center border border-gray-100 text-green-700 rounded-lg bg-white  shadow-xs cursor-pointer "
            >
              <span className="text-sm font-bold ">Excel</span>
              <ExcelIcon />
            </button>

            <button
              onClick={() => console.log("Export to CSV")}
              className="flex items-center gap-2 px-3 py-2.5 w-full justify-center border border-gray-100 rounded-lg bg-white  shadow-xs cursor-pointer "
            >
              <span className="text-sm font-bold text-[#334155]">CSV</span>
              <CsvIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const CsvIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 select-none"
  >
    {/* بدنه سند */}
    <path
      d="M13.5 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V9.5L13.5 3Z"
      fill="#E6F4EA"
      stroke="#137333"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* گوشه تا شده */}
    <path
      d="M13.5 3V9.5H20"
      stroke="#137333"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* باکس متن CSV */}
    <rect x="6" y="12" width="12" height="6" rx="1" fill="#137333" />
    <text
      x="12"
      y="16.5"
      fill="#FFFFFF"
      fontSize="5"
      fontWeight="bold"
      textAnchor="middle"
      fontFamily="sans-serif"
    >
      CSV
    </text>
  </svg>
);

const ExcelIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 select-none"
  >
    {/* بدنه سند */}
    <path
      d="M13.5 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V9.5L13.5 3Z"
      fill="#107C41"
    />
    {/* گوشه تا شده با رنگ تیره تر */}
    <path d="M13.5 3V9.5H20L13.5 3Z" fill="#0A5C30" />
    {/* علامت X */}
    <path
      d="M9 12L11 15L9 18H10.5L11.75 16.125L13 18H14.5L12.5 15L14.5 12H13L11.75 13.875L10.5 12H9Z"
      fill="white"
    />
  </svg>
);
