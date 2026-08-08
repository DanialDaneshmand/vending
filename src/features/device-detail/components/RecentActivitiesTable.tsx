import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Wallet, Gamepad2 } from "lucide-react";
import { TabsType } from "../Types";
import StyledPagination from "@/components/ui/Pagination";

interface RecentActivitiesTableProps {
  activeTab: TabsType;
  setActiveTab:Dispatch<SetStateAction<TabsType>>
}

const activities = [
  {
    id: 1,
    time: "10:12:45",
    date:"1405/12/4",
    count:5,
    userId:"13g343cdx",
    type: "پرداخت",
    category: "payment",
    detail: "نوشابه کوکاکولا",
    amount: "۱۲,۰۰۰ تومان",
    method: "کارت بانکی",
    status: "موفق",
  },
  {
    id: 2,
    time: "10:11:10",
    date:"1405/12/4",
    count:5,
    userId:"13g343cdx",
    type: "بازی",
    category: "game",
    detail: "بازی ماشین جنگی",
    amount: "۵,۰۰۰ تومان",
    method: "کیوسک نقدی",
    status: "موفق",
  },
  {
    id: 3,
    time: "10:09:32",
    date:"1405/12/4",
    count:5,
    userId:"13g343cdx",
    type: "پرداخت",
    category: "payment",
    detail: "چیپس نمکی",
    amount: "۱۰,۰۰۰ تومان",
    method: "کارت بانکی",
    status: "موفق",
  },
  {
    id: 4,
    time: "10:08:21",
    date:"1405/12/4",
    count:5,
    userId:"13g343cdx",
    type: "بازی",
    category: "game",
    detail: "بازی تیراندازی",
    amount: "۵,۰۰۰ تومان",
    method: "کیوسک نقدی",
    status: "موفق",
  },
];

const RecentActivitiesTable = ({ activeTab,setActiveTab }: RecentActivitiesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return activities.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, activities]);

  const totalPages = Math.ceil(activities.length / pageSize);
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      {/* هدر جدول */}
      <div className="flex justify-between items-center p-4 border-b border-gray-50">
        <h3 className="text-[#1e293b] font-bold text-base">
          آخرین پرداخت ها و بازی‌ها
        </h3>
        {activeTab==="overview" && (
          <button onClick={()=>{
            if(setActiveTab){
              setActiveTab("payments")
            }
          }} className="text-[#3b82f6] text-xs font-bold cursor-pointer">
            مشاهده همه
          </button>
        )}
      </div>

      {/* محتوای جدول */}
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-xl border-collapse">
          <thead className=" bg-[#F9FAFC] rounded-t-lg">
            <tr className="text-[#94a3b8] text-[13px] font-medium border-b border-gray-50">
              <th className="px-6 py-4 font-medium">تاریخ</th>
              <th className="px-6 py-4 font-medium ">زمان</th>
              <th className="px-6 py-4 font-medium text-center">مبلغ</th>
              <th className="px-6 py-4 font-medium text-center">وضعیت</th>
              <th className="px-6 py-4 font-medium text-center">تعداد بازی</th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-[#475569] text-sm font-medium ">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-[#475569] text-sm font-medium">
                  {item.time}
                </td>
                <td className="px-6 py-4 text-[#475569] text-sm font-bold text-center">
                  {item.amount}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[12px] font-bold rounded-md">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#475569] text-sm font-medium text-center">
                  {item.count}
                </td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Section */}
        { activeTab==="payments" &&<StyledPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />}
      </div>
    </div>
  );
};

export default RecentActivitiesTable;
