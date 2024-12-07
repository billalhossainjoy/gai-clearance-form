import { useAppSelector } from "@/store/store";
import Div from "../common/customDiv";
import SignUploader from "./SignUploader";
import { Loader } from "lucide-react";

const UpdateSignetures: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.signeture);
  return (
    <Div>
      <h1 className="text-xl font-semibold text-foreground ">
        Add or update signetures
      </h1>

      {isLoading && (
        <div className="h-20 w-full flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <SignUploader index={i + 1} />
        ))}
      </div>
    </Div>
  );
};
export default UpdateSignetures;
