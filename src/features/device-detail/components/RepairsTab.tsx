
"use client";

import React, { useState } from "react";
import { Trash2, Edit3, Plus, Check, X, Wrench, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useCreateRepair } from "@/features/repairs/hooks/useCreateRepair";
import useGetDeviceRepairs from "@/features/repairs/hooks/useGetDeviceRepairs";
import { useUpdateRepair } from "@/features/repairs/hooks/useUpdateRepair";
import { useDeleteRepair } from "@/features/repairs/hooks/useDeleteReapir";


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

  // استیت‌ها برای فرم ثبت جدید
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // استیت‌ها برای ویرایش (حالا شامل عنوان هم می‌شود)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const repairsList = deviceRepairs?.items || [];

  const handleAddRepair = async () => {
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
    if (!editTitle.trim() || !editDescription.trim()) {
      alert("لطفاً عنوان و توضیحات را وارد کنید");
      return;
    }

    try {
      // طبق فرمت درخواستی شما: { repairId: string, payload: { title, description } }
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-10">
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-slate-500 mb-2">عنوان تعمیر</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: تعویض باتری"
              className="w-full px-3 rounded-lg h-11 border border-gray-200 outline-none transition-all text-sm"
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-slate-500 mb-2">توضیحات</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="جزئیات بیشتر..."
              className="w-full px-3 rounded-lg h-11 border border-gray-200 outline-none transition-all text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={handleAddRepair}
              disabled={isCreatingRepair}
              className="w-full h-11 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all"
            >
              {isCreatingRepair ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-600 mb-4">سوابق تعمیرات</h2>

          {isgettingDeviceRepairs ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <SkeletonItem key={i} />)}
            </div>
          ) : repairsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Wrench size={48} className="mb-3 opacity-20" />
              <p className="text-sm">هیچ تعمیراتی ثبت نشده است.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {repairsList.map((item:any) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all shadow-sm group gap-4">
                  {editingId === item.id ? (
                    <div className="flex flex-col sm:flex-row flex-1 gap-3 items-center w-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="عنوان"

                        className="w-full px-2 rounded-lg h-11 border border-gray-200 outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="توضیحات"
                        className="w-full px-2 rounded-lg h-11 border border-gray-200 outline-none text-sm"
                      />
                      <div className="flex gap-1 shrink-0">
                        <button onClick={() => handleUpdate(item.id)} disabled={isUpdaingRepair} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">
                          {isUpdaingRepair ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-all"><X size={16} /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                        <div className="text-blue-600 font-semibold text-sm">{item.title}</div>
                        <div className="text-slate-800 font-medium text-sm wrap-break-word whitespace-normal leading-relaxed">{item.description}</div>
                        <p className="text-slate-400 text-xs">{item.created_at ? new Date(item.created_at).toLocaleDateString('fa-IR') : ""}</p>
                      </div>
                      <div className="flex gap-2 shrink-0 self-end sm:self-center">
                        <button onClick={() => startEdit(item)} className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          disabled={isDeletingRepair}
                          className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        >
                          {isDeletingRepair ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairsTab;