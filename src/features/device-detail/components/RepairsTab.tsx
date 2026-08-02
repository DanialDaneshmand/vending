import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Trash2, Edit3, Plus, Check, X, Wrench } from "lucide-react";
import { LuCalendar } from "react-icons/lu";

interface RepairItem {
  id: number;
  description: string;
  date: string;
}

const RepairsTab: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairItem[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleAddRepair = () => {
    if (!description || !date) {
      alert("لطفاً تمامی موارد را وارد کنید");
      return;
    }
    const newRepair: RepairItem = { id: Date.now(), description, date };
    setRepairs([newRepair, ...repairs]);
    setDescription("");
    setDate("");
  };

  const handleDelete = (id: number) => {
    setRepairs(repairs.filter((item) => item.id !== id));
  };

  const startEdit = (item: RepairItem) => {
    setEditingId(item.id);
    setEditDescription(item.description);
    setEditDate(item.date);
  };

  const handleUpdate = (id: number) => {
    setRepairs(
      repairs.map((item) =>
        item.id === id
          ? { ...item, description: editDescription, date: editDate }
          : item,
      ),
    );
    setEditingId(null);
  };

  return (
    <div className="py-4 text-right w-full" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Wrench size={24} />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800">
            مدیریت تعمیرات دستگاه
          </h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-10">
          <div className="md:col-span-6">
            <label className="block text-xs font-medium text-slate-500 mb-2">
              توضیحات تعمیرات
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثلاً: تعویض صفحه نمایش و باتری"
              className="w-full px-2 rounded-lg h-11 border border-gray-200 outline-none  transition-all text-sm"
            />
          </div>
          <div className="md:col-span-4 ">
            <label className="block text-xs font-medium text-slate-500 mb-2">
              تاریخ تعمیر
            </label>
            <div className="border flex items-center justify-between border-gray-200 rounded-lg p-2">
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={date}
                onChange={(dateVal) => {
                  if (dateVal instanceof DateObject)
                    setDate(dateVal.format("YYYY/MM/DD"));
                  else if (typeof dateVal === "string") setDate(dateVal);
                }}
                inputClass=" outline-0 border-0 text-sm"
                placeholder="انتخاب تاریخ"
              />
              <span>
                <LuCalendar className="text-gray-400" />
              </span>
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              onClick={handleAddRepair}
              className="w-full cursor-pointer h-11 text-sm flex items-center justify-center gap-2 bg-blue-600 text-white  rounded-lg font-semibold hover:bg-blue-700 transition-all "
            >
              <Plus size={20} /> <span>ثبت تعمیر</span>
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-600 mb-4">
            سوابق تعمیرات
          </h2>

          {repairs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Wrench size={48} className="mb-3 opacity-20" />
              <p className="text-sm">هیچ تعمیراتی ثبت نشده است.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {repairs.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-all shadow-sm group gap-4"
                >
                  {editingId === item.id ? (
                    <div className="flex flex-col sm:flex-row flex-1 gap-3 items-center w-full">
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="مثلاً: تعویض صفحه نمایش و باتری"
                        className="w-full px-2 rounded-lg h-11 border border-gray-200 outline-none  transition-all text-sm"
                      />
                      <div className="border w-full flex items-center justify-between border-gray-200 rounded-lg p-2">
                        <DatePicker
                          calendar={persian}
                          locale={persian_fa}
                          value={editDate}
                          onChange={(dateVal) => {
                            if (dateVal instanceof DateObject)
                              setEditDate(dateVal.format("YYYY/MM/DD"));
                            else if (typeof dateVal === "string")
                              setEditDate(dateVal);
                          }}
                          inputClass=" outline-0 border-0 text-sm"
                          placeholder="انتخاب تاریخ"
                        />
                        <span>
                          <LuCalendar className="text-gray-400" />
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* بخش متن - کلید حل مشکل Wrap شدن */}
                      <div className="flex flex-col gap-1 flex-1 min-w-0 overflow-hidden">
                        <div className="text-slate-800 font-medium text-sm wrap-break-word whitespace-normal leading-relaxed">
                          {item.description}
                        </div>
                        <p className="text-slate-400 text-xs">{item.date}</p>
                      </div>

                      {/* بخش دکمه‌ها */}
                      <div className="flex gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
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
