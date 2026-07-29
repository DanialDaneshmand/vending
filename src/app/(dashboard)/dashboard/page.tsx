import DeviceStatusChart from "@/components/chart/DeviceStatusChart";
import WeeklySalesChart from "@/components/chart/WeeklySalesChart";
import MapComponent from "@/components/map/Map";
import PageTitle from "@/components/shared/PageTitle";
import DashboardCards from "@/features/dashboard/components/DashboardCards";
import RecentAlerts from "@/features/dashboard/components/RecentlyAlerts";
import DeviceSummary from "@/features/dashboard/components/DeviceSummary";

export default function page() {
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="داشبورد" description="خوش امدید علی محمدی" />
      {/* Dashboard Cards */}
      <DashboardCards />
      {/* Charts Section */}
      <div className=" grid grid-cols-12 gap-4">
        <div className=" col-span-12 md:col-span-5">
          <DeviceStatusChart />
        </div>

        <div className="col-span-12 md:col-span-7">
          <WeeklySalesChart />
        </div>
      </div>
      {/* Map And Recent Alerts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        <div>
          <RecentAlerts />
        </div>
        <div className="">
          <MapComponent />
        </div>
      </div>
      {/* Devices */}
      <div>
        <div >
          <DeviceSummary />
        </div>
      </div>
    </section>
  );
}
