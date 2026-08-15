"use client";

import StyledPagination from "@/components/ui/Pagination";
import React, { useId, useMemo, useState } from "react";
import { FaEye, FaPlus } from "react-icons/fa6";
import { LuPencilLine, LuSearch } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const users = [
  {
    id: 1,
    name: "علی محمدی",
    role: "مدیر کل",
    rColor: "bg-[#F5F3FF] text-[#7C3AED]",
    phone: "0912 345 6789",
    status: "فعال",
    sColor: "bg-[#E8F8F0] text-[#10B981]",
    date: "۱۴۰۳/۰۶/۲۴",
    time: "۱۰:۱۵",
  },
  {
    id: 2,
    name: "سارا نوری",
    role: "مدیر مجموعه",
    rColor: "bg-[#FDF2F8] text-[#DB2777]",
    phone: "0901 234 5678",
    status: "فعال",
    sColor: "bg-[#E8F8F0] text-[#10B981]",
    date: "۱۴۰۳/۰۶/۲۴",
    time: "۰۹:۴۰",
  },
  {
    id: 3,
    name: "مهدی رضایی",
    role: "اپراتور",
    rColor: "bg-[#EFF6FF] text-[#2563EB]",
    phone: "0915 678 9012",
    status: "فعال",
    sColor: "bg-[#E8F8F0] text-[#10B981]",
    date: "۱۴۰۳/۰۶/۲۴",
    time: "۰۸:۵۵",
  },
  {
    id: 4,
    name: "نرگس احمدی",
    role: "اپراتور",
    rColor: "bg-[#EFF6FF] text-[#2563EB]",
    phone: "0930 111 2222",
    status: "فعال",
    sColor: "bg-[#E8F8F0] text-[#10B981]",
    date: "۱۴۰۳/۰۶/۲۳",
    time: "۱۸:۳۰",
  },
  {
    id: 5,
    name: "حسین کریمی",
    role: "مدیر مجموعه",
    rColor: "bg-[#F1F5F9] text-[#64748B]",
    phone: "0918 765 4321",
    status: "غیرفعال",
    sColor: "bg-[#FEF2F2] text-[#EF4444]",
    date: "۱۴۰۳/۰۶/۲۲",
    time: "۱۶:۱۰",
  },
  {
    id: 6,
    name: "زهرا عبداللهی",
    role: "اپراتور",
    rColor: "bg-[#EFF6FF] text-[#2563EB]",
    phone: "0912 222 3333",
    status: "فعال",
    sColor: "bg-[#E8F8F0] text-[#10B981]",
    date: "۱۴۰۳/۰۶/۲۲",
    time: "۱۱:۲۵",
  },
  {
    id: 7,
    name: "امیرحسین سلطانی",
    role: "اپراتور",
    rColor: "bg-[#F1F5F9] text-[#64748B]",
    phone: "0903 888 9999",
    status: "غیرفعال",
    sColor: "bg-[#FEF2F2] text-[#EF4444]",
    date: "۱۴۰۳/۰۶/۲۱",
    time: "۱۳:۴۵",
  },
];

const UserTable = () => {
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [editId,setEditId]=useState<number|undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, users]);

  const totalPages = Math.ceil(users.length / pageSize);
  return (
    <div className="  bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      {/* Header Actions */}
      <div>
        {/* Btns */}
        <div className="flex items-center justify-center sm:justify-start  gap-4 mb-4 ">
          <button
            onClick={() => setIsCreateUser(true)}
            className="flex items-center justify-center gap-2 bg-[#2563EB] text-white px-5 py-2 rounded-sm text-sm font-medium cursor-pointer shadow-sm  transition-all"
          >
            <span>
              <FaPlus />
            </span>
            <span>افزودن کاربر</span>
          </button>
        </div>
        {/* Create User Modal */}
        <CreateUserModal
          onClose={() => setIsCreateUser(false)}
          open={isCreateUser}
        />
        <CreateUserModal
          onClose={() => setEditId(undefined)}
          open={Boolean(editId)}
          editId={editId}
        />
        {/* Edit User Modal */}

        {/* Search And Filter Container */}
        <div className=" grid grid-cols-12 gap-x-4 mb-4">
          <div className="col-span-12 sm:col-span-6">
            <div className="flex items-center mb-4 sm:mb-0 ">
              <input
                type="text"
                placeholder="جستجوی نام، شماره تماس یا نقش..."
                className="w-full outline-0 border border-gray-200 rounded-sm p-2 placeholder:text-sm"
              />
              <span className="-mr-8">
                <LuSearch />
              </span>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <select className=" text-sm p-2 w-full  rounded-sm border border-gray-200 outline-none text-gray-500">
              <option>همه نقش‌ها</option>
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <select className=" text-sm p-2 w-full  rounded-sm border border-gray-200 outline-none text-gray-500">
              <option>همه وضعیت‌ها</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-xl sm:min-w-3xl w-full text-right border-collapse">
          <thead>
            <tr className="text-gray-800 text-sm  border-b border-gray-100">
              <th className="py-2 pr-4 font-bold bg-[#F9FAFC] rounded-tr-lg w-40">
                نام
              </th>
              <th className="py-2 font-bold bg-[#F9FAFC] text-center ml-4">
                نقش
              </th>
              <th className="py-2 font-bold bg-[#F9FAFC] text-center">
                شماره تماس
              </th>
              <th className="py-2 font-bold bg-[#F9FAFC] text-center">
                آخرین ورود
              </th>
              <th className="py-2 font-bold text-center bg-[#F9FAFC] rounded-tl-lg">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((user) => (
              <tr
                key={user.id}
                className="  hover:bg-gray-50 border-b  border-gray-100"
              >
                <td className="py-4 flex items-center gap-x-1 pr-2 w-40 ">
                  <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={`https://i.pravatar.cc/150?u=${user.id}`}
                      alt="profile"
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {user.name}
                  </span>
                </td>
                <td className="py-4  text-center ml-4">
                  <span
                    className={`px-3 py-1 rounded-sm text-xs  font-bold ${user.rColor}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 text-sm text-center text-gray-600 font-mono">
                  {user.phone}
                </td>

                <td className="py-4 text-center">
                  <div className="text-sm text-gray-600">{user.date}</div>
                  <div className="text-xs text-gray-400">{user.time}</div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center gap-x-1 items-center">
                    <Link href={`/roles-users/${user.id}`} className="flex items-center justify-center py-1 gap-x-2  bg-white text-gray-500 hover:text-blue-600 border cursor-pointer border-gray-400 hover:border-blue-600 px-2 rounded-sm text-xs font-medium transition-all">
                      
                      <span>تعریف دسترسی</span>
                    </Link>
                    <button onClick={()=>setEditId(user.id)} className="p-1 text-gray-400 border hover:border-blue-600 border-gray-400 rounded-sm hover:text-blue-600  transition-all ">
                      <LuPencilLine />
                    </button>
                    <button className="p-1 text-gray-400 border hover:border-red-500 border-gray-400 hover:text-red-500  rounded-sm  transition-all ">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Section */}
      <StyledPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default UserTable;
