import Client from "@/components/client/clearanceForm/Client";
import collageImg from "/collage.png";

const ClientLayout: React.FC = () => {
  return (
    <div className="min-h-screen h-full w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className=" flex w-full h-full justify-center items-center">
          <div className="flex h-full justify-center items-center w-full mx-10">
            <Client />
          </div>
        </div>
        <div className=" h-screen w-full hidden lg:block">
          <img
            src={collageImg}
            alt=""
            className="relative object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
export default ClientLayout;
