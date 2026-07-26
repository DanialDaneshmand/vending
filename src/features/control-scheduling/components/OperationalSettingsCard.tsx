import { Settings2 } from "lucide-react";

const OperationalSettingsCard = () => {
  const settings = [
    { label: "قیمت پیش‌فرض (تومان)", value: "۱۲,۴۵۰,۰۰۰" },
    { label: "حداقل دما (C°)", value: "۴" },
    { label: "حداکثر دما (C°)", value: "۱۰" },
    { label: "مدت زمان روشنایی داخلی (ثانیه)", value: "۶۰" },
    { label: "تاخیر بازگشت در (ثانیه)", value: "۱۵" },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 h-full flex flex-col">
      <span className="text-gray-800 font-bold text-sm block mb-4  w-full ">
        تنظیمات عملیاتی و قیمت‌ها
      </span>
      <div className="flex-1 space-y-0">
        {settings.map((set, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center my-2 text-xs"
          >
            <span className="text-gray-600 font-bold">{set.label}</span>
            <span className="text-gray-700 font-bold py-2 inline-block border border-gray-100 rounded-lg text-left px-2 w-6/12">{set.value}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 cursor-pointer text-blue-600 text-xs font-bold  border border-gray-100 rounded-lg py-2 flex items-center justify-center gap-1">
        ویرایش تنظیمات 
      </button>
    </div>
  );
};

export default OperationalSettingsCard;
