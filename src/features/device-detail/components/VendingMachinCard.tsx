import { Store } from "lucide-react";
import { FiBox } from "react-icons/fi";
import { IoLocationOutline, IoWifi } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";


const VendingMachineCard = () => {
  return (
    <div
      dir="rtl"
      className="w-full bg-white border border-gray-100 rounded-lg shadow-sm p-4 mt-4"
    >
      {/* Container - Responsive Flex/Grid */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
        {/* بخش اول: اطلاعات اصلی دستگاه */}
        <div className="flex items-center gap-4 w-full md:w-auto pb-4 md:pb-0 md:pl-6">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <Store size={28} />
            {/* <VendingIcon/> */}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800 text-lg text-nowrap">
                وندینگ ۱۰۲
              </h3>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                آنلاین
              </span>
            </div>
            <p className="text-gray-400 text-xs">کد دستگاه: VM-102</p>
          </div>
        </div>

        {/* بخش دوم: وضعیت دستگاه */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto py-4 md:py-0 md:px-4">
          <span className="text-gray-400 text-xs text-nowrap">
            وضعیت دستگاه
          </span>
          <span className="bg-green-100 text-green-600 px-4 py-1 rounded-md text-sm font-medium">
            فعال
          </span>
        </div>

        {/* بخش سوم: آخرین اتصال */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto py-4 md:py-0 md:px-4 text-center">
          <span className="text-gray-400 text-xs text-nowrap">آخرین اتصال</span>
          <div className="flex items-center gap-1.5 text-gray-700 text-sm font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-nowrap text-xs">امروز ۱۰:۱۵</span>
          </div>
        </div>

        {/* بخش چهارم: هارت‌بیت */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto py-4 md:py-0 md:px-4 text-center">
          <span className="text-gray-400 text-xs">آخرین هارت‌بیت</span>
          <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold">
            <IoWifi  className=" text-green-600 text-xl"/>
            <span className=" text-nowrap text-xs">۱ دقیقه پیش</span>
          </div>
        </div>

        {/* بخش پنجم: مکان */}
        <div className="flex flex-col items-center gap-2 w-full md:w-auto py-4 md:py-0 md:px-4 text-center">
          <span className="text-gray-400 text-xs">مکان</span>
          <div className="flex items-center gap-1 text-gray-700 text-sm font-semibold">
            <IoLocationOutline  className="text-gray-600 text-xl"/>
            <span className="text-xs">
            تهران، خیابان ولیعصر

            </span>
          </div>
        </div>

        {/* بخش ششم: درآمد امروز */}
        <div className="flex items-center justify-center gap-4 w-full md:w-auto py-4 md:py-0 md:px-4">
             <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
            <LuWallet/>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-gray-400 text-xs">درآمد امروز</span>

            <span className="text-gray-800 font-bold text-xs">
              ۱,۲۴۵,۰۰۰ تومان
            </span>
          </div>
         
        </div>

        {/* بخش هفتم: موجودی فعلی */}
        <div className="flex items-center justify-center gap-4 w-full md:w-auto pt-4 md:pt-0 md:pr-6">
            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-500">
            <FiBox />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-400 text-xs">موجودی فعلی</span>
            <span className="text-gray-800 font-bold text-xs">۳۱۵ عدد</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default VendingMachineCard;
