import DashboardHeader from "@/components/dashboard/header";
import DashboardSlider from "@/components/dashboard/slider";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        <div className="w-80 h-full border-r-2 hidden lg:block">
          <DashboardSlider />
        </div>
        <div className="w-full flex flex-col">
          <div className="h-16 border-b-2">
            <DashboardHeader />
          </div>
          <main className="h-full overflow-y-scroll remove-scrollbar">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
