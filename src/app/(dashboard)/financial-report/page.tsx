"use client";

import PageTitle from "@/components/shared/PageTitle";
import ReportsChartSection from "@/features/fainancial-report/components/ChartsSection";
import FinancialReportTable from "@/features/fainancial-report/components/FainancialReportTable";
import ReportsCardsSection from "@/features/fainancial-report/components/ReportsCardsSection";
import ReportsFilterSection from "@/features/fainancial-report/components/ReportsFilterSection";
import { useFilteredData } from "@/features/fainancial-report/hooks/useFilteredData";
import { prepareChartData } from "@/features/fainancial-report/utils/prepareChartData";
import { prepareTrendData } from "@/features/fainancial-report/utils/prepareTrendData";
import UseGetAllSection from "@/shared/hooks/useGetAllSections";
import UseGetLocations from "@/shared/hooks/useGetLocations";
import UseGetSections from "@/shared/hooks/useGetSections";
import useGetTransactions from "@/shared/hooks/useGetTransactions";
import { useState, useMemo } from "react";
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

export default function Page() {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    fromDate: "",
    toDate: "",
    places: "all", // <--- تغییر از "همه مجموعه ها" به "all"
    sections: "all", // <--- تغییر از "بخش ها" به "all"
    startTime: "",
    endTime: "",
    searchQuery: "",
  });

  // دریافت تراکنش‌ها و مکان‌ها از API
  const { isgettingTransactions, transactions } = useGetTransactions();
  const { isGettingLocations, locations } = UseGetLocations();

  console.log(filterValues, "filter values");
  console.log(transactions, "transactions");

  // فرمت کردن زمان برای ارسال به هوک فیلتر
  const formattedFilters = useMemo(
    () => ({
      ...filterValues,
      startTime: filterValues.startTime
        ? filterValues.startTime.format("HH:mm")
        : "",
      endTime: filterValues.endTime ? filterValues.endTime.format("HH:mm") : "",
    }),
    [filterValues],
  );

  // ۱. فیلتر کردن داده‌ها (بر اساس دیتای دریافتی از API)
  const filteredData = useFilteredData(
    transactions?.items || [],
    formattedFilters,
  );

  // ۲. آماده‌سازی دیتای نمودارها (با استفاده از useMemo برای بهینه‌سازی سرعت)
  const incomeLocationData = useMemo(() => {
    // پاس دادن لیست مکان‌ها از API به تابع (مطابق با تغییری که در prepareChartData دادیم)
    return prepareChartData(filteredData, locations?.items || []);
  }, [filteredData, locations]);

  const trendIncomeData = useMemo(() => {
    return prepareTrendData(filteredData);
  }, [filteredData]);

  // مدیریت لودینگ: اگر هر دو در حال لود هستند یا دیتا هنوز نرسیده
  if (isgettingTransactions || isGettingLocations) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">
          در حال دریافت گزارشات مالی...
        </p>
      </div>
    );
  }

  return (
    <section className="p-4">
      {/* Page Title */}

      <PageTitle title="گزارش مالی" description="داشبورد / گزارش مالی" />

      {/* Reports Filter Section */}
      <ReportsFilterSection
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        locations={locations.items}
      />

      {/* Reports Cards Section - پیشنهاد: filteredData را به آن پاس دهید تا اعداد داینامیک شوند */}
      <ReportsCardsSection filteredData={filteredData} />

      {/* Reports Chart Section */}
      <ReportsChartSection
        incomeLocationData={incomeLocationData}
        incomeTrendData={trendIncomeData}
      />

      {/* Financial Report Table */}
      <div className="mt-6">
        <FinancialReportTable filteredData={filteredData} />
      </div>
    </section>
  );
}
