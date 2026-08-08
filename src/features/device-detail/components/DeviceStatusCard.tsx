
import React from 'react';
import { Check, Wifi, Thermometer, Zap, Code, Clock } from 'lucide-react';

const DeviceStatusCard = () => {
  return (
    <div className=" w-full h-full bg-white border border-gray-100 rounded-lg  shadow-sm p-4" >
      <div className="text-right mb-4">
        <h3 className="text-gray-600 font-bold text-lg">وضعیت دستگاه</h3>
      </div>

      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-green-100 opacity-60 scale-110"></div>
          <div className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-200">
            <Check size={32} strokeWidth={3.5} />
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-sm font-medium">
          دستگاه آنلاین و در حال کار است
        </p>
      </div>

      <div className="space-y-1">
        {[
          { label: 'وضعیت', value: 'فعال', icon: null, color: 'text-green-500', dot: true },
          { label: 'اتصال شبکه', value: 'مستقر', icon: <Wifi size={16} />, color: 'text-green-500' },
        ].map((item, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-center py-2 ${index !== 5 ? 'border-b border-gray-50' : ''}`}
          >
            <span className="text-gray-400 text-sm font-medium">{item.label}</span>
            <div className={`flex items-center gap-2 ${item.color} text-sm font-semibold`}>
              {item.dot && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceStatusCard;