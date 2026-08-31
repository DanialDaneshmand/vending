
import React, { Dispatch, SetStateAction } from 'react';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { TabsType } from '../Types';
import { useParams } from 'next/navigation';
import useGetDeviceDetail from '@/shared/hooks/useGetDeviceDetail';
import useGetDeviceAlerts from '../hooks/useGetDeviceAlerts';

interface EventsCardProps {
  activeTab: TabsType;
  setActiveTab: Dispatch<SetStateAction<TabsType>>;
}

const EventsCard = ({ activeTab, setActiveTab }: EventsCardProps) => {
  const { deviceId } = useParams();
  const { device, isGettingDevice } = useGetDeviceDetail(deviceId as string);
  const { deviceAlerts, isGettingDeviceAlerts } = useGetDeviceAlerts(deviceId as string, device?.location_id);


  // فرمت زمان ISO به ساعت:دقیقه فارسی
  const formatTime = (isoDate: string) => {
    if (!isoDate) return "---";
    try {
      return new Date(isoDate).toLocaleTimeString("fa-IR", { 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    } catch (e) {
      return "---";
    }
  };

  // تبدیل Severity به تایپ آیکون
  const mapSeverityToType = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'error': return 'warning'; // برای موارد بحرانی از آیکون هشدار استفاده می‌کنیم
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="p-1.5 rounded-full bg-green-50 text-green-500"><CheckCircle2 size={20} /></div>;
      case 'warning':
        return <div className="p-1.5 rounded-full bg-orange-50 text-orange-500"><AlertTriangle size={20} /></div>;
      case 'info':
        return <div className="p-1.5 rounded-full bg-blue-50 text-blue-500"><Info size={20} /></div>;
      default:
        return <div className="p-1.5 rounded-full bg-gray-50 text-gray-500"><Info size={20} /></div>;
    }
  };

  // --- Skeleton حالت لودینگ ---
  if (isGettingDeviceAlerts || isGettingDevice) {
    return (
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 w-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const alerts = deviceAlerts?.items || [];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full">
      <div className="flex justify-between items-center mb-6">

        <h3 className="text-gray-800 font-bold text-lg">آخرین رویدادها</h3>
        {activeTab === "overview" && (
          <button 
            onClick={() => setActiveTab("events")} 
            className="text-blue-500 text-sm font-medium cursor-pointer transition-colors hover:underline"
          >
            مشاهده همه
          </button>
        )}
      </div>

      <div className="relative">
        <div className="space-y-0">
          {alerts.length > 0 ? (
            alerts.map((event: any, index:any) => (
              <div 
                key={event.id || index} 
                className={`flex items-start gap-4 py-4 ${index !== alerts.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="relative flex flex-col items-center">
                  {renderIcon(mapSeverityToType(event.severity))}
                </div>

                <div className="flex-1">
                  <div className="text-gray-700 font-semibold text-sm mb-1">
                    {event.message || "بدون پیام"}
                  </div>
                  {/* نمایش وضعیت تایید شده یا حل شده به عنوان توضیحات */}
                  <div className="text-gray-400 text-xs leading-relaxed">
                    {event.resolved ? 'این رویداد حل شده است' : event.acknowledged ? 'این رویداد تایید شده است' : 'در انتظار بررسی'}
                  </div>
                </div>

                <div className="text-left flex flex-col items-end">
                  <span className="text-gray-600 font-bold text-sm">
                    {formatTime(event.created_at)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {event.created_at ? 'امروز' : '---'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-50 p-4 rounded-full text-gray-300 mb-3">
                <Info size={40} />
              </div>
              <p className="text-gray-400 text-sm">هیچ هشداری برای این دستگاه یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsCard;