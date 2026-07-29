
import React, { Dispatch, SetStateAction } from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { TabsType } from '../Types';

// تعریف ساختار داده برای هر رویداد
interface EventItem {
  id: number;
  title: string;
  description: string;
  time: string;
  date: string;
  type: 'success' | 'warning' | 'info';
}

interface EventsCardProps {
  activeTab: TabsType;
  setActiveTab: Dispatch<SetStateAction<TabsType>>;
}

const eventsData: EventItem[] = [
  {
    id: 1,
    title: 'دستگاه آنلاین شد',
    description: 'دستگاه با موفقیت به سرور متصل شد.',
    time: '۱۰:۱۵',
    date: 'امروز',
    type: 'success',
  },
  {
    id: 2,
    title: 'کمبود محصول',
    description: 'تعداد ۵ عدد نوشابه انرژی‌زا',
    time: '۰۹:۴۲',
    date: 'امروز',
    type: 'warning',
  },
  {
    id: 3,
    title: 'بازکردن درب دستگاه',
    description: 'درب دستگاه توسط کاربر سرویس باز شد.',
    time: '۰۹:۳۰',
    date: 'امروز',
    type: 'info',
  },
  {
    id: 4,
    title: 'پرداخت موفق',
    description: 'مبلغ ۱۲,۰۰۰ تومان',
    time: '۰۹:۲۸',
    date: 'امروز',
    type: 'success',
  },
  {
    id: 5,
    title: 'قطع و وصل برق',
    description: 'دستگاه به مدت ۳ ثانیه قطع و وصل شد.',
    time: '۰۸:۵۷',
    date: 'امروز',
    type: 'warning',
  },
];

const EventsCard = ({activeTab,setActiveTab}:EventsCardProps) => {
  // تابع کمکی برای رندر کردن آیکون‌ها بر اساس نوع رویداد
  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="p-1.5 rounded-full bg-green-50 text-green-500"><CheckCircle2 size={20} /></div>;
      case 'warning':
        return <div className="p-1.5 rounded-full bg-orange-50 text-orange-500"><AlertTriangle size={20} /></div>;
      case 'info':
        return <div className="p-1.5 rounded-full bg-blue-50 text-blue-500"><Info size={20} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className=" w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full " >
      {/* هدر کارت */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 font-bold text-lg">آخرین رویدادها</h3>
        {
          activeTab==="overview"&&<button onClick={()=>setActiveTab("events")} className="text-blue-500 text-sm font-medium cursor-pointer transition-colors">
          مشاهده همه
        </button>
        }
      </div>

      {/* لیست رویدادها */}
      <div className="relative">
        {/* خط عمودی تایم‌لاین (پس‌زمینه) */}

        <div className="space-y-0">
          {eventsData.map((event, index) => (
            <div 
              key={event.id} 
              className={`flex items-start gap-4 py-4 ${index !== eventsData.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              {/* بخش آیکون و دایره تایم‌لاین */}
              <div className="relative flex flex-col items-center">
                {renderIcon(event.type)}
                {/* نقطه کوچک روی خط تایم‌لاین */}
              </div>

              {/* محتوای متنی */}
              <div className="flex-1">
                <div className="text-gray-700 font-semibold text-sm mb-1">{event.title}</div>

                <div className="text-gray-400 text-xs leading-relaxed">{event.description}</div>
              </div>

              {/* بخش زمان و تاریخ */}
              <div className="text-left flex flex-col items-end ">
                <span className="text-gray-600 font-bold text-sm">{event.time}</span>
                <span className="text-gray-400 text-xs">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCard;