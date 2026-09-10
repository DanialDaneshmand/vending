
"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import useGetAllRepairs from "@/features/repairs/hooks/useGetAllRepairs";
import { useResolveRepair } from "@/features/repairs/hooks/useresolveRepair";
import { Wrench, Loader2, MapPin, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import UseGetProfile from "@/shared/hooks/useGetProfile"; 
import { hasActionPermission } from "@/shared/permisseions/permissionUtils"; 
import UseGetLocations from "@/shared/hooks/useGetLocations";
import UseGetAllSection from "@/shared/hooks/useGetAllSections";

interface RepairItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  resolved: boolean;
  location_id: string; 
  section_id: string; 
  device_code: string; 
}

export default function Page() {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  // هوک‌های دریافت دیتا
  const { isgettingprofile, profile } = UseGetProfile();
  const { isgettingRepairs, repairs } = useGetAllRepairs();
  const { isResolvingingRepair, resolveRepair } = useResolveRepair();
  const { locations, isGettingLocations } = UseGetLocations();
  const { sectionsList, isGettingSectionsList } = UseGetAllSection();

  // 🔍 توابع کمکی برای تبدیل ID به نام (با توجه به ساختار دیتای شما)
  const getLocationName = (locId: string) => {
    const found = locations?.items?.find((loc: any) => loc.id === locId);
    return found ? found.name : "نامشخص";
  };

  const getSectionName = (secId: string) => {
    const found = sectionsList?.items?.find((sec: any) => sec.id === secId);
    return found ? found.name : "نامشخص";
  };

  // فیلتر کردن فقط موارد حل نشده
  const unresolvedRepairs = (repairs?.items || []).filter((item: RepairItem) => item.resolved === false);

  const handleConfirmResolve = async () => {
    if (!selectedRepairId) return;

    if (hasActionPermission(profile?.role, 'canCreate')) {
      try {
        await resolveRepair(selectedRepairId);
      } catch (error) {
        console.error("Error resolving repair:", error);
      } finally {
        setIsShowConfirmModal(false);
        setSelectedRepairId(null);
      }
    } else {
      console.error("شما دسترسی برای تایید تعمیرات را ندارید");
      setIsShowConfirmModal(false);
      setSelectedRepairId(null);
    }
  };

  const handleClick = (id: string) => {
    setSelectedRepairId(id);
    setIsShowConfirmModal(true);
  };

  // نمایش لودینگ جامع تا زمانی که تمام لیست‌های مورد نیاز (تعمیرات، لوکیشن، بخش) لود شوند
  if (isgettingRepairs || isgettingprofile || isGettingLocations || isGettingSectionsList) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <section className="p-4">
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-600 mb-4">سوابق تعمیرات</h2>

        {unresolvedRepairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Wrench size={48} className="mb-3 opacity-20" />
            <p className="text-sm">تعمیرات حل نشده‌ای وجود ندارد.</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 gap-3">
            {unresolvedRepairs.map((item: RepairItem) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all shadow-sm group gap-4"
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0 overflow-hidden">
                  {/* عنوان و کد دستگاه */}
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="text-blue-600 font-semibold text-sm">{item.title}</div>
                    {item.device_code && (
                      <div className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono uppercase">
                        {item.device_code}
                      </div>
                    )}
                  </div>

                  {/* توضیحات */}
                  <div className="text-slate-800 font-medium text-sm wrap-break-word whitespace-normal leading-relaxed">
                    {item.description}
                  </div>

                  {/* نمایش نام لوکیشن و بخش بر اساس IDها */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500">
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin size={13} className="text-slate-400" />
                      <span className="font-medium">{getLocationName(item.location_id)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <LayoutGrid size={13} className="text-slate-400" />
                      <span className="font-medium">{getSectionName(item.section_id)}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs mt-1">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR') : ""}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 self-end sm:self-center">
                  {/* کنترل دسترسی: دکمه فقط برای کسانی که canCreate دارند */}
                  {hasActionPermission(profile?.role, 'canCreate') && (
                    <button
                      onClick={() => handleClick(item.id)}
                      disabled={isResolvingingRepair && selectedRepairId === item.id}
                      className="py-1.5 px-4 flex items-center gap-x-2 cursor-pointer rounded-lg transition-all text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      <span className="hidden sm:inline">حل شده</span>
                      {isResolvingingRepair && selectedRepairId === item.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <FaCheck className="text-sm" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <ConfirmModal
              handleConfirm={handleConfirmResolve}
              onClose={() => {
                setIsShowConfirmModal(false);
                setSelectedRepairId(null);
              }}
              open={isShowConfirmModal}
              title="آیا این مورد حل شده است؟"
            />
          </div>
        )}
      </div>
    </section>
  );
}