
import React, { useMemo, useState } from "react";
import {
  Download,
  AlertTriangle,
  Thermometer,
  WifiOff,
  CreditCard,
  Info,
  Check,
} from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";
import { useResolveAlert } from "@/shared/hooks/useResolveAlert"; // فرض بر این است که مسیر درست است
import toast from "react-hot-toast";

interface AlertItem {
  id: string;
  type: string;
  device_code: string;
  location?: string;
  resolved: boolean;
  acknowledged: boolean;
  severity: string;
  message: string;
  created_at: string;
}

interface AlertListProps {
  data: AlertItem[];
  isLoading?: boolean;
}

export default function AlertList({ data = [], isLoading }: AlertListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // استفاده از هوک Resolve
  const { isResolvingAlert, resolveAlert } = useResolveAlert();

  const getSeverityDetails = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical": return { text: "بحرانی", color: "bg-[#E11D48]" };
      case "warning": return { text: "بالا", color: "bg-[#F59E0B]" };
      case "info": return { text: "متوسط", color: "bg-[#FACC15]" };
      default: return { text: "معمولی", color: "bg-gray-400" };
    }
  };

  const getStatusDetails = (resolved: boolean, acknowledged: boolean) => {
    if (resolved) return { text: "حل شده", style: "bg-[#F0FDF4] text-[#15803D]" };
    if (acknowledged) return { text: "تأیید شده", style: "bg-[#EFF6FF] text-[#1D4ED8]" };
    return { text: "باز", style: "bg-[#FFF1F2] text-[#E11D48]" };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hardware_error": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "network_error": return <WifiOff className="w-4 h-4 text-blue-500" />;
      case "temperature_error": return <Thermometer className="w-4 h-4 text-orange-500" />;
      case "payment_error": return <CreditCard className="w-4 h-4 text-slate-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDateTime = (isoDate: string) => {
    if (!isoDate) return "---";
    return new Date(isoDate).toLocaleDateString("fa-IR");
  };

  const formatClock = (isoDate: string) => {
    if (!isoDate) return "---";
    return new Date(isoDate).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  };

  // تابع هندل کردن Resolve
  const handleResolve = async (id: string) => {
    try {
      await resolveAlert(  id );
      toast.success("هشدار با موفقیت حل شد");
    } catch (error) {
      toast.error("خطا در حل هشدار");
    }
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, data]);

  const totalPages = Math.ceil(  data.length / pageSize);

  if (isLoading) {
    return <div className="h-64 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-100" />;
  }

  return (
    <div className="py-4 mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex px-4 justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">لیست هشدارها</h1>

        <button className="flex items-center font-medium cursor-pointer gap-2 px-4 py-2 border border-gray-100 shadow-sm rounded-md text-sm text-gray-800 hover:bg-gray-50 transition-all">
          <Download className="w-4 h-4" />
          خروجی اکسل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-3xl">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs font-medium">
              <th className="py-4 px-2">نوع هشدار</th>
              <th className="py-4 px-2 text-center">دستگاه</th>
              <th className="py-4 px-2 text-center">مکان</th>
              <th className="py-2 px-2 text-center">وضعیت</th>
              <th className="py-2 px-2 text-center">شدت</th>
              <th className="py-2 px-2 text-center">زمان</th>
              <th className="py-2 px-2 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((item: any) => {
                const sev = getSeverityDetails(item.severity);
                const stat = getStatusDetails(item.resolved, item.acknowledged);

                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="font-bold text-gray-800">{item.message}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center font-bold text-gray-800">{item.device_code}</td>
                    <td className="py-2 px-2 text-center text-gray-500">{item.location || "نامشخص"}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={`px-4 py-1 rounded-md text-[11px] font-bold ${stat.style}`}>
                        {stat.text}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${sev.color}`}></span>
                        <span className="text-gray-700">{sev.text}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <div className="flex flex-col text-[11px] leading-tight text-gray-500">
                        <span className="font-bold">{formatDateTime(item.created_at)}</span>
                        <span>{formatClock(item.created_at)}</span>
                      </div>
                    </td>
                    {/* ستون عملیات - دکمه Resolve */}
                    <td className="py-2 px-2 text-center">
                      {!item.resolved && (
                        <button
                          onClick={() => handleResolve(item.id)}
                          disabled={isResolvingAlert}
                          className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold cursor-pointer hover:bg-blue-100 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          {isResolvingAlert ? "..." : "حل شده"}
                          <Check size={12} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">
                  هیچ داده‌ای یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > pageSize && (

          <div className="py-4">
            <StyledPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
}