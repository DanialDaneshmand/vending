
import React from 'react';

const CommandHistory = () => {
  const data = [
    { id: '#78452', command: 'روشن', status: 'اعمال شد', statusType: 'success', time: '۱۴۰۳/۰۶/۲۴ ۱۰:۰۳', requester: 'علی محمدی' },
    { id: '#78451', command: 'وضعیت', status: 'اعمال شد', statusType: 'success', time: '۱۴۰۳/۰۶/۲۴ ۱۰:۰۲', requester: 'علی محمدی' },
    { id: '#78450', command: 'خاموش', status: 'اعمال شد', statusType: 'success', time: '۱۴۰۳/۰۶/۲۴ ۰۸:۵۸', requester: 'سیستم' },
    { id: '#78449', command: 'روشن', status: 'در انتظار', statusType: 'pending', time: '۱۴۰۳/۰۶/۲۳ ۲۳:۱۵', requester: 'الهام احمدی' },
    { id: '#78448', command: 'راهاندازی مجدد', status: 'اعمال شد', statusType: 'success', time: '۱۴۰۳/۰۶/۲۳ ۲۳:۱۴', requester: 'الهام احمدی' },
  ];

  return (
      <div className="  bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden p-4">

        {/* هدر بخش */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[16px] font-bold text-[#0F172A]">تاریخچه دستورات</h2>
        </div>

        {/* جدول ریسپانسیو */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="text-xs text-gray-600  border-b border-gray-100">
                <th className="pb-4  px-2 ">command_id</th>
                <th className="pb-4 px-2">دستور</th>
                <th className="pb-4  px-2 text-center">وضعیت</th>
                <th className="pb-4  px-2 text-center">زمان</th>
                <th className="pb-4  px-2">درخواست‌دهنده</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item, index) => (
                <tr key={index} className="text-xs  text-[#334155] hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-2 text-gray-600 font-bold ">{item.id}</td>
                  <td className="py-4 px-2 font-bold">{item.command}</td>
                  <td className="py-4 px-2 text-center">
                    <div className={` flex justify-center items-center px-1 w-full py-1 rounded-lg text-xs font-medium border ${
                      item.statusType === 'success' 
                        ? 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]' 
                        : 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]'
                    }`}>
                      {item.status}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center text-gray-600 font-bold" dir="ltr">{item.time}</td>
                  <td className="py-4 px-2 text-gray-600 font-bold">{item.requester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* دکمه انتهای جدول */}
        <div className="mt-4 pt-2">
          <button className="w-full py-2 rounded-lg border border-gray-200 text-[#2563EB] text-xs font-bold cursor-pointer transition-all">

            مشاهده همه دستورات
          </button>
        </div>
      </div>
  );
};

export default CommandHistory;