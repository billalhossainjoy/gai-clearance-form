import { useEffect } from "react";
import Div from "../common/customDiv";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAllSignetureRows } from "@/store/sign/signetureRow.slice";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";

const ViewClearanceForm: React.FC = () => {
  const { data, isLoading } = useAppSelector((state) => state.signetureRow);
  const dispatch = useAppDispatch();

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAllSignetureRows());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Div>
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-foreground">
          All signetures
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Depertment</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.serial}>
                <TableCell>{row.labelId}</TableCell>
                <TableCell>{row.serial}</TableCell>
                <TableCell>{row.depertment}</TableCell>
                <TableCell>
                  {row.depertmentId.map((id) => (
                    <span key={id}>{id} </span>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      onClick={() =>
                        row.id ? setSearchParams({ update: row.id }) : null
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        row.id ? setSearchParams({ delete: row.id }) : null
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Div>
  );
};
export default ViewClearanceForm;
