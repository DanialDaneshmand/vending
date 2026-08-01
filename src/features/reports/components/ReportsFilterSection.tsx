"use client";

import ReportsFilterContainer from "./ReportsFilterContainer";
import SegmentedTabs from "./SegmentTabs";
import { useState } from "react";

const optionsMap = {
  places: { title: "مکان", options: ["همه وضعیت ها", "فعال", "غیر فعال"] },
  device: { title: "نوع هشدار", options: ["شهر ها", "تهران", "مشهد"] },
  status: { title: "وضعیت", options: ["شهر ها", "تهران", "مشهد"] },
};

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

export default function ReportsFilterSection() {
  const [filterValues, setFilterValues] = useState({
    fromDate: "",
    toDate: "",
    places: "همه وضعیت ها",
    device: "شهر ها",
    status: "شهر ها",
  });

  console.log(filterValues);
  

  const handleInputChange = (e: ChangeHandlerEvent) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className=" p-4 border bg-white border-gray-100 shadow-sm rounded-lg mt-4">
      {/* Tabs */}
      {/* <div>
        <SegmentedTabs />
      </div> */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-9 ">
          <ReportsFilterContainer
            className="grid grid-cols-12 xl:grid-cols-9 gap-x-4 gap-y-4  py-4"
            filterValues={filterValues}
            handleInputChange={handleInputChange}
            optionsMap={optionsMap}
            setFilterValues={setFilterValues}
          />
        </div>
        <div className="col-span-12 xl:col-span-3">
          <div className="flex items-center gap-x-2 h-full justify-center">
            <button
              onClick={() => console.log("Export to Excel")}
              className="flex items-center gap-2 px-3 py-1.5 w-24 justify-center border border-gray-200 text-green-700 rounded-lg bg-white  shadow-xs cursor-pointer "
            >
              <span className="text-sm font-bold ">Excel</span>
              <ExcelIcon />
            </button>

            <button
              onClick={() => console.log("Export to CSV")}
              className="flex items-center gap-2 px-3 py-1.5 w-24 justify-center border border-gray-200 rounded-lg bg-white  shadow-xs cursor-pointer "
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
