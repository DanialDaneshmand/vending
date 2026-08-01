import PageTitle from "@/components/shared/PageTitle";
import ReportsChartSection from "@/features/reports/components/ChartsSection";
import FinancialReportTable from "@/features/reports/components/FainancialReportTable";
import ReportsCardsSection from "@/features/reports/components/ReportsCardsSection";
import ReportsFilterSection from "@/features/reports/components/ReportsFilterSection";

export default function page() {
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="گزارش مالی" description="داشبورد /  گزارش مالی" />
      {/* Reports Filter Section */}
      <ReportsFilterSection />
      {/*Reports Cards Section  */}
      <ReportsCardsSection />
      {/* Reports Chart Section */}
      <ReportsChartSection />
      {/* Financial Report Table */}
      <FinancialReportTable />
    </section>
  );
}
