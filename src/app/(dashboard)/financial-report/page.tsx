"use client";

import PageTitle from "@/components/shared/PageTitle";
import ReportsChartSection from "@/features/fainancial-report/components/ChartsSection";
import FinancialReportTable from "@/features/fainancial-report/components/FainancialReportTable";
import ReportsCardsSection from "@/features/fainancial-report/components/ReportsCardsSection";
import ReportsFilterSection from "@/features/fainancial-report/components/ReportsFilterSection";
import { useFilteredData } from "@/features/fainancial-report/hooks/useFilteredData";
import { prepareChartData } from "@/features/fainancial-report/utils/prepareChartData";
import { prepareTrendData } from "@/features/fainancial-report/utils/prepareTrendData";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";

interface FilterValues {
  fromDate: string;
  toDate: string;
  places: string;
  sections: string;
  startTime: DateObject | "";
  endTime: DateObject | "";
  searchQuery: string;
}

const data = [
  // --- پاساژ کوروش (۳ تراکنش) ---
  {
    id: 1,
    date: "1405/05/20",
    time: "10:20",
    location: "پاساژ کوروش",
    sectionName: "راهرو ورودی",
    deviceName: "دستگاه ۱",
    deviceId: "ck-01",
    devices: 12,
    games: 890,
    income: "۳,۵۸۰,۰۰۰",
  },
  {
    id: 2,
    date: "1405/05/21",
    time: "11:00",
    location: "پاساژ کوروش",
    sectionName: "طبقه اول",
    deviceName: "دستگاه ۲",
    deviceId: "ck-02",
    devices: 5,
    games: 400,
    income: "۲,۱۰۰,۰۰۰",
  },
  {
    id: 3,
    date: "1405/05/22",
    time: "12:15",
    location: "پاساژ کوروش",
    sectionName: "راهرو ورودی",
    deviceName: "دستگاه ۱",
    deviceId: "ck-01",
    devices: 12,
    games: 300,
    income: "۱,۲۰۰,۰۰۰",
  },

  // --- ایران مال (۵ تراکنش) ---
  {
    id: 4,
    date: "1405/05/22",
    time: "18:30",
    location: "ایران مال",
    sectionName: "شهربازی",
    deviceName: "سیمولاتور",
    deviceId: "im-01",
    devices: 8,
    games: 420,
    income: "۵,۱۰۰,۰۰۰",
  },
  {
    id: 5,
    date: "1405/05/23",
    time: "09:00",
    location: "ایران مال",
    sectionName: "طبقه دوم",
    deviceName: "دستگاه VR",
    deviceId: "im-02",
    devices: 4,
    games: 150,
    income: "۲,۳۰۰,۰۰۰",
  },
  {
    id: 6,
    date: "1405/05/24",
    time: "14:00",
    location: "ایران مال",
    sectionName: "شهربازی",
    deviceName: "سیمولاتور",
    deviceId: "im-01",
    devices: 8,
    games: 200,
    income: "۳,۱۰۰,۰۰۰",
  },
  {
    id: 7,
    date: "1405/05/25",
    time: "16:30",
    location: "ایران مال",
    sectionName: "راهرو ورودی",
    deviceName: "دستگاه ۱",
    deviceId: "im-03",
    devices: 10,
    games: 600,
    income: "۴,۰۰۰,۰۰۰",
  },
  {
    id: 8,
    date: "1405/05/26",
    time: "19:00",
    location: "ایران مال",
    sectionName: "طبقه دوم",
    deviceName: "دستگاه VR",
    deviceId: "im-02",
    devices: 4,
    games: 100,
    income: "۱,۸۰۰,۰۰۰",
  },

  // --- مجتمع تیراژه (۲ تراکنش) ---
  {
    id: 9,
    date: "1405/05/21",
    time: "14:45",
    location: "مجتمع تیراژه",
    sectionName: "طبقه دوم",
    deviceName: "دستگاه VR",
    deviceId: "tr-01",
    devices: 4,
    games: 150,
    income: "۱,۲۰۰,۰۰۰",
  },
  {
    id: 10,
    date: "1405/05/22",
    time: "10:00",
    location: "مجتمع تیراژه",
    sectionName: "طبقه اول",
    deviceName: "بسکتبال",
    deviceId: "tr-02",
    devices: 2,
    games: 80,
    income: "۸۰۰,۰۰۰",
  },

  // --- پالادیوم (۴ تراکنش) ---
  {
    id: 11,
    date: "1405/06/01",
    time: "21:15",
    location: "پالادیوم",
    sectionName: "فودکورت",
    deviceName: "دستگاه چنگک",
    deviceId: "pl-01",
    devices: 2,
    games: 600,
    income: "۲,۴۵۰,۰۰۰",
  },
  {
    id: 12,
    date: "1405/06/02",
    time: "11:00",
    location: "پالادیوم",
    sectionName: "طبقه سوم",
    deviceName: "دستگاه ۱",
    deviceId: "pl-02",
    devices: 1,
    games: 120,
    income: "۹۰۰,۰۰۰",
  },
  {
    id: 13,
    date: "1405/06/03",
    time: "13:00",
    location: "پالادیوم",
    sectionName: "فودکورت",
    deviceName: "دستگاه چنگک",
    deviceId: "pl-01",
    devices: 2,
    games: 200,
    income: "۱,۱۰۰,۰۰۰",
  },
  {
    id: 14,
    date: "1405/06/04",
    time: "17:00",
    location: "پالادیوم",
    sectionName: "راهرو",
    deviceName: "دستگاه ۲",
    deviceId: "pl-03",
    devices: 1,
    games: 150,
    income: "۷۰۰,۰۰۰",
  },
];


export default function page() {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    fromDate: "",
    toDate: "",
    places: "همه مجموعه ها",
    sections: "بخش ها",
    startTime: "",
    endTime: "",
    searchQuery: "",
  });

  const formattedFilters = {
    ...filterValues,
    startTime: filterValues.startTime
      ? filterValues.startTime.format("HH:mm")
      : "",
    endTime: filterValues.endTime ? filterValues.endTime.format("HH:mm") : "",
  };

  // ۱. اول داده‌ها را فیلتر می‌کنیم
  const filteredData = useFilteredData(data, formattedFilters);

  const incomeLocationData=prepareChartData(filteredData);
  const trendIncomeData = prepareTrendData(filteredData);
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="گزارش مالی" description="داشبورد /  گزارش مالی" />
      {/* Reports Filter Section */}
      <ReportsFilterSection
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
      {/*Reports Cards Section  */}
      <ReportsCardsSection />
      {/* Reports Chart Section */}
      <ReportsChartSection incomeLocationData={incomeLocationData} incomeTrendData={trendIncomeData}/>
      {/* Financial Report Table */}
      <FinancialReportTable filteredData={filteredData} />
    </section>
  );
}
