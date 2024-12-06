import { createColumnHelper } from "@tanstack/react-table";
import DeleteAction from "./deleteAction";

export interface AccountUsers {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN";
}

const column = createColumnHelper<AccountUsers>();

export const accountUsersColumns = [
  column.display({
    id: "serial",
    header: "Serial",
    cell: ({ row }) => row.index + 1,
  }),
  column.accessor("name", {
    header: "Name",
    cell: (row) => row.getValue(),
  }),
  column.accessor("email", {
    header: "Email",
    cell: (row) => row.getValue(),
  }),
  column.accessor("role", {
    header: "Role",
    cell: (row) => (
      <span className="capitalize">
        {row.getValue() === "ADMIN" ? "Admin" : "Staff"}
      </span>
    ),
  }),
  column.display({
    header: "Actions",
    cell: ({row}) => {
      return <DeleteAction id={row.original.id} role={row.original.role} />;
    },
  }),
];
