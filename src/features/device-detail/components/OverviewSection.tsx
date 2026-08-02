import { Dispatch, SetStateAction } from "react";
import { TabsType } from "../Types";
import DeviceStatusCard from "./DeviceStatusCard";
import EventsCard from "./EventCard";
import KeyMetrics from "./KeyMetrics";
import PaymentDetail from "./PaymentsDetail";
import RecentActivitiesTable from "./RecentActivitiesTable";
import GameTab from "./GameTab";
import InventoryTab from "./InventoryTab";
import RepairsTab from "./RepairsTab";

interface OverviewSectionProps {
  activeTab: TabsType;
  setActiveTab: Dispatch<SetStateAction<TabsType>>;
}

export default function OverviewSection({
  activeTab,
  setActiveTab,
}: OverviewSectionProps) {
  console.log(activeTab);
  const renderTabs = () => {
    switch (activeTab) {
      case "payments":
        return (
          <PaymentDetail activeTab={activeTab} setActiveTab={setActiveTab} />
        );
      case "games":
        return <GameTab />;
      case "inventory":
        return <InventoryTab />;
      case "events":
        return <div className="pt-4 grid grid-cols-1 md:grid-cols-2">
          <EventsCard activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>;
      case "repairs": return <RepairsTab/>
      default:
        return null;
    }
  };
  return (
    <section>
      {activeTab === "overview" && (
        <section className="grid grid-cols-12 gap-4  pt-4">
          <div className="col-span-12 xl:col-span-5">
            <KeyMetrics />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <EventsCard activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <DeviceStatusCard />
          </div>
          <div className="col-span-12">
            <RecentActivitiesTable
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </section>
      )}
      <div>{renderTabs()}</div>
    </section>
  );
}
