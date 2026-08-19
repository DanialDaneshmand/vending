"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Trash2 } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import CreateSectionModal from "./CreateSectionModal";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";
import UseGetSections from "@/shared/hooks/useGetSections";
import Skeleton from "react-loading-skeleton";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { useDeleteSection } from "../hooks/useDeleteSection";
import { useParams } from "next/navigation";

interface SectionType {
  id: string;
  name: string;
  deviceCount: number;
}

interface SectionInfoTableProps {
  setSectionId: Dispatch<SetStateAction<string | null>>;
}

export default function SectionInfoTable({
  setSectionId,
}: SectionInfoTableProps) {
  const [isCreateSection, setIsCreateSection] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const params = useParams<{ branchId: string }>();
  const locationId = params.branchId;
  const { isGettingSections, sections } = UseGetSections(locationId);
  const { deleteSection, isDeletingSection } = useDeleteSection();

  const handleDelete = (id: string | null) => {
    if (id) {
      deleteSection(id);
    }
  };

  const handleDeleteBtnClick = (id: string) => {
    setId(id);
    setIsDelete(true);
  };

  return (
    <div
      className="w-full h-full bg-white border-gray-100 shadow-sm rounded-lg p-4 "
      dir="rtl"
    >
      <div className=" flex items-center justify-between  mb-6">
        <h3 className="text-xl font-semibold text-gray-600 my-4">
          لیست بخش ها
        </h3>
        {isGettingSections ? (
          <div className="  flex flex-col sm:flex-row  items-end sm:items-center gap-2">
            <Skeleton className="h-11" width={140} borderRadius={10} />
            <Skeleton className="h-11" width={180} borderRadius={10} />
          </div>
        ) : (
          <div className="  flex flex-col sm:flex-row  items-end sm:items-center gap-2">
            <button
              onClick={() => setIsCreateSection(true)}
              className="flex text-xs sm:text-sm py-2 px-5 hover:bg-blue-700 items-center justify-center gap-x-2 rounded-lg bg-blue-600 text-white  font-medium"
            >
              <span>افزودن بخش</span>
              <span>
                <FaPlus />
              </span>
            </button>
            <Link
              href="/places"
              className="flex text-xs sm:text-sm py-2 px-5 hover:bg-blue-700 items-center justify-center gap-x-2 rounded-lg bg-blue-600 text-white  font-medium"
            >
              <span>برگشت به مجموعه ها</span>
              <span>
                <MdArrowBackIosNew />
              </span>
            </Link>
          </div>
        )}
      </div>
      {/* Create Section Modal */}
      <CreateSectionModal
        onClose={() => setIsCreateSection(false)}
        open={isCreateSection}
      />
      {/* Section Informatio Table */}
      {isGettingSections ? (
        <Skeleton className="h-60 " borderRadius={10} />
      ) : sections.items.length === 0 ? (
        <div className=" w-full  flex justify-center">
          <div className="h-32 flex border-dashed w-full justify-center items-center px-10 border rounded-lg">
            <p className=" text-gray-500">هیچ  بخشی  ثبت نشده است !</p>
          </div>
        </div>
      ) : (
        <div className=" overflow-x-auto">
          <table className="w-full  border-separate border-spacing-y-3 min-w-lg sm:min-w-md">
            <thead className="text-gray-400 text-sm font-medium">
              <tr>
                <th className="px-6 pb-2  font-normal text-center">نام بخش</th>
                <th className="px-6 pb-2 text-center font-normal">
                  تعداد دستگاه‌ها
                </th>
                <th className="px-6 pb-2 text-center font-normal">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {
                sections?.items.map((item: SectionType) => (
                  <tr
                    key={item.id}
                    className="group hover:shadow-md transition-shadow duration-200"
                  >
                    {/* نام بخش */}
                    <td className="bg-white text-center text-sm text-gray-500 font-semibold py-4 px-6 border-y border-gray-100/80">
                      {item.name}
                    </td>

                    {/* تعداد دستگاه‌ها */}
                    <td className="bg-white py-4 px-6 border-y border-gray-100/80 text-center">
                      {/* <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                  {section.deviceCount} دستگاه
                </span> */}
                      5
                    </td>

                    {/* عملیات */}
                    <td className="bg-white py-2  px-6 rounded-l-xl border-y border-l border-gray-100/80 text-center">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => setSectionId(item.id)}
                          className="text-xs h-6 border text-gray-400 border-gray-400  px-2 hover:border-blue-600 hover:text-blue-600 rounded-sm"
                        >
                          جزییات
                        </button>
                        <button
                          onClick={() => handleDeleteBtnClick(item.id)}
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
            {/* Confirm Modal */}
            <ConfirmModal
              handleConfirm={() => handleDelete(id)}
              onClose={() => setIsDelete(false)}
              open={isDelete}
              title="حذف بخش"
            />
          </table>
        </div>
      )}
    </div>
  );
}
