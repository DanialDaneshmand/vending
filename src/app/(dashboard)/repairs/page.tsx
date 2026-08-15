"use client";

import ConfirmModal from "@/components/shared/ConfirmModal";
import { Wrench } from "lucide-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface RepairItem {
  id: string;
  description: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

const repairs: RepairItem[] = [
  {
    id: "1",
    description: "تعویض صفحه نمایش شکسته و تست تاچ سنسور در بخش پشتیبانی",
    date: "۱۴۰۵/۰۵/۱۲",
    status: "completed",
  },
  {
    id: "2",
    description: "بررسی مشکل شارژ نشدن باتری و تعویض سوکت شارژ دستگاه",
    date: "۱۴۰۵/۰۶/۰۲",
    status: "completed",
  },
  {
    id: "3",
    description:
      "آپدیت نرم‌افزاری و رفع مشکل هنگ کردن (متن طولانی برای تست Wrap شدن در صفحه)",
    date: "۱۴۰۵/۰۷/۱۵",
    status: "pending",
  },
  {
    id: "4",
    description: "سرویس دوره‌ای و تمیز کردن فن‌های داخلی",
    date: "۱۴۰۵/۰۸/۲۱",
    status: "completed",
  },
  {
    id: "5",
    description: "تعمیر مدار تغذیه و بررسی نشت جریان",
    date: "۱۴۰۵/۰۹/۰۵",
    status: "cancelled",
  },
];

export default function Page() {
  const [filtredRepairs, setFilteredRepairs] = useState<RepairItem[]>(repairs);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [id, setId] = useState<null | string>(null);

  const handleDelete = (id: string|null) => {
    const newList = filtredRepairs.filter((item) => item.id !== id);
    setFilteredRepairs(newList);
  };

  const handleClick = (id: string) => {
    setIsShowConfirmModal(true);
    setId(id);
  };

  return (
    <section className="p-4">
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-600 mb-4">سوابق تعمیرات</h2>

        {filtredRepairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <Wrench size={48} className="mb-3 opacity-20" />
            <p className="text-sm">هیچ تعمیراتی ثبت نشده است.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtredRepairs.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all shadow-sm group gap-4"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                  <div className="text-slate-800 font-medium text-sm wrap-break-word whitespace-normal leading-relaxed">
                    {item.description}
                  </div>
                  <p className="text-slate-400 text-xs">{item.date}</p>
                </div>

                <div className="flex gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleClick(item.id)}
                    className="py-1 px-4 flex items-center gap-x-2 cursor-pointer rounded-sm transition-all text-sm bg-blue-600 text-white font-medium"
                  >
                    <span>حل شده</span>
                    <FaCheck className="text-sm"/>
                  </button>
                </div>
              </div>
            ))}
            <ConfirmModal
              handleConfirm={() => handleDelete(id&&id)}
              onClose={() => setIsShowConfirmModal(false)}
              open={isShowConfirmModal}
              title="افزودن این مورد به حل شده ها"
            />
          </div>
        )}
      </div>
    </section>
  );
}
