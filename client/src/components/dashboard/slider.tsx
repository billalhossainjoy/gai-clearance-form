import { useLocation, useNavigate } from "react-router-dom";
import { sliderItem } from "./constants";
import gaiLogo from "/gai.jpg";
import { cn } from "@/lib/utils";

const DashboardSlider: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="bg-secondary h-full ">
      <div className=" text-primary flex items-center text-2xl gap-2  h-16 px-4  border-b-2 border-gray-200 ">
        <img className="w-10 " src={gaiLogo} alt="" />
        <h1 className="font-bold text-gray-800 flex">
          Dash <span className="">board</span>
        </h1>
      </div>
      <ul>
        {sliderItem.map((item) => (
          <li
            key={item.path}
            className={cn(
              "m-4 p-4 bg-gray-200 rounded hover:bg-gray-300 transition-all duration-300 cursor-pointer",
              {
                "bg-primary text-white hover:text-black font-bold": pathname === item.path,
              }
            )}
            onClick={() => navigate(item.path)}
          >
            <span className="text-sm font-semibold">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DashboardSlider;
