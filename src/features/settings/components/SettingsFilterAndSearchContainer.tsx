import { LuSearch } from "react-icons/lu";

export default function SettingsFilterAndSearchContainer() {
  return (
    <section>
      
      <div className=" grid grid-cols-12 gap-x-4 mb-4">
        <div className="col-span-12 sm:col-span-6">
          <div className="flex items-center mb-4 sm:mb-0 ">
            <input
              type="text"
              placeholder="جستجوی نام، شماره تماس یا نقش..."
              className="w-full bg-white outline-0 border border-gray-100 rounded-md shadow-sm p-2 placeholder:text-sm"
            />
            <span className="-mr-8">
              <LuSearch />
            </span>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <select className=" text-sm bg-white p-2 w-full  rounded-md border border-gray-100 shadow-sm outline-none text-gray-500">
            <option>همه نقش‌ها</option>
          </select>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <select className=" text-sm bg-white p-2 w-full  rounded-md border border-gray-100 shadow-sm outline-none text-gray-500">
            <option>همه وضعیت‌ها</option>
          </select>
        </div>
      </div>
    </section>
  );
}
