"use client";
import React, { useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { FaEye, FaPlus } from "react-icons/fa6";
import ConfirmModal from "@/components/shared/ConfirmModal";
import CreateBranchModal from "./CreateBranchModal";
import Link from "next/link";

const locationsData = [
  {
    id: 1,
    name: "سالن مرکزی تهران",
    city: "تهران",
    devices: 8,
    color: "text-purple-500",
  },
  {
    id: 2,
    name: "انبار غرب تهران",
    city: "تهران",
    devices: 5,
    color: "text-orange-500",
  },
  {
    id: 3,
    name: "شعبه اصفهان",
    city: "اصفهان",
    devices: 4,
    color: "text-red-500",
  },
  {
    id: 4,
    name: "کارگاه شیراز",
    city: "شیراز",
    devices: 3,
    color: "text-blue-500",
  },
  {
    id: 5,
    name: "انبار تبریز",
    city: "تبریز",
    devices: 4,
    color: "text-green-500",
  },
  {
    id: 6,
    name: "شعبه مشهد",
    city: "مشهد",
    devices: 2,
    color: "text-purple-500",
  },
  {
    id: 7,
    name: "دفتر کرج",
    city: "کرج",
    devices: 3,
    color: "text-orange-500",
  },
  {
    id: 8,
    name: "انبار اهواز",
    city: "اهواز",
    devices: 1,
    color: "text-green-500",
  },
];

export default function LocationManagement() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [isCreate,setIsCreate]=useState(false)

  return (
    <div className="p-4 border border-gray-100 rounded-lg shadow-sm">
      {/* هدر */}
      <div className="flex  items-center mb-4">
        <button onClick={()=>setIsCreate(true)} className="flex cursor-pointer items-center gap-2 bg-[#1D4ED8] text-white px-4 py-2.5 rounded-md  transition-all  font-medium text-sm">
          <span className="text-xs sm:text-sm">ثبت مکان جدید</span>
          <div className=" text-xs sm:text-sm">
            <FaPlus />
          </div>
        </button>
        {/* Create Place */}
        <CreateBranchModal onClose={()=>(setIsCreate(false))} open={isCreate}/>
      </div>

      {/* بخش جدول */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-lg">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500">نام مکان</th>
              <th className="p-4 text-xs font-bold text-gray-500">شهر</th>
              <th className="p-4 text-xs font-bold text-gray-500 text-center">
                تعداد دستگاه
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 text-center">
                تعداد بخش
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 text-center">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {locationsData.map((loc) => (
              <tr
                key={loc.id}
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${loc.color}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {loc.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{loc.city}</td>
                <td className="p-4 text-sm text-gray-600 text-center font-semibold">
                  {loc.devices}
                </td>
                <td className="p-4  text-sm text-gray-600 text-center font-semibold">
                  {loc.devices}
                </td>
                <td className=" flex items-center  py-4 gap-x-2 justify-center text-center">
                  <Link href={`/places/${loc.id}`}>
                    <FaEye className=" text-blue-600"/>
                  </Link>
                  <button
                    onClick={() => setId(loc.id)}
                    className="p-2  cursor-pointer text-red-500  rounded-lg transition-all"
                    title="حذف مکان"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Confirm Modal */}
        <ConfirmModal
          onClose={() => setId(undefined)}
          open={Boolean(id)}
          title=" حذف مکان"
          id={id}
        />
      </div>
    </div>
  );
}
