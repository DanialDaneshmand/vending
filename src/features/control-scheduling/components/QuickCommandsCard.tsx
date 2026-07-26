import { CircleHelp, Power, RotateCw } from "lucide-react";

const QuickCommandsCard = () => {
  const buttons = [
    { label: 'روشن', icon: <Power className="w-5 h-5 text-green-500" />, color: 'text-green-600' },
    { label: 'خاموش', icon: <Power className="w-5 h-5 text-red-500" />, color: 'text-red-600' },
    { label: 'وضعیت', icon: <CircleHelp className="w-5 h-5 text-purple-500" />, color: 'text-purple-600' },
    { label: 'راهاندازی مجدد', icon: <RotateCw className="w-5 h-5 text-blue-500" />, color: 'text-blue-600' },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border  border-gray-100 h-full">
      <span className="text-gray-800 font-bold text-sm block mb-4  w-full ">دستورات فوری</span>
      <div className="grid grid-cols-2 gap-2">
        {buttons.map((btn, idx) => (
          <button key={idx} className="flex w-full flex-col border-gray-200 cursor-pointer items-center justify-center p-3 bg-gray-50 rounded-xl border hover:border-gray-200 transition-all group">
            <div className="mb-2 p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              {btn.icon}
            </div>
            <span className={`text-[11px] font-medium ${btn.color}`}>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCommandsCard