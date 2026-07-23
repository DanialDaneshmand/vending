import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <section className=" grid grid-cols-12">
      <div className=" col-span-2">
        <Sidebar />
      </div>
      <div className=" col-span-10 ">
        <Header />
        <main>{children}</main>
      </div>
    </section>
  );
}
