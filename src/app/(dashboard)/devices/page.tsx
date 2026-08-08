"use client";

import PageTitle from "@/components/shared/PageTitle";
import DevicesCardsSection from "@/features/devices/components/DevicesCardsSection";
import DevicesFilterContainer from "@/features/devices/components/DevicesFilterContainer";
import DeviceManagementTable from "@/features/devices/components/DevicesManagementTable";
import { useState } from "react";

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

const optionsMap = {
  places: {
    title: "مجموعه ها",
    options: ["همه مجموعه ها", "فعال", "غیر فعال"],
  },
  sections: { title: "بخش ها", options: ["همه بخش ها", "فعال", "غیر فعال"] },
  alertType: {
    title: "وضعیت اتصال",
    options: ["وضعیت اتصال ", "تهران", "مشهد"],
  },
  status: {
    title: "وضعیت دستگاه ",
    options: ["همه وضعیت ها", "تهران", "مشهد"],
  },
  inventory: {
    title: "وضعیت موجودی ",
    options: ["وضعیت موجودی", "تهران", "مشهد"],
  },
};

export default function page() {
  const [filterAndSearchValues, setFilterAndSearchValues] = useState({
    places: "همه مجموعه ها",
    sections: "همه بخش ها",
    alertType: "همه انواع",
    status: "همه وضعیت ها",
    inventory: "وضعیت موجودی",
    search: "",
  });

  console.log(filterAndSearchValues);

  const handleInputChange = (e: ChangeHandlerEvent) => {
    setFilterAndSearchValues({
      ...filterAndSearchValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="دستگاه ها " description="داشبورد / دستگاه ها" />
      {/* Devices Filter Container */}
      <DevicesFilterContainer
        className="grid grid-cols-12 bg-white gap-6 sm:gap-4 mt-4 p-0 sm:p-4"
        filterValues={filterAndSearchValues}
        handleInputChange={handleInputChange}
        optionsMap={optionsMap}
      />
      {/* Devices Cards Section */}
      <DevicesCardsSection />
      {/* Device Management Table */}
      <DeviceManagementTable />
    </section>
  );
}
