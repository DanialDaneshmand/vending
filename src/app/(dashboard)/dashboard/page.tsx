
"use client"
import DeviceStatusChart from "@/components/chart/DeviceStatusChart";
import PageTitle from "@/components/shared/PageTitle";
import RecentAlerts from "@/features/dashboard/components/RecentlyAlerts";
import DeviceSummary from "@/features/dashboard/components/DeviceSummary";
import UseGetProfile from "@/shared/hooks/useGetProfile";

export default function page() {
  const { profile, isgettingprofile } = UseGetProfile();

  return (
    <section className="p-4">
      {/* بخش Page Title با مدیریت لودینگ و اسکلتون */}
      {isgettingprofile ? (
        <div className="mb-8 flex flex-col gap-3 animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-48 bg-gray-100 rounded-md"></div>
        </div>
      ) : (
        <PageTitle 
          title="داشبورد" 
          description={`خوش آمدید ${profile?.full_name}`} 
        />
      )}

      {/* Chart And Recent Alerts Section */}
      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="col-span-12 md:col-span-5">
          <DeviceStatusChart />
        </div>

        <div className="col-span-12 md:col-span-7">
          <RecentAlerts />
        </div>
      </div>

      {/* Devices */}
      <div className="mt-4">
        <div>
          <DeviceSummary />
        </div>
      </div>
    </section>
  );
}