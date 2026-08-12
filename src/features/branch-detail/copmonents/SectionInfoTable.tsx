"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Trash2, LayoutGrid } from "lucide-react";
import { FaEye, FaPlus } from "react-icons/fa6";
import CreateSectionModal from "./CreateSectionModal";

interface SectionType {
  id: string;
  name: string;
  deviceCount: number;
}

interface SectionInfoTableProps{
  section:SectionType|null;
  setSection:Dispatch<SetStateAction<SectionType|null>>
}

// دیتای استاتیک برای بخش‌ها
const initialSections = [
  {
    id: "SEC-001",
    name: "لابی اصلی",
    deviceCount: 12,
  },
  {
    id: "SEC-002",
    name: "طبقه اول - بال شرقی",
    deviceCount: 8,
  },
  {
    id: "SEC-003",
    name: "طبقه دوم - سالن انتظار",
    deviceCount: 15,
  },
  {
    id: "SEC-004",
    name: "طبقه سوم - بخش اداری",
    deviceCount: 5,
  },
  {
    id: "SEC-005",
    name: "پارکینگ - ورودی A",
    deviceCount: 3,
  },
];

export default function SectionInfoTable({section,setSection}:SectionInfoTableProps) {
  const [sections, setSections] = useState(initialSections);
  const [isCreateSection, setIsCreateSection] = useState(false);

  const handleDelete = (id: string) => {
    if (
      confirm("آیا از حذف این بخش و تمام دستگاه‌های متصل به آن اطمینان دارید؟")
    ) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  return (
    <div
      className="w-full h-full bg-white border-gray-100 shadow-sm rounded-lg p-4 overflow-x-auto"
      dir="rtl"
    >
      <div className=" flex items-center justify-between ">
        <h3 className="text-xl font-semibold text-gray-600 my-4">
          لیست بخش ها
        </h3>
        <button
          onClick={() => setIsCreateSection(true)}
          className="flex py-2 px-5 hover:bg-blue-700 items-center justify-center gap-x-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
        >
          <span>افزودن بخش</span>
          <span>
            <FaPlus />
          </span>
        </button>
      </div>
      {/* Create Section Modal */}
      <CreateSectionModal
        onClose={() => setIsCreateSection(false)}
        open={isCreateSection}
      />
      {/* Section Informatio Table */}
      <table className="w-full border-separate border-spacing-y-3 min-w-md">
        <thead className="text-gray-400 text-sm font-medium">
          <tr>
            <th className="px-6 pb-2 text-right font-normal">شناسه بخش</th>
            <th className="px-6 pb-2  font-normal text-center">نام بخش</th>
            <th className="px-6 pb-2 text-center font-normal">
              تعداد دستگاه‌ها
            </th>
            <th className="px-6 pb-2 text-center font-normal">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <tr
              key={section.id}
              className="group hover:shadow-md transition-shadow duration-200"
            >
              {/* شناسه‌ی بخش */}
              <td className="bg-white py-4 px-6 rounded-r-xl border-y border-r border-gray-100/80 text-gray-500 text-sm font-bold tracking-wide">
                {section.id}
              </td>

              {/* نام بخش */}
              <td className="bg-white text-center text-sm text-gray-500 font-semibold py-4 px-6 border-y border-gray-100/80">
                {section.name}
              </td>

              {/* تعداد دستگاه‌ها */}
              <td className="bg-white py-4 px-6 border-y border-gray-100/80 text-center">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                  {section.deviceCount} دستگاه
                </span>
              </td>

              {/* عملیات */}
              <td className="bg-white py-2  px-6 rounded-l-xl border-y border-l border-gray-100/80 text-center">
                <div className="flex justify-center items-center">
                  <button onClick={()=>setSection(section)} className="text-xs h-6 border text-gray-400 border-gray-400  px-2 hover:border-blue-600 hover:text-blue-600 rounded-sm">
                     جزییات
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="p-2 text-gray-400 hover:text-red-500  rounded-lg transition-all "
                    title="حذف دستگاه"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
