import { useSearchParams } from "react-router-dom";
import AddRow from "./addRow";
import { useAppSelector } from "@/store/store";
import UpdateSignetures from "./updateSign";

const UpdateRow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data: rows } = useAppSelector((state) => state.signetureRow);
  const id = searchParams.get("update");

  return (
    <div className="flex flex-col gap-3">
      <AddRow defaultData={rows.find((data) => data.id == id)} />

      <UpdateSignetures />
    </div>
  );
};
export default UpdateRow;
