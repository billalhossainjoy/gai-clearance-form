import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import gaiLogo from "/gai.jpg";
import { useAppDispatch } from "@/store/store";
import { logoutAdmin, resetAuth } from "@/store/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload.message === "Logged out") {
        dispatch(resetAuth());
        navigate("/auth");
      }
    });
  };

  return (
    <div className="h-full">
      <div className="h-full flex">
        <div className="block lg:hidden">
          <div className=" text-primary flex items-center text-2xl gap-2  h-16 px-4  border-b-2 border-gray-200 ">
            <span className="border rounded p-2 bg-secondary cursor-pointer">
              <Menu className="text-black p-0 m-0" />{" "}
            </span>
            <img className="w-10 " src={gaiLogo} alt="" />
            <h1 className="font-bold text-gray-800 flex">
              Dash <span className="">board</span>
            </h1>
          </div>
        </div>
        <div className="w-full flex justify-end container items-center h-full px-4">
          <Button onClick={() => logoutHandler()}>
            <LogOut /> logout
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
