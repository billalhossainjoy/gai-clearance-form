import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { deleteSignetureRow } from "@/store/sign/signetureRow.slice";
import { useToast } from "@/hooks/use-toast";
import UpdateRow from "./updateRow";

const SignetureDialog: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteHandler = () => {
    dispatch(deleteSignetureRow(searchParams.get("delete") ?? "")).then(
      (res) => {
        if (res.payload.id) {
          setSearchParams({});
          toast({
            title: "Signeture Deleted successfully.",
          });
        } else {
          toast({
            title: "Error",
            description: res.payload.message || "Something is wrong",
          });
          setSearchParams({});
        }
      }
    );
  };

  return (
    <>
      <Dialog
        open={searchParams.get("delete") ? true : false}
        onOpenChange={() => setSearchParams({})}
      >
        <DialogContent>
          <DialogTitle className="text-destructive">Delete</DialogTitle>
          <DialogDescription>
            <h1 className=" my-3 text-lg text-black font-semibold">
              Are you sure to delete this row
            </h1>
            <div className="w-full text-end">
              <Button variant="ghost" onClick={() => setSearchParams({})}>
                Cancel
              </Button>
              <Button
                variant="outline"
                className="border-destructive text-destructive ml-3"
                onClick={() => deleteHandler()}
              >
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog
        open={searchParams.get("update") ? true : false}
        onOpenChange={() => setSearchParams({})}
      >
        <DialogContent className="w-full max-w-[800px]">
          <DialogTitle className="text-destructive">Update</DialogTitle>
          <DialogDescription>
            <UpdateRow />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SignetureDialog;
