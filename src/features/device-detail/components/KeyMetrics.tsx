import React from "react";
import { Wallet, CreditCard, Gamepad2, TrendingUp, Info } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  trend: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const MetricCard = ({
  label,
  value,
  unit,
  trend,
  icon,
  iconBg,
  iconColor,
}: MetricCardProps) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 ml-1 rounded-full ${iconBg} ${iconColor}`}>
        {/* {React.cloneElement(icon as React.ReactElement, { size: 24 })} */}
        {icon}
      </div>
      <div className="text-right flex flex-col justify-between   ">
        <div className="text-gray-500 text-sm font-medium mb-1">{label}</div>
        <div className="text-gray-800 text-xl font-bold">{value}</div>
        <div className="text-gray-400 text-xs mt-1">{unit}</div>
      </div>
    </div>
    
  </div>
);

const KeyMetrics = () => {
  const metricsData = [
    {
      label: "تعداد پرداخت‌ها",
      value: "۳۲۵",
      unit: "تراکنش",
      trend: "+۸%",
      icon: <CreditCard />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "درآمد امروز",
      value: "۱,۲۴۵,۰۰۰",
      unit: "تومان",
      trend: "+۱۲%",
      icon: <Wallet />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      label: "میانگین ارزش پرداخت",
      value: "۳,۶۳۱",
      unit: "تومان",
      trend: "+۴%",
      icon: <TrendingUp />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "تعداد بازی‌ها",
      value: "۴۸۲",
      unit: "بازی",
      trend: "+۹%",
      icon: <Gamepad2 />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className=" p-4 bg-white rounded-lg shadow-sm h-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-lg font-bold">شاخص‌های کلیدی</h3>
      </div>

      {/* گرید دو ستونه مطابق عکس */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metricsData.map((item, index) => (
          <MetricCard key={index} {...item} />
        ))}
      </div>

      
    </div>
  );
};

export default KeyMetrics;
