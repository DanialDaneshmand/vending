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
  places: { title: "مکان", options: ["همه وضعیت ها", "فعال", "غیر فعال"] },
  alertType: { title: "وضعیت اتصال", options: ["شهر ها", "تهران", "مشهد"] },
  status: { title: "وضعیت دستگاه ", options: ["شهر ها", "تهران", "مشهد"] },
};

export default function page() {
  const [filterValues, setFilterValues] = useState({
    places: "همه مکان ها",
    alertType: "همه انواع",
    status: "همه وضعیت ها",
    intensity: "همه شدت ها",
  });

  const handleInputChange = (e: ChangeHandlerEvent) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="دستگاه ها " description="داشبورد / دستگاه ها" />
      {/* Devices Filter Container */}
      <DevicesFilterContainer
        className="grid grid-cols-12 bg-white lg:grid-cols-9 xl:grid-cols-11 gap-6 sm:gap-4 mt-4 border border-gray-100 shadow-sm p-4 rounded-lg"
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        optionsMap={optionsMap}
      />
      {/* Devices Cards Section */}
      <DevicesCardsSection />
      {/* Device Management Table */}
      <DeviceManagementTable/>
    </section>
  );
}
