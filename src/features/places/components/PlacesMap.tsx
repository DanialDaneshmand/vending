
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

export default function PlacesMap(){
    return <div className=" rounded-lg border  border-gray-100 shadow-sm">
      <div className=" flex items-center justify-between p-4">
        <span className="font-bold"> نقشه مکان ها </span>
        
      </div>
      <div className="p-4 rounded-lg overflow-hidden">
        <StoreMap />
      </div>
      
    </div>
}