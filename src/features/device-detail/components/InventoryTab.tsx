"use client";
import React, { useEffect, useState } from "react";
import {
  Package,
  Database,
  Plus,
  X,
  AlignLeft,
  Bell,
  Save,
} from "lucide-react";

import InventoryTable from "./InventoryTable";
import SelectInput from "@/components/form/SelectInput";
import { useParams } from "next/navigation";
import { useAddManualInventory } from "../hooks/useAddManualInventory";
import useGetDeviceDetail from "@/shared/hooks/useGetDeviceDetail";
import toast from "react-hot-toast";
import InventoryTabChart from "./InventoryTabChart";
import { hasActionPermission } from "@/shared/permisseions/permissionUtils";
import UseGetProfile from "@/shared/hooks/useGetProfile";
import { useEditDevice } from "../hooks/useEditDevice";
import { string } from "yup";

interface HandleChangeArg {
  target: {
    value: string | number;
    name: string;
  };
}

const InventoryTab = () => {
  // استفاده از یک استیت واحد برای مدیریت پنل‌های فعال
  const [activePanel, setActivePanel] = useState<"none" | "edit" | "alert">(
    "none",
  );

  const [changeValue, setChangeValue] = useState({
    count: 0,
    operator: "increase",
    note: "",
  });

  const [alertValues, setAlertValues] = useState({
    inventory_yellow_threshold: "",
    inventory_red_threshold: "",
  });

  const { deviceId } = useParams();
  const { addManualInventory, isAddingManualInventory } =
    useAddManualInventory();
  const { editDevice, isEditingDevice } = useEditDevice();
  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);
  const { profile } = UseGetProfile();

  useEffect(() => {
    if (!isGettingDevice) {
      setAlertValues({
        inventory_yellow_threshold: device.inventory_yellow_threshold,
        inventory_red_threshold: device.inventory_red_threshold,
      });
    }
  }, []);

  const handleChange = (e: HandleChangeArg) => {
    setChangeValue({ ...changeValue, [e.target.name]: e.target.value });
  };

  const handleAlertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertValues({ ...alertValues, [e.target.name]: e.target.value });
  };

  
const handleAddInventory = () => {
    const numericValue = +changeValue.count;
    const currentInventory = device?.inventory_level || 0;

    if (device?.is_active===false) {
      toast.error("این عملیات برای دستگاه  های غیر فعال امکان پذیر نیست");
      return;
    }

    if (numericValue === 0) {
      toast.error("لطفاً یک مقدار غیر از صفر را وارد کنید");
      return;
    }

    if (
      changeValue.operator === "decrease" &&
      numericValue > currentInventory
    ) {
      toast.error(`مقدار وارد شده بیشتر از موجودی فعلی (${currentInventory}) است`);
      return;
    }

    const finalDelta =
      changeValue.operator === "decrease"
        ? -Math.abs(numericValue)
        : Math.abs(numericValue);

    addManualInventory(
      {
        deviceId: deviceId as string,
        payload: {
          delta: finalDelta,
          reason: changeValue.note || changeValue.operator==="increase"?"افزودن":"کم کردن",
        },
      },
      {
        onSuccess: () => {
          setActivePanel("none"); 
          setChangeValue({ count: 0, operator: "increase", note: "" });
          toast.success("موجودی با موفقیت به‌روز شد");
        },
        onError: () => {
          toast.error("خطایی در ثبت تغییرات رخ داد");
        },
      },
    );
};

  const handleSaveAlerts = async () => {
    if (device?.is_active===false) {
      toast.error("این عملیات برای دستگاه  های غیر فعال امکان پذیر نیست");
      return;
    }
    if (
      !alertValues.inventory_yellow_threshold ||
      !alertValues.inventory_red_threshold
    ) {
      toast.error("لطفاً هر دو مقدار هشدار را وارد کنید");
      return;
    }
    try {
      editDevice(
        {
          deviceId: deviceId as string,
          payload: {
            inventory_yellow_threshold: +alertValues.inventory_yellow_threshold,
            inventory_red_threshold: +alertValues.inventory_red_threshold,
          },
        },
        {
          onSuccess: () => {
            setActivePanel("none");
          },
        },
      );
    } catch (error) {
      toast.error("خطایی در ذخیره تنظیمات رخ داد");
    }
  };

  return (
    <div className="pt-4 space-y-6" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* کارت موجودی کل */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full relative overflow-hidden group transition-all hover:shadow-md">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-70 group-hover:bg-emerald-100 transition-colors" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 gap-2">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Package size={28} />
                </div>

                <div className="flex gap-2">
                  {hasActionPermission(profile?.role, "canEdit") && (
                    <button
                      onClick={() =>
                        setActivePanel(
                          activePanel === "alert" ? "none" : "alert",
                        )
                      }
                      className={`p-2 rounded-lg transition-all ${activePanel === "alert" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                      title="تنظیمات هشدار موجودی"
                    >
                      <Bell size={20} />
                    </button>
                  )}

                  {hasActionPermission(profile?.role, "canCreate") && (
                    <button
                      onClick={() =>
                        setActivePanel(activePanel === "edit" ? "none" : "edit")
                      }
                      className={`py-2 px-4 rounded-lg text-white transition-all font-semibold text-sm flex items-center gap-2 ${activePanel === "edit" ? "bg-gray-400 hover:bg-gray-500" : "bg-emerald-600 hover:bg-emerald-700"}`}
                    >
                      {activePanel === "edit" ? (
                        <>
                          <X size={16} /> لغو
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> تغییر موجودی
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center py-4">
                <p className="text-slate-500 text-sm font-medium mb-1">
                  موجودی فعلی دستگاه
                </p>
                <h2 className="text-4xl font-bold text-slate-800">
                  {isGettingDevice ? "..." : device?.inventory_level || 0}
                </h2>
              </div>

              {/* فرم ویرایش موجودی - فقط وقتی activePanel برابر edit باشد نمایش داده شود */}
              {activePanel === "edit" && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl space-y-4 border border-slate-100 animate-in fade-in slide-in-from-top-2">
                  <div className=" gap-3">
                    <div className=" flex items-center w-full  gap-2">
                      <SelectInput
                        filterValues={changeValue}
                        handleChange={handleChange}
                        name="operator"
                        options={[
                          { id: "increase", name: "افزودن" },
                          { id: "decrease", name: "کم کردن" },
                        ]}
                      />

                      <input
                        type="number"
                        name="count"
                        value={changeValue.count}
                        onChange={(e) => handleChange({ target: e.target })}
                        placeholder="مقدار"
                        className={`p-2 h-11.5 w-full mt-1.5 text-sm border border-gray-100 shadow-xs bg-white rounded-lg outline-none focus:ring-2 ${changeValue.operator === "increase" ? "ring-emerald-500" : "ring-red-600"} `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-500 mr-1 font-medium">
                      توضیحات (اختیاری)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="note"
                        value={changeValue.note}
                        onChange={(e) => handleChange({ target: e.target })}
                        className="w-full p-2 pr-9 text-sm border h-11.5 border-gray-100 shadow-xs bg-white rounded-lg outline-none focus:ring-2 ring-emerald-500"
                      />
                      <AlignLeft
                        size={14}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddInventory}
                    disabled={isAddingManualInventory}
                    className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 disabled:bg-gray-300 transition-colors"
                  >
                    {isAddingManualInventory
                      ? "در حال ثبت..."
                      : "تأیید و ثبت تغییرات"}
                  </button>
                </div>
              )}

              {/* بخش تنظیمات هشدار - فقط وقتی activePanel برابر alert باشد نمایش داده شود */}
              {activePanel === "alert" && (
                <div className="mt-6 p-4 bg-amber-50 rounded-xl space-y-4 border border-amber-100 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-amber-700 mb-2">
                    تنظیم آستانه هشدارها
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-amber-600 font-medium">
                        هشدار زرد (کم)
                      </label>
                      <input
                        type="number"
                        name="inventory_yellow_threshold"
                        value={alertValues.inventory_yellow_threshold}
                        onChange={handleAlertChange}
                        placeholder="عدد"
                        className="p-2 text-sm border rounded-lg outline-none focus:ring-2 ring-amber-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-amber-600 font-medium">
                        هشدار قرمز (بسیار کم)
                      </label>
                      <input
                        type="number"
                        name="inventory_red_threshold"
                        value={alertValues.inventory_red_threshold}
                        onChange={handleAlertChange}
                        placeholder="عدد"
                        className="p-2 text-sm border rounded-lg outline-none focus:ring-2 ring-amber-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveAlerts}
                    className="w-full py-2 bg-amber-500 text-white rounded-lg font-bold text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {isEditingDevice ? (
                      "  در حال ذخیره ..."
                    ) : (
                      <span>
                        <Save size={16} /> ذخیره هشدارها
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* بخش نمودار */}
        <InventoryTabChart />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryTab;
