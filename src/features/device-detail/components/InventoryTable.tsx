
import React, {  useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";

interface InventoryTableTableProps {

}


const activities = [
  {
    id: 1,
    time: "10:12:45",
    date: "1405/12/4",
    count: 5, // مثبت -> سبز
    userId: "13g343cdx",
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
    date: "1405/12/4",
    count: -2, // منفی -> قرمز
    userId: "13g343cdx",
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
    date: "1405/12/4",
    count: 10, // مثبت -> سبز
    userId: "13g343cdx",
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
    date: "1405/12/4",
    count: -5, // منفی -> قرمز
    userId: "13g343cdx",
    type: "بازی",
    category: "game",
    detail: "بازی تیراندازی",
    amount: "۵,۰۰۰ تومان",
    method: "کیوسک نقدی",
    status: "موفق",
  },
];

const InventoryTable = ({ }: InventoryTableTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return activities.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(activities.length / pageSize);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      {/* هدر جدول */}
      <div className="flex justify-between items-center p-4 border-b border-gray-50">
        <h3 className="text-[#1e293b] font-bold text-base">
          تراکنش های دستگاه
        </h3>
      </div>

      {/* محتوای جدول */}
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-xl border-collapse">
          <thead className="bg-[#F9FAFC] rounded-t-lg">
            <tr className="text-[#94a3b8] text-[13px] font-medium border-b border-gray-50">
              <th className="px-6 py-4 font-medium">تاریخ</th>
              <th className="px-6 py-4 font-medium">زمان</th>
              <th className="px-6 py-4 font-medium text-center">تعداد </th>
              <th className="px-6 py-4 font-medium text-center">کاربر </th>
              <th className="px-6 py-4 font-medium text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedData.map((item) => {
              const isPositive = item.count >= 0;
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">

                  <td className="px-6 py-4 text-[#475569] text-sm font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-[#475569] text-sm font-medium">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-[12px] font-bold rounded-md ${
                      isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>
                      {item.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#475569] text-sm font-medium text-center">
                    {item.userId}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500"
                      onClick={() => console.log("Delete item:", item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4">
          <StyledPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;