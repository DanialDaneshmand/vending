
import React from 'react';

const SettingsHistory = () => {
  const historyData = [
    {
      version: 'v2.1.8',
      tag: '(فعلی)',
      description: 'تغییر حداقل دما، قیمت پیش‌فرض',
      user: 'علی محمدی',
      time: '۱۴۰۳/۰۶/۲۴ ۱۰:۰۳',
      isActive: true,
    },
    {
      version: 'v2.1.7',
      tag: '',
      description: 'تغییر بازه زمانی شنبه تا پنجشنبه',
      user: 'الهام احمدی',
      time: '۱۴۰۳/۰۶/۲۲ ۱۵:۲۶',
      isActive: false,
    },
    {
      version: 'v2.1.6',
      tag: '',
      description: 'تغییر مدت روشنایی داخلی',
      user: 'محسن رضایی',
      time: '۱۴۰۳/۰۶/۲۰ ۱۱:۴۲',
      isActive: false,
    },
    {
      version: 'v2.1.5',
      tag: '',
      description: 'تنظیمات اولیه',
      user: 'سیستم',
      time: '۱۴۰۳/۰۵/۱۸ ۰۹:۰۰',
      isActive: false,
    },
  ];

  return (
      <div className="bg-white rounded-lg py-4 h-full border border-gray-100 shadow-sm px-2">

        {/* هدر بخش */}
        <div className='px-2'>
          <h2 className=" font-bold text-[#0F172A] mb-4 text-right">تاریخچه تنظیمات</h2>
        </div>

        {/* لیست آیتم‌ها */}
        <div className="space-y-3">
          {historyData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-4 px-2 bg-white rounded-lg border border-gray-100  transition-colors"
            >
              {/* بخش سمت چپ: ورژن */}
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-[#1E293B] font-mono">{item.version}</span>
                {item.tag && (
                  <span className="text-[10px] text-gray-400 mt-1">{item.tag}</span>
                )}
              </div>

              {/* بخش سمت راست: توضیحات و کاربر */}
              <div className="flex flex-col items-end text-right">
                <p className="text-[12px] font-medium text-[#475569] mb-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{item.user}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span dir="ltr">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* دکمه انتهای کارت */}
        <button className="w-full mt-4 py-2 rounded-lg cursor-pointer border border-gray-100 text-[#2563EB] text-xs font-bold  transition-all">
          مشاهده همه نسخه‌ها
        </button>
      </div>
  );
};

export default SettingsHistory;