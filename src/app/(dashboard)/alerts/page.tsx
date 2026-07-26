"use client";

import FilterContainer from "@/components/shared/FilterContainer";
import PageTitle from "@/components/shared/PageTitle";
import AlertList from "@/features/alerts/components/AlertList";
import AlertStats from "@/features/alerts/components/AlertsStatus";
import RecentReports from "@/features/alerts/components/RecentReports";
import { useState } from "react";

interface ChangeHandlerEvent {
  target: {
    name: string;
    value: string;
  };
}

const optionsMap = {
  places: { title: "مکان", options: ["همه وضعیت ها", "فعال", "غیر فعال"] },
  alertType: { title: "نوع هشدار", options: ["شهر ها", "تهران", "مشهد"] },
  status: { title: "وضعیت", options: ["شهر ها", "تهران", "مشهد"] },
  intensity: { title: "شدت", options: ["شهر ها", "تهران", "مشهد"] },
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

  //   const filteredUsers = useMemo(() => {
  //     return users.filter((user) => {
  //       const matchesSearch = user.name.includes(filterAndSearchValues.search);

  //       const matchesStatus =
  //         filterAndSearchValues.status === "همه وضعیت ها" ||
  //         user.statusText.trim() === filterAndSearchValues.status.trim();

  //       const matchesCity =
  //         filterAndSearchValues.city === "شهر ها" ||
  //         user.city.trim() === filterAndSearchValues.city.trim();

  //       const userDate = new DateObject({
  //         date: user.registerDate,
  //         format: "YYYY/MM/DD",
  //         calendar: persian,
  //         locale: persian_fa,
  //       });

  //       const fromDate = filterAndSearchValues.fromDate
  //         ? new DateObject({
  //             date: filterAndSearchValues.fromDate,
  //             format: "YYYY/MM/DD",
  //             calendar: persian,
  //             locale: persian_fa,
  //           })
  //         : null;

  //       const toDate = filterAndSearchValues.toDate
  //         ? new DateObject({
  //             date: filterAndSearchValues.toDate,
  //             format: "YYYY/MM/DD",
  //             calendar: persian,
  //             locale: persian_fa,
  //           })
  //         : null;

  //       const matchesDate =
  //         (!fromDate || userDate.valueOf() >= fromDate.valueOf()) &&
  //         (!toDate || userDate.valueOf() <= toDate.valueOf());

  //       return matchesSearch && matchesStatus && matchesCity && matchesDate;
  //     });
  //   }, [filterAndSearchValues]);
  return (
    <section className=" p-4">
      {/* Page Title */}
      <PageTitle title="هشدار ها" description="داشبورد / هشدارها" />
      {/* Filter Container */}
      <FilterContainer
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        className="grid xl:grid-cols-5 gap-4 py-4 grid-cols-2 "
        optionsMap={optionsMap}
      />
      {/* Alert Status Cards */}
      <AlertStats />
      {/* Recent Reports */}
      <div className="grid grid-cols-12 pt-4 gap-x-4">
        <div className="col-span-12 xl:col-span-3">
          <RecentReports />
        </div>
        <div className="col-span-12 xl:col-span-9">
          <AlertList/>
        </div>
      </div>
    </section>
  );
}
