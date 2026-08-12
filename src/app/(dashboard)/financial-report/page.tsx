"use client"

import PageTitle from "@/components/shared/PageTitle";
import ReportsChartSection from "@/features/fainancial-report/components/ChartsSection";
import FinancialReportTable from "@/features/fainancial-report/components/FainancialReportTable";
import ReportsCardsSection from "@/features/fainancial-report/components/ReportsCardsSection";
import ReportsFilterSection from "@/features/fainancial-report/components/ReportsFilterSection";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";

interface FilterValues {
  fromDate: string;
  toDate: string;
  places: string;
  sections: string;
  startTime: DateObject | "";
  endTime: DateObject | "";
  searchQuery:string
}

export default function page() {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    fromDate: "",
    toDate: "",
    places: "همه مجموعه ها",
    sections: "بخش ها",
    startTime: "",
    endTime: "",
    searchQuery:""
  });

  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="گزارش مالی" description="داشبورد /  گزارش مالی" />
      {/* Reports Filter Section */}
      <ReportsFilterSection filterValues={filterValues} setFilterValues={setFilterValues}/>
      {/*Reports Cards Section  */}
      <ReportsCardsSection />
      {/* Reports Chart Section */}
      <ReportsChartSection />
      {/* Financial Report Table */}
      <FinancialReportTable filterValues={filterValues}/>
    </section>
  );
}
