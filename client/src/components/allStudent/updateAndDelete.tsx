import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { acceptStudent, deleteStudent, fetchStudent } from "@/store/student/student.slice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewStudentEntry from "../student/studentEntryForm";
import { Loader } from "lucide-react";

const ActionDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loader, student } = useAppSelector((state) => state.student);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [acceptDialog, setAcceptedDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const deleteHandler = () => {
    dispatch(deleteStudent(searchParams.get("delete") ?? "")).then((res) => {
      if (res.payload.id) setSearchParams({});
    });
  };

  const acceptHandler = () => {
    dispatch(acceptStudent(searchParams.get("accept") ?? "")).then((res) => {
      if (res.payload.id) setSearchParams({});
    });
  };

  useEffect(() => {
    const updateParam = searchParams.get("update");
    const deleteParam = searchParams.get("delete");
    const acceptParam = searchParams.get("accept");

    if (updateParam) {
      setUpdateDialog(true);
      dispatch(fetchStudent(updateParam));
    } else {
      setUpdateDialog(false);
    }

    if (deleteParam) {
      setDeleteDialog(true);
    } else {
      setDeleteDialog(false);
    }

    if (acceptParam) {
      setAcceptedDialog(true);
    } else {
      setAcceptedDialog(false);
    }
  }, [searchParams, dispatch]);
  return (
    <div>
      <Dialog open={updateDialog} onOpenChange={() => setSearchParams({})}>
        <DialogContent>
          <DialogTitle className="text-destructive">Update</DialogTitle>
          <DialogDescription>
            {!loader ? (
              <NewStudentEntry student={student} />
            ) : (
              <div className="flex w-full h-20 justify-center items-center">
                <Loader className="animate-spin" />
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialog} onOpenChange={() => setSearchParams({})}>
        <DialogContent>
          <DialogTitle className="text-destructive">Delete</DialogTitle>
          <DialogDescription>
            <h1 className=" my-3 text-lg text-black font-semibold">
              Are you sure to delete to this student
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
      <Dialog open={acceptDialog} onOpenChange={() => setSearchParams({})}>
        <DialogContent>
          <DialogTitle className="text-primary">Accept</DialogTitle>
          <DialogDescription>
            <h1 className=" my-3 text-lg text-black font-semibold">
              Are you sure to delete to this student
            </h1>
            <div className="w-full text-end">
              <Button variant="ghost" onClick={() => setSearchParams({})}>
                Cancel
              </Button>
              <Button
                variant="outline"
                className="border-sky-500 text-sky-500 ml-3"
                onClick={() => acceptHandler()}
              >
                Accept
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ActionDialog;
