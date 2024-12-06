import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

interface Props {
  id: string;
  accept?: boolean;
  update?: boolean;
  deleteAction?: boolean;
}

const StudentActionButton: React.FC<Props> = ({
  id,
  accept,
  update,
  deleteAction,
}) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="flex gap-3">
        {accept && (
          <Button
            className="bg-sky-500"
            onClick={() => setSearchParams({ accept: id })}
          >
            Accept
          </Button>
        )}
        {update && (
          <Button
            className="bg-green-500"
            onClick={() => setSearchParams({ update: id })}
          >
            Edit
          </Button>
        )}

        {deleteAction && (
          <Button
            className="bg-red-500"
            onClick={() => setSearchParams({ delete: id })}
          >
            Delete
          </Button>
        )}
      </div>
    </>
  );
};
export default StudentActionButton;
