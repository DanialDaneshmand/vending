
"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  name: string;
};

type Group = {
  id: string;
  name: string;
  sections: Section[];
};

type SelectedGroup = {
  groupId: string;
  groupName: string;
  sections: Section[];
};

interface UserType {
  id: number;
  name: string;
  role: string;
  rColor: string;
  phone: string;
  status: string;
  sColor: string;
  date: string;
  time: string;
}

const groupsData: Group[] = [
  {
    id: "g1",
    name: "مجموعه اول",
    sections: [
      { id: "s1", name: "بخش ۱" },
      { id: "s2", name: "بخش ۲" },
      { id: "s3", name: "بخش ۳" },
    ],
  },
  {
    id: "g2",
    name: "مجموعه دوم",
    sections: [
      { id: "s4", name: "بخش ۴" },
      { id: "s5", name: "بخش ۵" },
    ],
  },
  {
    id: "g3",
    name: "مجموعه سوم",
    sections: [
      { id: "s6", name: "بخش ۶" },
      { id: "s7", name: "بخش ۷" },
      { id: "s8", name: "بخش ۸" },
    ],
  },
];

const users = [
  { id: 1, name: "علی محمدی", role: "مدیر کل", rColor: "bg-[#F5F3FF] text-[#7C3AED]", phone: "0912 345 6789", status: "فعال", sColor: "bg-[#E8F8F0] text-[#10B981]", date: "۱۴۰۳/۰۶/۲۴", time: "۱۰:۱۵" },
  { id: 2, name: "سارا نوری", role: "مدیر مجموعه", rColor: "bg-[#FDF2F8] text-[#DB2777]", phone: "0901 234 5678", status: "فعال", sColor: "bg-[#E8F8F0] text-[#10B981]", date: "۱۴۰۳/۰۶/۲۴", time: "۰۹:۴۰" },
  { id: 3, name: "مهدی رضایی", role: "اپراتور", rColor: "bg-[#EFF6FF] text-[#2563EB]", phone: "0915 678 9012", status: "فعال", sColor: "bg-[#E8F8F0] text-[#10B981]", date: "۱۴۰۳/۰۶/۲۴", time: "۰۸:۵۵" },
  { id: 4, name: "نرگس احمدی", role: "اپراتور", rColor: "bg-[#EFF6FF] text-[#2563EB]", phone: "0930 111 2222", status: "فعال", sColor: "bg-[#E8F8F0] text-[#10B981]", date: "۱۴۰۳/۰۶/۲۳", time: "۱۸:۳۰" },
  { id: 5, name: "حسین کریمی", role: "مدیر مجموعه", rColor: "bg-[#F1F5F9] text-[#64748B]", phone: "0918 765 4321", status: "غیرفعال", sColor: "bg-[#FEF2F2] text-[#EF4444]", date: "۱۴۰۳/۰۶/۲۲", time: "۱۶:۱۰" },
  { id: 6, name: "زهرا عبداللهی", role: "اپراتور", rColor: "bg-[#EFF6FF] text-[#2563EB]", phone: "0912 222 3333", status: "فعال", sColor: "bg-[#E8F8F0] text-[#10B981]", date: "۱۴۰۳/۰۶/۲۲", time: "۱۱:۲۵" },
  { id: 7, name: "امیرحسین سلطانی", role: "اپراتور", rColor: "bg-[#F1F5F9] text-[#64748B]", phone: "0903 888 9999", status: "غیرفعال", sColor: "bg-[#FEF2F2] text-[#EF4444]", date: "۱۴۰۳/۰۶/۲۱", time: "۱۳:۴۵" },
];

export default function GroupSectionPicker() {
  const { userId } = useParams();

  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([
    { 
      groupId: groupsData[0].id, 
      groupName: groupsData[0].name, 
      sections: [] 
    }
  ]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(groupsData[0].id);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const foundUser = users.find((item) => item.id === Number(userId));
    setUser(foundUser || null);
  }, [userId]);
  

  const selectedGroupIds = useMemo(
    () => selectedGroups.map((item) => item.groupId),
    [selectedGroups]
  );

  const activeGroup = useMemo(
    () => selectedGroups.find((item) => item.groupId === activeGroupId) ?? null,
    [selectedGroups, activeGroupId]
  );

  useEffect(() => {
    if (selectedGroups.length === 0) {
      setActiveGroupId(null);
      return;
    }
    const stillExists = selectedGroups.some((item) => item.groupId === activeGroupId);
    if (!stillExists && activeGroupId === null) {
      setActiveGroupId(selectedGroups[0].groupId);
    }
  }, [selectedGroups, activeGroupId]);

  const toggleGroup = (group: Group) => {
    const isSelected = selectedGroups.some((item) => item.groupId === group.id);
    if (isSelected) {
      setSelectedGroups((prev) => prev.filter((item) => item.groupId !== group.id));
    } else {
      setSelectedGroups((prev) => [
        ...prev,
        { groupId: group.id, groupName: group.name, sections: [] },
      ]);
      if (!activeGroupId) setActiveGroupId(group.id);
    }
  };

  const toggleSection = (groupId: string, section: Section) => {
    setSelectedGroups((prev) =>
      prev.map((group) => {
        if (group.groupId !== groupId) return group;
        const exists = group.sections.some((item) => item.id === section.id);
        return {
          ...group,
          sections: exists 
            ? group.sections.filter((item) => item.id !== section.id) 
            : [...group.sections, section],
        };
      })
    );
  };

  const activeGroupFullData = useMemo(() => {
    return groupsData.find((g) => g.id === activeGroupId) ?? null;
  }, [activeGroupId]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* پنل راست: لیست مجموعه‌ها */}
      {user?.role === "مدیر کل" && (
        <div className="rounded-lg border border-gray-100 p-4 shadow-sm bg-white">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">انتخاب مجموعه‌ها</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">می‌توانید چند مجموعه را هم‌زمان انتخاب کنید.</p>
          </div>
          <div className="space-y-3">
            {groupsData.map((group) => (
              <label key={group.id} className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-white">{group.name}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{group.sections.length} بخش</span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedGroupIds.includes(group.id)}
                  onChange={() => toggleGroup(group)}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* پنل چپ: انتخاب بخش‌ها */}
      <div className="rounded-lg border border-gray-100 p-4 shadow-sm bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">انتخاب بخش‌ها</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">فقط بخش‌های مربوط به مجموعه‌های انتخاب‌شده نمایش داده می‌شوند.</p>
        </div>

        {selectedGroups.length === 0 ? (

          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 text-center">
            هنوز هیچ مجموعه‌ای انتخاب نشده است.
          </div>
        ) : (
          <div className="space-y-4">
            {/* تب مجموعه‌های انتخاب شده */}
            <div className="flex flex-wrap gap-2">
              {selectedGroups.map((group) => (
                <button
                  key={group.groupId}
                  type="button"
                  onClick={() => setActiveGroupId(group.groupId)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeGroupId === group.groupId 
                      ? "bg-blue-600 text-white" 
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {group.groupName}
                </button>
              ))}
            </div>

            {/* لیست بخش‌های گروه فعال */}
            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                {activeGroup?.groupName ?? "انتخاب کنید"}
              </h3>
              <div className="space-y-2">
                {activeGroupFullData?.sections.map((section) => {
                  const isChecked = activeGroup?.sections.some((s) => s.id === section.id);
                  return (
                    <label key={section.id} className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-800">
                      <span className="text-zinc-900 dark:text-white">{section.name}</span>
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => activeGroupId && toggleSection(activeGroupId, section)}
                        className="h-5 w-5 accent-blue-600"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}