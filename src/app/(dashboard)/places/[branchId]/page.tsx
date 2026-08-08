"use client"

import BranchReportsCardsSection from "@/features/branch-detail/copmonents/BranchReportsCardsSection";
import DeviceListSection from "@/features/branch-detail/copmonents/DeviceListSection";
import SectionInfoTable from "@/features/branch-detail/copmonents/SectionInfoTable";
import { useState } from "react";

interface SectionType {
  id: string;
  name: string;
  deviceCount: number;
}

export default function page() {
  const [section, setSection] = useState<SectionType|null>(null);

  return (
    <section className=" p-4">
      {/*Branch Reports Cards Section */}
      <BranchReportsCardsSection />
      <div className=" grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 lg:col-span-6">
          <SectionInfoTable section={section} setSection={setSection}/>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <DeviceListSection section={section} setSection={setSection}/>
        </div>
      </div>
    </section>
  );
}
