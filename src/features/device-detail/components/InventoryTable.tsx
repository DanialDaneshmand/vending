
"use client";
import React, { useMemo, useState } from "react";
import { Trash2, Database } from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";
import useGetDeviceInventoryTransactions from "../hooks/useGetDeviceInventoryTransActions";
import { useParams } from "next/navigation";

const InventoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { deviceId } = useParams();

  const { 
    deviceInventoryTransactions, 
    isGettingDeviceInventoryTransactions 
  } = useGetDeviceInventoryTransactions(deviceId as string);

  const transactionsArray = useMemo(() => {
    return deviceInventoryTransactions?.items || [];
  }, [deviceInventoryTransactions]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return transactionsArray.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, transactionsArray]);

  const totalPages = Math.ceil(transactionsArray.length / pageSize);

  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-50">
        <h3 className="text-[#1e293b] font-bold text-base">تراکنش‌های موجودی دستگاه</h3>
      </div>

      <div className="overflow-x-auto">
        {isGettingDeviceInventoryTransactions ? (
          <table className="w-full text-right min-w-xl border-collapse">
            <tbody className="divide-y divide-gray-50">
              {[...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-100 rounded" /></td>
                  <td className="px-6 py-4 text-center"><div className="h-6 w-10 bg-gray-100 rounded mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><div className="h-4 w-20 bg-gray-100 rounded mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><div className="h-8 w-8 bg-gray-100 rounded-full mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : transactionsArray.length > 0 ? (
          <>
            <table className="w-full text-right min-w-xl border-collapse">
              <thead className="bg-[#F9FAFC]">
                <tr className="text-[#94a3b8] text-[13px] font-medium border-b border-gray-50">
                  <th className="px-6 py-4 font-medium text-right">تاریخ</th>
                  <th className="px-6 py-4 font-medium text-right">زمان</th>
                  <th className="px-6 py-4 font-medium text-center">تغییرات</th>
                  <th className="px-6 py-4 font-medium text-center">کاربر</th>
                  <th className="px-6 py-4 font-medium text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map((item: any, index: number) => {
                  const isPositive = item.delta >= 0;
                  const datePart = item.created_at?.split('T')[0]?.replace(/-/g, '/');
                  const timePart = item.created_at?.split('T')[1]?.substring(0, 8);

                  // حل مشکل Key: ایجاد یک رشته منحصر به فرد برای هر ردیف
                  const rowKey = item.id && typeof item.id === 'string' 
                    ? `row-${item.id}` 
                    : `row-index-${index}`;

                  return (

                    <tr key={rowKey} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-[#475569] text-sm font-medium">{datePart || "---"}</td>
                      <td className="px-6 py-4 text-[#475569] text-sm font-medium">{timePart || "---"}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-[12px] font-bold rounded-md ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                          {item.delta}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#475569] text-sm font-medium text-center">{item.username || "نامشخص"}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500" 
                          onClick={() => console.log("Deleting item ID:", item.id)}
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="bg-gray-50 p-4 rounded-full mb-3">
              <Database size={40} className="text-gray-300" />
            </div>
            <span className="text-sm font-medium">تراکنش موجودی برای این دستگاه وجود ندارد.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTable;