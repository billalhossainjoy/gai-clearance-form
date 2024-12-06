import { useEffect, useState } from "react";
import { DataTable } from "../common/table";
import { AccountUsers, accountUsersColumns } from "./column";
import { allAdmins, deleteAdmin } from "@/store/admin/admin.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const AllAccountAdmins: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.admin);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { data } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(allAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get("delete")) setDeleteDialog(true);
    else setDeleteDialog(false);
  }, [searchParams]);

  const handler = () => {
    const deleteId = searchParams.get("delete");
    if (deleteId == null) return;
    dispatch(deleteAdmin(deleteId ?? "")).then((res) => {
		if (res.payload.id === deleteId) {
		  navigate("/admin/account")
        toast({
          title: "Admin Deleted successfully.",
        });
      }
    });
  };

  return (
    <div>
      <DataTable<AccountUsers, any>
        data={data}
        columns={accountUsersColumns}
        loading={isLoading}
      />
      <Dialog
        open={deleteDialog}
        onOpenChange={() => navigate("/admin/account")}
      >
        <DialogContent>
          <DialogTitle className="text-destructive">Delete</DialogTitle>
          <DialogDescription>
            <h1 className=" my-3 text-lg text-black font-semibold">
              Are you sure to delete to this{" "}
              <span className="capitalize font-bold text-red-500">
                {searchParams.get("role")?.toLowerCase()}
              </span>
            </h1>
            <div className="w-full text-end">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/account")}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="border-destructive text-destructive ml-3"
                onClick={() => handler()}
              >
                Delete
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AllAccountAdmins;
