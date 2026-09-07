
"use client";

import React, { useState } from "react";
import { Trash2, Edit3, Plus, Check, X, Wrench, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useCreateRepair } from "@/features/repairs/hooks/useCreateRepair";
import useGetDeviceRepairs from "@/features/repairs/hooks/useGetDeviceRepairs";
import { useUpdateRepair } from "@/features/repairs/hooks/useUpdateRepair";
import { useDeleteRepair } from "@/features/repairs/hooks/useDeleteReapir";
import UseGetProfile from "@/shared/hooks/useGetProfile"; // اضافه شد
import { hasActionPermission } from "@/shared/permisseions/permissionUtils"; // اضافه شد
import { formatToPersianDate } from "@/utils/formatToPersianDate";

interface RepairItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

const RepairsTab: React.FC = () => {
  const { deviceId } = useParams();

  // هوک‌های API
  const { createRepair, isCreatingRepair } = useCreateRepair();
  const { deviceRepairs, isgettingDeviceRepairs } = useGetDeviceRepairs(deviceId as string);
  const { updateRepair, isUpdaingRepair } = useUpdateRepair();
  const { deleteRepair, isDeletingRepair } = useDeleteRepair();

  // --- Auth & Profile ---
  const { isgettingprofile, profile } = UseGetProfile(); // اضافه شد

  // استیت‌ها برای فرم ثبت جدید
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // استیت‌ها برای ویرایش
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const repairsList = deviceRepairs?.items || [];

  const handleAddRepair = async () => {
    // ✅ لایه امنیتی: چک دسترسی در لحظه ثبت
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      alert("شما دسترسی ثبت تعمیر را ندارید");
      return;
    }

    if (!title.trim() || !description.trim()) {
      alert("لطفاً عنوان و توضیحات را وارد کنید");
      return;
    }

    try {
      const payload = {
        device_id: deviceId as string,
        title: title.trim(),
        description: description.trim(),
      };

      await createRepair(payload);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating repair:", error);
    }
  };

  const startEdit = (item: RepairItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = async (id: string) => {
    // ✅ لایه امنیتی: چک دسترسی در لحظه ویرایش
    if (!hasActionPermission(profile?.role, 'canEdit')) {
      alert("شما دسترسی ویرایش را ندارید");
      return;
    }

    if (!editTitle.trim() || !editDescription.trim()) {
      alert("لطفاً عنوان و توضیحات را وارد کنید");
      return;
    }

    try {
      await updateRepair({
        repairId: id,
        payload: {
          title: editTitle.trim(),
          description: editDescription.trim(),
        },
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating repair:", error);
    }
  };

  const handleDelete = async (id: string) => {
    // ✅ لایه امنیتی: چک دسترسی در لحظه حذف

    if (!hasActionPermission(profile?.role, 'canDelete')) {
      alert("شما دسترسی حذف این رکورد را ندارید");
      return;
    }

    if (window.confirm("آیا از حذف این رکورد مطمئن هستید؟")) {
      try {
        await deleteRepair(id);
      } catch (error) {
        console.error("Error deleting repair:", error);
      }
    }
  };

  const SkeletonItem = () => (
    <div className="flex flex-col sm:flex-row justify-between p-4 bg-white border border-gray-100 rounded-xl gap-4 animate-pulse">
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
      </div>
      <div className="flex gap-2 shrink-0">
        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="py-4 text-right w-full" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Wrench size={24} />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800">مدیریت تعمیرات دستگاه</h1>
        </div>

        {/* Form */}
        {/* ✅ کنترل دسترسی: فرم ثبت جدید فقط برای کاربران مجاز نمایش داده شود */}
        {hasActionPermission(profile?.role, 'canEdit') && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-10">
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-slate-600 mb-1">عنوان تعمیر</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً تعویض منبع تغذیه"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* باقی‌مانده فرم طبق استایل شما قرار می‌گیرد... */}
            <div className="md:col-span-5">
                <label className="block text-sm font-medium text-slate-600 mb-1">توضیحات</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="توضیحات تکمیلی تعمیر"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleAddRepair}
                disabled={isCreatingRepair}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                {isCreatingRepair ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                ثبت تعمیر
              </button>
            </div>
          </div>
        )}

        {/* List Section */}
        <div className="space-y-4">
          {isgettingDeviceRepairs || isgettingprofile ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : repairsList.length > 0 ? (
            repairsList.map((item: RepairItem) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between p-4 bg-white border border-gray-100 rounded-xl gap-4 transition-all hover:shadow-sm">
                <div className="flex-1 space-y-2">

                  {editingId === item.id ? (
                    <div className="space-y-2">
                      <input
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.description}</p>
                      <span className="text-[10px] text-slate-400">{formatToPersianDate(item.created_at)}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2  items-center">
                  {editingId === item.id ? (
                    <>
                      <button 
                        onClick={() => handleUpdate(item.id)}
                        className="p-2 h-8 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="p-2 h-8 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* ✅ کنترل دسترسی: دکمه ویرایش و حذف فقط برای کاربران مجاز */}
                      {hasActionPermission(profile?.role, 'canEdit') && (
                        <button 
                          onClick={() => startEdit(item)}
                          className="p-2  text-slate-600 rounded-lg  transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                      )}
                      {hasActionPermission(profile?.role, 'canDelete') && (
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-600 rounded-lg  hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">هیچ رکورد تعمیراتی یافت نشد.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairsTab;