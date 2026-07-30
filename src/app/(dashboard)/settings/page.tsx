import PageTitle from "@/components/shared/PageTitle";
import DeviceManager from "@/features/settings/components/DeviceManager";
import SettingsAlert from "@/features/settings/components/SettingAlert";
import SettingsFilterAndSearchContainer from "@/features/settings/components/SettingsFilterAndSearchContainer";

export default function page() {
  return (
    <section className=" p-4">
      {/* Page Title */}
      <PageTitle title="تنظیمات" description="داشبورد / تنظیمات" />
      {/* Alert Container */}
      <SettingsAlert/>
      {/* Search And Filter Container */}
      <SettingsFilterAndSearchContainer/>
      {/* Device Manager */}
      <DeviceManager/>
    </section>
  );
}
