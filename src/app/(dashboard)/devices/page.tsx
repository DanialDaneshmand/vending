
"use client";

import React, { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import DevicesCardsSection from "@/features/devices/components/DevicesCardsSection";
import DevicesFilterContainer from "@/features/devices/components/DevicesFilterContainer";
import DeviceManagementTable from "@/features/devices/components/DevicesManagementTable";

export default function DevicesPage() {
  const initialFilters = {
    places: "همه مجموعه ها",
    sections: "همه بخش ها",
    alertType: "وضعیت اتصال ", 
    status: "همه وضعیت ها",
    inventory: "وضعیت موجودی",
    search: "",
  };

  const [filterAndSearchValues, setFilterAndSearchValues] = useState(initialFilters);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilterAndSearchValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilterAndSearchValues(initialFilters);
  };

  return (
    <section className="p-4">
      <PageTitle title="دستگاه ها " description="داشبورد / دستگاه ها" />

      <DevicesFilterContainer
        className="grid grid-cols-12 bg-white gap-6 sm:gap-4 mt-4 p-0 sm:p-4"
        filterValues={filterAndSearchValues}
        handleInputChange={handleInputChange}
        onReset={resetFilters} // ارسال تابع پاکسازی
      />

      <DevicesCardsSection />

      <DeviceManagementTable filters={filterAndSearchValues} />
    </section>
  );
}