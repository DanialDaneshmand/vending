"use client";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// لود کردن کامپوننت نقشه به صورت داینامیک و غیرفعال کردن SSR
const StoreMap = dynamic(() => import("@/components/map/MapStore"), {
  ssr: false,

  loading: () => (
    <div className="h-[500] w-full bg-gray-100 animate-pulse rounded-lg" />
  ),
});

export default function MapComponent() {
  return (
    <div className=" rounded-lg border  border-gray-100 shadow-xs">
      <div className=" flex items-center justify-between p-4">
        <span className="font-bold">مکان ها و محدودیت ها</span>
        <Link
          href="#"
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <span>مشاهده همه</span>
          <ChevronLeft size={14} />
        </Link>
      </div>
      <StoreMap />
      <div className="grid grid-cols-3 py-4">
        <div className="border-l border-gray-200">
          <div className=" flex flex-col items-center justify-center gap-y-2">
            <span className="text-xs font-bold">مکان ها</span>
            <span className="font-bold">{toPersianNumbers(9)}</span>
          </div>
        </div>
        <div className="border-l border-gray-200 ">
          <div className=" flex flex-col items-center justify-center gap-y-2">
            <span className="text-xs font-bold">محدوده های جغرافیای</span>
            <span className="font-bold">{toPersianNumbers(9)}</span>
          </div>
        </div>
        <div className="">
          <div className=" flex flex-col items-center justify-center gap-y-2">
            <span className="text-xs font-bold">خارج از محدوده</span>
            <span className="font-bold text-[#F3060B]">{toPersianNumbers(9)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
