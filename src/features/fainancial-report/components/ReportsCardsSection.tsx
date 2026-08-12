import { GrTransaction } from "react-icons/gr";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";

const StatCard = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  subText,
}: any) => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex flex-col items-center justify-between  relative overflow-hidden">
    {/* هدر: عنوان و آیکون */}
    <div className="w-full flex justify-between items-start mb-2">
      <div className={`p-3 rounded-full ${iconBg} ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 text-center">
        <p className="text-gray-700 text-sm font-bold mb-2">{title}</p>
        <h3 className="text-[#1e293b] text-xl font-bold dir-ltr tracking-tight">
          {value}
        </h3>
        <p className="text-gray-400 text-[10px] mt-1">{unit}</p>
      </div>
    </div>

    
  </div>
);

export default function ReportsCardsSection() {
  const stats = [
    {
      title: "درآمد کل",
      value: "۱۲,۴۵۰,۰۰۰",
      unit: "تومان",
      icon: LuWallet ,
      iconBg: "bg-[#E8DEFE]",
      iconColor: "text-[#3611A4]",
    },
    {
      title: "تعداد بازی",
      value: "۳,۲۵۶",
      unit: "بازی",
      icon: IoGameControllerOutline,
      iconBg: "bg-[#E1EFFF]",
      iconColor: "text-[#3D6BC5]",
    },
    
    {
      title: "تعداد تراکنش",
      value: "۴۸",
      unit: "عدد",
      icon: GrTransaction ,
      iconBg: "bg-[#FFE7D4]",
      iconColor: "text-[#EF7E2B]",
    },
  ];

  return (
    <div className=" mt-4 grid grid-cols-1 sm:grid-cols-3  gap-4">
      {stats.map((stat, index) => (
        <div key={index}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}
