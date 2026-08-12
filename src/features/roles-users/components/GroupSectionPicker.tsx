"use client";

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

export default function GroupSectionPicker() {
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

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

    const stillExists = selectedGroups.some(
      (item) => item.groupId === activeGroupId
    );

    if (!stillExists) {
      setActiveGroupId(selectedGroups[0].groupId);
    }
  }, [selectedGroups, activeGroupId]);

  const toggleGroup = (group: Group) => {
    const isSelected = selectedGroups.some((item) => item.groupId === group.id);

    if (isSelected) {
      setSelectedGroups((prev) =>
        prev.filter((item) => item.groupId !== group.id)
      );
      return;
    }

    setSelectedGroups((prev) => [
      ...prev,
      {
        groupId: group.id,
        groupName: group.name,
        sections: [],
      },
    ]);

    if (!activeGroupId) {
      setActiveGroupId(group.id);
    }
  };

  const toggleSection = (groupId: string, section: Section) => {
    setSelectedGroups((prev) =>
      prev.map((group) => {
        if (group.groupId !== groupId) return group;

        const exists = group.sections.some((item) => item.id === section.id);

        if (exists) {
          return {
            ...group,
            sections: group.sections.filter((item) => item.id !== section.id),
          };
        }

        return {
          ...group,
          sections: [...group.sections, section],
        };
      })
    );
  };

  const getOriginalGroupById = (groupId: string) => {
    return groupsData.find((group) => group.id === groupId) ?? null;
  };

  const activeGroupFullData = activeGroupId
    ? getOriginalGroupById(activeGroupId)
    : null;

  return (
    <div className="grid grid-cols-1 gap-4     md:grid-cols-2 ">
      {/* پنل راست: لیست مجموعه‌ها */}
      <div className=" rounded-lg border border-gray-100 p-4 shadow-sm bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            انتخاب مجموعه‌ها
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            می‌توانید چند مجموعه را هم‌زمان انتخاب کنید.
          </p>
        </div>

        <div className="space-y-3">
          {groupsData.map((group) => {
            const checked = selectedGroupIds.includes(group.id);

            return (
              <label
                key={group.id}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {group.name}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {group.sections.length} بخش
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleGroup(group)}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* پنل چپ: مجموعه‌های انتخاب‌شده و بخش‌ها */}
      <div className="rounded-lg border border-gray-100 p-4  shadow-sm bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            انتخاب بخش‌ها
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            فقط بخش‌های مربوط به مجموعه‌های انتخاب‌شده نمایش داده می‌شوند.
          </p>
        </div>

        {selectedGroups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            هنوز هیچ مجموعه‌ای انتخاب نشده است.
          </div>
        ) : (
          <div className="space-y-4">
            {/* تب مجموعه‌های انتخاب‌شده */}
            <div className="flex flex-wrap gap-2">
              {selectedGroups.map((group) => {
                const isActive = activeGroupId === group.groupId;

                return (
                  <button
                    key={group.groupId}
                    type="button"
                    onClick={() => setActiveGroupId(group.groupId)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {group.groupName}
                  </button>
                );
              })}
            </div>

            {/* لیست بخش‌های مجموعه فعال */}
            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                {activeGroup?.groupName ?? "بدون انتخاب"}
              </h3>

              <div className="space-y-3">
                {activeGroupFullData?.sections.map((section) => {
                  const isChecked =
                    activeGroup?.sections.some((item) => item.id === section.id) ??
                    false;

                  return (
                    <label
                      key={section.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      <span className="text-zinc-900 dark:text-white">
                        {section.name}
                      </span>

                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          activeGroupId && toggleSection(activeGroupId, section)
                        }
                        className="h-5 w-5 accent-green-600"
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
