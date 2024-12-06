import LoginForm from "@/components/auth/form/login";
import gaiLogo from "/gai.jpg";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-screen w-full">
      <div>
        <div className="container mx-auto px-4 border-b py-2 flex justify-between items-center">
          <div className="w-10 text-primary text-green-500 flex items-center text-2xl gap-2">
            <img className="w-full" src={gaiLogo} alt="" />
            <h1 className="font-bold text-gray-800 flex">
              Dash <span className="text-primary">board</span>
            </h1>
          </div>
          <div
            className="flex text-primary gap-1 items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <LogOut className="w-6 " />
            <span className="text-lg font-bold"> Exit</span>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full justify-center items-center">
        <div>
          <div className="max-w-[700px] w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
