import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface Props{
	id: string
	role: string
}

const DeleteAction: React.FC<Props> = ({id,role}) => {

      const navigate = useNavigate();
  return (
    <div>
      <Button
        variant={"destructive"}
        onClick={() => navigate(`/admin/account?delete=${id}&role=${role}`)}
      >
        Delete
      </Button>
    </div>
  );
}
export default DeleteAction