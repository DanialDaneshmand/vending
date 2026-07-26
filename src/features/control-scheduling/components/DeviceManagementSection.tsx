import DeviceControlCard from "./DeviceControlCard";
import QuickCommandsCard from "./QuickCommandsCard";
import LastCommandCard from "./LastCommandCard";
import OperationalSettingsCard from "./OperationalSettingsCard";

// --- سکشن اصلی (Main Wrapper) ---
export default function DeviceManagementSection() {
  return (
    <div className="w-full mt-4 " dir="rtl">
      <div className=" grid grid-cols-9  gap-x-4">
        <div className="col-span-3">
          <OperationalSettingsCard />
        </div>
        <div className="col-span-2">
          <LastCommandCard />
        </div>
        <div className="col-span-4 grid grid-cols-2 gap-x-4">
          <div>
            <QuickCommandsCard />
          </div>
          <div>
            <DeviceControlCard />
          </div>
        </div>
      </div>
    </div>
  );
}
