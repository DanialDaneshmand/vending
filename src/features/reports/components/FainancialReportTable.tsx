
import React from 'react';

const data = [
  { id: 1, location: 'پاساژ کوروش', devices: 12, games: 890, income: '۳,۵۸۰,۰۰۰', avgIncome: '۲۹۸,۳۳۳', win: 573, loss: 317, winRate: '۶۴٪', prizes: 14 },
  { id: 2, location: 'میدان ونک', devices: 8, games: 654, income: '۲,۷۹۰,۰۰۰', avgIncome: '۳۴۸,۷۵۰', win: 396, loss: 258, winRate: '۶۰٪', prizes: 9 },
  { id: 3, location: 'پارک ملت', devices: 6, games: 432, income: '۱,۹۸۰,۰۰۰', avgIncome: '۳۳۰,۰۰۰', win: 267, loss: 165, winRate: '۶۲٪', prizes: 6 },
  { id: 4, location: 'بازار بزرگ', devices: 10, games: 569, income: '۲,۳۶۰,۰۰۰', avgIncome: '۲۳۶,۰۰۰', win: 347, loss: 222, winRate: '۶۱٪', prizes: 7 },
  { id: 5, location: 'مجتمع ایران‌مال', devices: 9, games: 458, income: '۱,۷۱۰,۰۰۰', avgIncome: '۱۹۰,۰۰۰', win: 280, loss: 178, winRate: '۶۱٪', prizes: 5 },
];

const total = {
  location: 'جمع کل',
  devices: 45,
  games: '۳,۲۵۶',
  income: '۱۲,۴۵۰,۰۰۰',
  avgIncome: '۲۷۶,۶۶۷',
  win: '۱,۹۸۷',
  loss: '۱,۲۶۹',
  winRate: '۶۱٪',
  prizes: 48,
};

export default function FinancialReportTable() {
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-gray-100 shadow-sm mt-4"  >
      {/* عنوان گزارش */}
      <h3 className=" font-bold text-[#1e293b] mb-4 text-right">خلاصه گزارش مالی</h3>

      {/* کانتینر جدول برای اسکرول در موبایل */}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full text-center border-collapse min-w-3xl">
          {/* هدر جدول */}
          <thead className="bg-[#F6F7F9] text-xs md:text-xs text-gray-500 font-medium">
            <tr>
              <th className="py-4 px-2 border-b border-gray-100">ردیف</th>
              <th className="py-4 px-2 border-b border-gray-100">مکان</th>
              <th className="py-4 px-2 border-b border-gray-100">تعداد دستگاه</th>
              <th className="py-4 px-2 border-b border-gray-100">تعداد بازی</th>
              <th className="py-4 px-2 border-b border-gray-100">درآمد (تومان)</th>
              <th className="py-4 px-2 border-b border-gray-100">میانگین درآمد به ازای هر دستگاه</th>
              <th className="py-4 px-2 border-b border-gray-100">برد</th>
              <th className="py-4 px-2 border-b border-gray-100">باخت</th>
              <th className="py-4 px-2 border-b border-gray-100">نرخ برد</th>
              <th className="py-4 px-2 border-b border-gray-100">جوایز توزیع شده</th>
            </tr>
          </thead>

          {/* بدنه جدول */}
          <tbody className="text-[10px] md:text-xs text-gray-700">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-2 border-b border-gray-50">{row.id}</td>
                <td className="py-4 px-2 border-b border-gray-50 font-medium">{row.location}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.devices}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.games}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.income}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.avgIncome}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.win}</td>

                <td className="py-4 px-2 border-b border-gray-50">{row.loss}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.winRate}</td>
                <td className="py-4 px-2 border-b border-gray-50">{row.prizes}</td>
              </tr>
            ))}

            {/* ردیف جمع کل */}
            <tr className="bg-[#EFF4FA] text-blue-600 font-bold">
              <td className="py-4 px-2 rounded-br-xl" colSpan={2}>{total.location}</td>
              <td className="py-4 px-2">{total.devices}</td>
              <td className="py-4 px-2">{total.games}</td>
              <td className="py-4 px-2">{total.income}</td>
              <td className="py-4 px-2">{total.avgIncome}</td>
              <td className="py-4 px-2">{total.win}</td>
              <td className="py-4 px-2">{total.loss}</td>
              <td className="py-4 px-2">{total.winRate}</td>
              <td className="py-4 px-2 rounded-bl-xl">{total.prizes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}