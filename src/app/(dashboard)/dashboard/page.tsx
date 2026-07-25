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
      {/* Chats Section */}
      <div className=" grid grid-cols-12 xl:grid-cols-7 gap-4">
        <div className=" col-span-12 sm:col-span-6 xl:col-span-2">
          <DeviceStatusChart />
        </div>
        <div className=" col-span-12 sm:col-span-6 xl:col-span-2">
          <RecentAlerts />
        </div>
        <div className="col-span-12 xl:col-span-3">
          <WeeklySalesChart />
        </div>
      </div>
      {/* Map And Devices */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <MapComponent />
        </div>
        <div className=" col-span-12 lg:col-span-8">
          <DeviceSummary />
        </div>
      </div>
    </section>
  );
}
