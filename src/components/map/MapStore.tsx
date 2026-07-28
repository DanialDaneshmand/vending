"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LatLngTuple } from "leaflet";
import { usePathname } from "next/navigation";

const center: LatLngTuple = [32.4279, 53.6935];

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// ۱. تعریف دیتای لوکیشن‌ها
const locations = [
  { id: 5, name: "شعبه شیراز", lat: 29.5918, lng: 52.5837 },
  { id: 2, name: "شعبه شمال", lat: 36.6757, lng: 53.1001 }, // مشهد
  { id: 3, name: "شعبه جنوب", lat: 29.6421, lng: 53.62 }, // بندرعباس
];

export default function StoreMap() {
  const pathname=usePathname()
  console.log(pathname);
  
  return (
    <div className={`w-full ${pathname==="/places"?" h-[300] sm:h-[400]":"h-[300]"}  overflow-hidden `}>
      <MapContainer
        center={center}
        zoom={5}
        className={`${pathname==="/places"&&"rounded-lg border border-gray-100 shadow-sm"}`}
        style={{ width: "100%", height: "100%" }}
      >
        {/* لایه بصری نقشه (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* نمایش مارکرها بر اساس دیتای لوکیشن‌ها */}
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div className="text-right font-vazir">
                <strong className="block text-slate-800">{loc.name}</strong>
                <span className="text-xs text-gray-500">
                  برای جزئیات بیشتر کلیک کنید
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
