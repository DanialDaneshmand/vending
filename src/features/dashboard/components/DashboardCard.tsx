import { IconType } from "react-icons";

interface StatCard {
  id: number;
  title: string;
  value: string;
  unit?: string;
  trend: string;
  isNegativeTrend?: boolean; // برای رنگ قرمز/نارنجی هشدارها
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
}

interface DashboardCardProps{
    card:StatCard;
    IconComponent:React.ComponentType<{ className?: string }>
}

export default function DashboardCard({card,IconComponent}:DashboardCardProps) {
  return (
    <div
      
      className="flex justify-between rounded-lg border border-gray-100 bg-white py-5 px-3 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      {/* بخش آیکون دایره‌ای سمت چپ */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${card.bgColor}`}
      >
        <IconComponent className={`h-6 w-6 ${card.iconColor}`} />
      </div>
      {/* بخش متن (عنوان، مقدار و روند تغییرات) */}
      <div className="flex flex-col gap-2 justify-between">
        <span className="text-sm font-bold text-gray-800">{card.title}</span>

        <div className="flex  gap-1 flex-col">
          <span className="text-xl font-bold text-gray-800">{card.value}</span>
          {card.unit && (
            <span className="text-xs font-bold text-gray-800">{card.unit}</span>
          )}
        </div>

        <span
          className={`text-[11px] font-medium ${
            card.isNegativeTrend ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {card.trend}
        </span>
      </div>
    </div>
  );
}
