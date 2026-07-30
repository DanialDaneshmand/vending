"use client";
import React, { useMemo, useState } from "react";
import { Send, Laptop } from "lucide-react";
import StyledPagination from "@/components/ui/Pagination";

export interface IDevice {
  id: string;
  name: string;
  deviceId: string;
  location: string;
  ip: string;
  toggleTime: string | number;
  toggleGap: string | number;
  toggleCount: string | number;
  price: string | number;
}

const initialDevices = [
  {
    id: "1",
    name: "وندینگ ۱۰۱",
    deviceId: "VM-101",
    location: "تهران - میدان ونک",
    ip: "192.168.1.21",
    toggleTime: "300",
    toggleGap: "500",
    toggleCount: "1",
    price: "120,000",
  },
  {
    id: "2",
    name: "وندینگ ۲۰۵",
    deviceId: "VM-205",
    location: "اصفهان - خیابان آزگانه",
    ip: "192.168.1.22",
    toggleTime: "500",
    toggleGap: "1000",
    toggleCount: "2",
    price: "150,000",
  },
  {
    id: "3",
    name: "وندینگ ۱۱۰",
    deviceId: "VM-110",
    location: "مشهد - بلوار وکیل‌آباد",
    ip: "192.168.1.23",
    toggleTime: "300",
    toggleGap: "500",
    toggleCount: "1",
    price: "110,000",
  },
  {
    id: "4",
    name: "وندینگ ۳۰۱",
    deviceId: "VM-301",
    location: "شیراز - خیابان زند",
    ip: "192.168.1.24",
    toggleTime: "900",
    toggleGap: "1000",
    toggleCount: "2",
    price: "140,000",
  },
  {
    id: "5",
    name: "وندینگ ۱۰۳",
    deviceId: "VM-103",
    location: "تبریز - یک عصر شمالی",
    ip: "192.168.1.25",
    toggleTime: "300",
    toggleGap: "500",
    toggleCount: "3",
    price: "130,000",
  },
];

const DeviceManager = () => {
  const [devices] = useState(initialDevices);
  const [selectedId, setSelectedId] = useState(devices[0].id);
  const [formData, setFormData] = useState<IDevice>(devices[0]);
  const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const paginatedData = useMemo(() => {
      const startIndex = (currentPage - 1) * pageSize;
      return initialDevices.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, initialDevices]);
  
    const totalPages = Math.ceil(initialDevices.length / pageSize);

  const handleSelect = (device: IDevice) => {
    setSelectedId(device.id);
    setFormData(device);
  };
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* بخش جدول (Master) - اشغال ۱۰ ستون */}
        <div className="lg:col-span-8 ">
          <div className="bg-white h-full rounded-lg p-4 border border-gray-100 shadow-sm overflow-auto ">
            <table className="w-full min-w-3xl lg:min-w-xl text-right border-collapse">
              <thead>
                <tr className="text-gray-500 text-xs font-medium border-b border-gray-100">
                  <th className="py-4 px-2 text-nowrap">نام دستگاه</th>
                  <th className="py-4 px-2 text-nowrap">شناسه دستگاه</th>
                  <th className="py-4 px-2 text-center">مکان </th>
                  <th className="py-4 px-2 text-nowrap">IP دستگاه POS</th>
                  <th className="py-4 px-2 text-nowrap">زمان تاگل (ms)</th>
                  <th className="py-4 px-2 text-nowrap">
                    فاصله بین تاگل‌ها (ms)
                  </th>
                  <th className="py-4 px-2 text-nowrap">تعداد تاگل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map((device) => (
                  <tr
                    key={device.id}
                    onClick={() => handleSelect(device)}
                    className={`cursor-pointer transition-all  ${
                      selectedId === device.id
                        ? "bg-blue-50 "
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-2">
                      <div className=" flex items-center gap-x-2">
                        <input
                          type="radio"
                          checked={selectedId === device.id}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                          readOnly
                        />
                        <span className="text-nowrap">{device.name}</span>{" "}
                      </div>
                    </td>
                    <td className="py-4  px-2 text-sm text-slate-600">
                      {device.deviceId}
                    </td>
                    <td className="py-4  px-2 text-xs text-slate-600">
                      {device.location}
                    </td>
                    <td className="py-4 px-2 text-sm text-slate-600">
                      {device.ip}
                    </td>
                    <td className="py-4 px-2 text-sm text-slate-600 text-center">
                      {device.toggleTime}
                    </td>
                    <td className="py-4 text-center px-2 text-sm text-slate-600">
                      {device.toggleGap}
                    </td>
                    <td className="py-4 px-2 text-sm text-slate-600">
                      {device.toggleCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Section */}
            <StyledPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>

        {/* بخش تنظیمات (Detail) - اشغال ۴ ستون */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 h-full flex flex-col">
            {/* هدر پنل تنظیمات */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-left">
                <h3 className="text-slate-500 text-xs mb-1">
                  تنظیمات دستگاه انتخاب شده
                </h3>
                <h2 className="text-slate-800 font-bold text-lg">
                  {formData.name}
                </h2>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Laptop size={24} />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {/* بخش قیمت */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 block text-right">
                  قیمت (ریال)
                </label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-left"
                />
              </div>

              {/* بخش POS */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 block text-right">
                  IP دستگاه POS
                </label>
                <input
                  name="ip"
                  value={formData.ip}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-all text-left"
                />
              </div>

              {/* بخش تنظیمات تاگل */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-700 border-b pb-2">
                  تنظیمات Toggle
                </h4>

                <div className="flex items-center justify-between gap-4">
                  <input
                    name="toggleTime"
                    value={formData.toggleTime}
                    onChange={handleInputChange}
                    className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
                  />
                  <span className="text-xs text-slate-500">
                    زمان toggle (ms)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <input
                    name="toggleGap"
                    value={formData.toggleGap}
                    onChange={handleInputChange}
                    className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
                  />
                  <span className="text-xs text-slate-500">
                    فاصله بین تاگل‌ها (ms)
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <input
                    name="toggleCount"
                    value={formData.toggleCount}
                    onChange={handleInputChange}
                    className="w-24 p-2 bg-slate-50 border border-gray-200 rounded-lg text-xs text-center outline-none focus:border-blue-500"
                  />
                  <span className="text-xs text-slate-500">تعداد toggle</span>
                </div>
              </div>
            </div>

            {/* دکمه ارسال */}
            <button className="w-full bg-blue-600  text-white font-bold py-3 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mt-8">
              <span>ارسال به دستگاه</span>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceManager;
