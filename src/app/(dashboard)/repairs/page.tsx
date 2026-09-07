
"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import useGetAllRepairs from "@/features/repairs/hooks/useGetAllRepairs";
import { useResolveRepair } from "@/features/repairs/hooks/useresolveRepair";
import { Wrench, Loader2 } from "lucide-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import UseGetProfile from "@/shared/hooks/useGetProfile"; // اضافه شد برای چک دسترسی
import { hasActionPermission } from "@/shared/permisseions/permissionUtils"; // اضافه شد برای چک دسترسی

interface RepairItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  resolved: boolean;
}

export default function Page() {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  const { isgettingprofile, profile } = UseGetProfile(); // اضافه شد
  const { isgettingRepairs, repairs } = useGetAllRepairs();
  const { isResolvingingRepair, resolveRepair } = useResolveRepair();

  // 1. فیلتر کردن: فقط مواردی که resolved آن‌ها false است را نگه می‌داریم
  const unresolvedRepairs = (repairs?.items || []).filter((item: RepairItem) => item.resolved === false);

  const handleConfirmResolve = async () => {
    if (!selectedRepairId) return;

    // ✅ لایه امنیتی: چک مجدد دسترسی قبل از ارسال درخواست به سرور
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

  return (
    <section className="p-4">
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-600 mb-4">سوابق تعمیرات</h2>

        {/* نمایش لودینگ در صورتی که پروفایل یا لیست تعمیرات در حال لود باشند */}
        {isgettingRepairs || isgettingprofile ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        ) : unresolvedRepairs.length === 0 ? (
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
                <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                  <div className="text-blue-600 font-semibold text-sm">{item.title}</div>
                  <div className="text-slate-800 font-medium text-sm wrap-break-word whitespace-normal leading-relaxed">
                    {item.description}

                  </div>
                  <p className="text-slate-400 text-xs">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR') : ""}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 self-end sm:self-center">
                  {/* ✅ کنترل دسترسی: دکمه "حل شده" فقط برای کسانی که canResolve دارند نمایش داده شود */}
                  {hasActionPermission(profile?.role, 'canCreate') && (
                    <button
                      onClick={() => handleClick(item.id)}
                      disabled={isResolvingingRepair && selectedRepairId === item.id}
                      className="py-1 px-4 flex items-center gap-x-2 cursor-pointer rounded-sm transition-all text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
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

            {/* Confirm Modal */}
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