import PageTitle from "@/components/shared/PageTitle";
import DeviceManagementSection from "@/features/control-scheduling/components/DeviceManagementSection";
import DeviceHeaderCard from "@/features/control-scheduling/components/DeviceHeaderCard";

export default function page() {
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="کنترل و زمان بندی" description="داشبورد / کنترل و زمان بندی" />
      {/* Device Header Card */}
      <DeviceHeaderCard/>
      {/* Device Management Section */}
      <DeviceManagementSection/>
    </section>
  );
}
