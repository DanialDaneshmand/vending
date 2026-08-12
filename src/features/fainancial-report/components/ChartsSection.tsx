import IncomeLocationChart from "@/components/chart/IncomeLocationCharts";
import IncomeTrendChart from "@/components/chart/IncomeTrendChart";

export default function ReportsChartSection() {
  return (
    <section className=" grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4">
      <div>
        <IncomeLocationChart />
      </div>
      <div>
        <IncomeTrendChart />
      </div>
    </section>
  );
}
