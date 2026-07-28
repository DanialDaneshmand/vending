import PageTitle from "@/components/shared/PageTitle";
import LocationManagement from "@/features/places/components/LocationManagementTable";
import PlacesMap from "@/features/places/components/PlacesMap";

export default function page() {
  return (
    <section className="p-4">
      {/* Page Title */}
      <PageTitle title="مکان ها" description="داشبورد / مکان ها" />
      {/* Location Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div >
          <LocationManagement/>
        </div>
        <div>
          <PlacesMap/>
        </div>
      </div>
    </section>
  );
}
