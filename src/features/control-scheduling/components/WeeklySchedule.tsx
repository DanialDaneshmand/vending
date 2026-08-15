"use client";

import { Plus, X, ChevronRight } from "lucide-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

interface TimeSlot {
  id: string;
  time: string;
  action: "روشن" | "خاموش";
}

interface DaySchedule {
  day: string;
  status: "فعال" | "غیرفعال";
  schedules: TimeSlot[];
  active: boolean;
}

const initialData: DaySchedule[] = [
  { day: "شنبه", status: "فعال", active: true, schedules: [{ id: "1", time: "07:00", action: "روشن" }] },
  { day: "یکشنبه", status: "فعال", active: true, schedules: [] },
  { day: "دوشنبه", status: "فعال", active: true, schedules: [] },
  { day: "سه‌شنبه", status: "فعال", active: true, schedules: [] },
  { day: "چهارشنبه", status: "فعال", active: true, schedules: [] },
  { day: "پنجشنبه", status: "فعال", active: true, schedules: [] },
  { day: "جمعه", status: "غیرفعال", active: false, schedules: [] },
];

export default function WeeklySchedule() {
  const [data, setData] = useState<DaySchedule[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"list" | "form">("form"); 
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  const [time, setTime] = useState("");
  const [action, setAction] = useState<"روشن" | "خاموش">("روشن");

  const openAddModal = (index: number) => {
    setEditingDayIndex(index);
    setEditingSlotId(null);
    setModalStep("form");
    setTime("");
    setAction("روشن");
    setIsModalOpen(true);
  };

  const openEditListModal = (index: number) => {
    setEditingDayIndex(index);
    setEditingSlotId(null);
    setModalStep("list");
    setIsModalOpen(true);
  };

  const selectSlotForEdit = (slotId: string, slotTime: string, slotAction: string) => {
    setEditingSlotId(slotId);
    setTime(slotTime);
    setAction(slotAction as any);
    setModalStep("form");
  };

  const handleSave = () => {
    if (!time) return;

    const newData = data.map((day, index) => {
      if (index === editingDayIndex) {
        if (editingSlotId) {
          return {
            ...day,
            schedules: day.schedules.map(slot => 
              slot.id === editingSlotId ? { ...slot, time, action } : slot
            )
          };
        } else {
          return {
            ...day,
            schedules: [...day.schedules, { id: Date.now().toString(), time, action }]
          };
        }
      }
      return day;
    });

    setData(newData);
    setIsModalOpen(false);
  };

  const handleDeleteAll = (index: number) => {
    const newData = data.map((day, i) => 
      i === index ? { ...day, schedules: [] } : day
    );
    setData(newData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[15px] font-bold text-gray-800">برنامه زمان‌بندی هفتگی</h2>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-right text-[12px]">
          <thead className="text-gray-600 border-b border-gray-100">
            <tr className="text-center">
              <th className="pb-3 text-right">روز</th>
              <th className="pb-3">وضعیت</th>
              <th className="pb-3"> زمان دستورات</th>

              <th className="pb-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 font-bold text-gray-600 text-right">{item.day}</td>
                <td className="py-3.5 text-center">
                  <span className={`px-3 py-1 rounded-md text-xs ${item.active ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-center" dir="ltr">
                  <div className="flex flex-wrap justify-center gap-2">
                    {item.schedules.length > 0 ? (
                      item.schedules.map((slot) => (
                        <div 
                          key={slot.id} 
                          className={`px-2 py-1 rounded-md text-[10px] flex items-center gap-1 ${
                            slot.action === "روشن" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          <span className="font-bold">{slot.time}</span>
                          <span>{slot.action}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-300">ثبت نشده</span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openAddModal(i)} className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-all">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => openEditListModal(i)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                      <FiEdit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDeleteAll(i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                      <FaRegTrashAlt className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">
                {modalStep === "list" ? "انتخاب ساعت برای ویرایش" : editingSlotId ? "ویرایش ساعت" : "افزودن ساعت"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>

            <div className="space-y-4">
              {modalStep === "list" ? (
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {data[editingDayIndex!]?.schedules.length > 0 ? (
                    data[editingDayIndex!].schedules.map((slot) => (
                      <div 
                        key={slot.id}
                        onClick={() => selectSlotForEdit(slot.id, slot.time, slot.action)}
                        className="flex justify-between items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-700">{slot.time}</span>

                          <span className={`text-[10px] px-2 py-0.5 rounded ${slot.action === "روشن" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                            {slot.action}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4 text-sm">ساعتی برای این روز ثبت نشده است.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-right">
                    <label className="block text-xs text-gray-500 mb-1">انتخاب ساعت</label>
                    <input 
                      type="time" 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)} 
                      className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 ring-blue-500 text-center" 
                    />
                  </div>
                  <div className="text-right">
                    <label className="block text-xs text-gray-500 mb-1">عملگر</label>
                    <select 
                      value={action} 
                      onChange={(e) => setAction(e.target.value as any)} 
                      className="w-full p-2 text-sm border rounded-lg outline-none focus:ring-2 ring-blue-500"
                    >
                      <option value="روشن">روشن</option>
                      <option value="خاموش">خاموش</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleSave} 
                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
                  >
                    ذخیره تغییرات
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}