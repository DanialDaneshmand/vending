
import CommandHistory from "./CommandHistory";
import SettingsHistory from "./SettingHistory";

import WeeklySchedule from "./WeeklySchedule";





export default function SchedulingHistorySection() {
  return (
    <div className="w-full grid grid-cols-12 gap-x-4 mt-4">
      <div className="col-span-12 xl:col-span-5">
        <CommandHistory />
      </div>
      <div className="col-span-12 mt-4 xl:mt-0 sm:col-span-5 xl:col-span-3">
        <SettingsHistory />
      </div>
      <div className="col-span-12 mt-4 xl:mt-0 sm:col-span-7 xl:col-span-4">
        <WeeklySchedule />
      </div>
    </div>
  );
}
