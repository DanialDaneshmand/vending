import DeviceHeaderCard from "@/features/control-scheduling/components/DeviceHeaderCard";
import DeviceManagementSection from "@/features/control-scheduling/components/DeviceManagementSection";
import SchedulingHistorySection from "@/features/control-scheduling/components/SchedulingHistorySection";

export default function ControlSchedulingTab() {
  return (
    <section className="p-4">
      {/* Device Header Card */}
      <DeviceHeaderCard />
      {/* Device Management Section */}
      <DeviceManagementSection />
      {/* Scheduling History Section */}
      <SchedulingHistorySection />
    </section>
  );
}
